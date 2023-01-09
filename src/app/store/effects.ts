import {Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {of, switchMap, tap} from "rxjs";
import {actions} from "./actions";
import {FavoriteTracksService} from "../services/favorite-tracks.service";
import {catchError, map} from "rxjs/operators";
import {LastFmService} from "../services/lastFm.service";
import {Track} from "../interfaces/interface";
import {select, Store} from "@ngrx/store";
import {getFavoriteTracks, isUrlEqual} from "./selectors";

@Injectable()
export class Effects {
  constructor(private actions$: Actions,
              private store: Store,
              private favoriteTracksService: FavoriteTracksService,
              private lastFmService: LastFmService
              ) {}
  loadFavoriteTracks$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.loadFavorite),
        switchMap(() => this.favoriteTracksService.getData()
          .pipe(
            map(favoriteTracks => actions.loadedFavoriteSuccess({favoriteTracks})),
            catchError((error) => of(actions.loadedFavoriteError({error})))
          )),
      )
  );

  loadTopTracks$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.loadTopTracks),
        switchMap(() => this.lastFmService.getTopTracks()
          .pipe(
            map(data => data.tracks?.track
              .sort((a: Track, b: Track) => b.listeners - a.listeners)
              .map(track => {
                track.artist = track.artist.name;
                track.image = track.image[3]["#text"];
                delete track.streamable;
                return track;
              })),
            map(topTracks => actions.loadedTopTracksSuccess({topTracks})),
            catchError((error) => of(actions.loadedTopTracksError({error})))
          )
        ),
      )
  );

  loadSearchedTracks$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.loadSearchedTracks),
        switchMap(({trackName}) => this.lastFmService.getSearchedTracks(trackName)
          .pipe(
            map(data => data.results.trackmatches.track
              .sort((a: Track, b: Track) => b.listeners - a.listeners)
              .map(track => {
                track.image = track.image[3]["#text"];
                delete track.streamable;
                return track;
              }),
            ),
            map(searchedTracks => actions.loadedSearchedTracksSuccess({searchedTracks})),
            catchError((error) => of(actions.loadedSearchedTracksError({error})))
          )
        ),
      )
  );

  updateFavoriteList$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(actions.updateFavorite),
        concatLatestFrom(({track}) => [
          this.store.pipe(select(getFavoriteTracks)),
          this.store.pipe(select(isUrlEqual(track.url)))
        ]),
        switchMap(([{track}, favoriteArray, isEqual]) =>
          this.favoriteTracksService.updateFavorites(track, favoriteArray, isEqual)
          .pipe(
            catchError((error) => of(actions.updateFavoriteError({error}))),
            map(() => actions.loadFavorite())
          )
        )
      )
  );


}

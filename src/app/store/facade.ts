import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {
  favoriteLoadedSelector, getErrorFavorite,
  getFavoriteTracks, getSearchedTracks,
  getTopTracks,
  isFavoriteLoadingSelector, isSearchedTracksLoadedSelector, isSearchedTracksLoadingSelector,
  isTopTracksLoadingSelector
} from "./selectors";
import {Track} from "../interfaces/interface";
import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AppFacade {
  isFavoriteTracksLoading$: Observable<boolean> = this.store.select(isFavoriteLoadingSelector);
  isTopTracksLoading$: Observable<boolean> = this.store.select(isTopTracksLoadingSelector);
  isSearchedTracksLoading$: Observable<boolean> = this.store.select(isSearchedTracksLoadingSelector);
  loaded$: Observable<boolean> = this.store.select(favoriteLoadedSelector);
  isSearchedTracksLoaded$: Observable<boolean> = this.store.select(isSearchedTracksLoadedSelector);
  getFavoriteTracks$: Observable<Track[]> = this.store.select(getFavoriteTracks);
  getTopTracks$: Observable<Track[]> = this.store.select(getTopTracks);
  getSearchedTracks$: Observable<Track[]> = this.store.select(getSearchedTracks);
  favoriteError$: Observable<HttpErrorResponse | null> = this.store.select(getErrorFavorite);

  constructor(private store: Store) {
  }
}

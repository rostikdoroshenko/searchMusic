import {createAction, props} from "@ngrx/store";
import {Track} from "../interfaces/interface";
import {HttpErrorResponse} from "@angular/common/http";

export const actions = {
  loadTopTracks: createAction('[TOP TRACKS] load top tracks'),
  loadedTopTracksSuccess: createAction('[TOP TRACKS] load top tracks success',  props<{topTracks: Track[]}>()),
  loadedTopTracksError: createAction('[TOP TRACKS] load top tracks error', props<{error: HttpErrorResponse}>()),

  loadSearchedTracks: createAction('[SEARCHED TRACKS] load searched tracks', props<{trackName: string}>()),
  loadedSearchedTracksSuccess: createAction('[SEARCHED TRACKS] loaded searched tracks success', props<{searchedTracks: Track[]}>()),
  loadedSearchedTracksError: createAction('[SEARCHED TRACKS] loaded searched tracks error', props<{error: HttpErrorResponse}>()),

  loadFavorite: createAction('[FAVORITE] load favorite tracks'),
  loadedFavoriteSuccess: createAction('[FAVORITE] loaded success',  props<{favoriteTracks: Track[]}>()),
  loadedFavoriteError: createAction('[FAVORITE] loaded error',  props<{error: HttpErrorResponse}>()),
  updateFavorite: createAction('[FAVORITE] update favorite tracks', props<{track: Track}>()),
  updateFavoriteError: createAction('[FAVORITE] update favorite tracks error', props<{error: HttpErrorResponse}>()),
}

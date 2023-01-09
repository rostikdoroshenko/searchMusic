import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../environments/environment";
import {reducer} from "./reducers";
import {Track} from "../interfaces/interface";
import {HttpErrorResponse} from "@angular/common/http";

export const APP_KEY = 'app';

export interface AppState {
  topTracks: Track[];
  searchedTracks: Track[];
  favoriteTracks: Track[];
  isLoadFavoriteTracks: boolean;
  isLoadTopTracks: boolean;
  isLoadSearchedTracks: boolean;
  loaded: boolean;
  searchedTracksLoaded: boolean;
  error: HttpErrorResponse | null;
}

export interface State {
  [APP_KEY]: AppState;
}

export const reducers: ActionReducerMap<State> = {
  [APP_KEY]: reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

import {createReducer, on} from "@ngrx/store";
import {AppState} from "./state";
import {actions} from "./actions";

export const initialState: AppState = {
  topTracks: [],
  searchedTracks: [],
  favoriteTracks: [],
  isLoadFavoriteTracks: false,
  isLoadTopTracks: false,
  isLoadSearchedTracks: false,
  loaded: false,
  searchedTracksLoaded: false,
  error: null
};

export const reducer = createReducer<AppState>(
  initialState,
  on(actions.loadFavorite, (state: AppState) => ({
    ...state,
    isLoadFavoriteTracks: true
  })),
  on(actions.loadedFavoriteSuccess, (state, {favoriteTracks})  => ({
    ...state,
    favoriteTracks,
    isLoadFavoriteTracks: false,
    loaded: true
  })),
  on(actions.loadedFavoriteError, (state, {error})  => ({
    ...state,
    error,
    isLoadFavoriteTracks: false,
  })),
  on(actions.loadTopTracks, (state: AppState) => ({
    ...state,
    isLoadTopTracks: true
  })),
  on(actions.loadedTopTracksSuccess, (state, {topTracks})  => ({
    ...state,
    topTracks,
    isLoadTopTracks: false,
    loaded: true
  })),
  on(actions.loadedTopTracksError, (state, {error})  => ({
    ...state,
    error,
    isLoadTopTracks: false,
  })),
  on(actions.loadSearchedTracks, (state: AppState) => ({
    ...state,
    isLoadSearchedTracks: true
  })),
  on(actions.loadedSearchedTracksSuccess, (state: AppState, {searchedTracks}) => ({
    ...state,
    searchedTracks,
    isLoadSearchedTracks: false,
    searchedTracksLoaded: true
  })),
  on(actions.loadedSearchedTracksError, (state: AppState, {error}) => ({
    ...state,
    error,
    isLoadSearchedTracks: false,
    searchedTracksLoaded: true
  })),
)

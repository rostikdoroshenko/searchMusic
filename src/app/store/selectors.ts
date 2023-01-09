import {createFeatureSelector, createSelector} from "@ngrx/store";
import {APP_KEY, AppState} from "./state";

export const featureSelector
  = createFeatureSelector<AppState>(APP_KEY);

export const getFavoriteTracks = createSelector(
  featureSelector,
  state => state.favoriteTracks
);

export const getTopTracks = createSelector(
  featureSelector,
  state => state.topTracks
);

export const getSearchedTracks = createSelector(
  featureSelector,
  state => state.searchedTracks
);

export const getErrorFavorite = createSelector(
  featureSelector,
  state => state.error
);

export const isFavoriteLoadingSelector = createSelector(
  featureSelector,
  state => state.isLoadFavoriteTracks
);

export const isTopTracksLoadingSelector = createSelector(
  featureSelector,
  state => state.isLoadTopTracks
);

export const isSearchedTracksLoadingSelector = createSelector(
  featureSelector,
  state => state.isLoadSearchedTracks
);

export const isSearchedTracksLoadedSelector = createSelector(
  featureSelector,
  state => state.searchedTracksLoaded
);

export const favoriteLoadedSelector = createSelector(
  featureSelector,
  state => state.loaded
);

export const isUrlEqual = (url: string) => createSelector(
  featureSelector,
  state => state.favoriteTracks.map(track => track.url).includes(url)
);

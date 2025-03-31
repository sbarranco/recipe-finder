import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectAppState = createFeatureSelector<AppState>('APP_STATE');

export const selectRecipies = createSelector(
  selectAppState,
  (state) => state?.recipies
);
export const selectSelectedRecipe = createSelector(
  selectAppState,
  (state) => state?.selectedRecipe
);

export const selectLoading = createSelector(
  selectAppState,
  (state) => state?.loading
);
export const selectFavoriteRecipies = createSelector(
  selectAppState,
  (state) => state?.favoriteRecipies
);

export const selectError = createSelector(
  selectAppState,
  (state) => state?.error
);

export const selectCombinedItems = createSelector(
  selectRecipies,
  selectFavoriteRecipies,
  (items, favoriteItems) => {
    return items?.map((item) => ({
      ...item,
      isFavorite: favoriteItems.some(
        (favItem) => favItem.idMeal === item.idMeal
      ),
    }));
  }
);

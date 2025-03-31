import {
  selectAppState,
  selectRecipies,
  selectSelectedRecipe,
  selectLoading,
  selectFavoriteRecipies,
  selectError,
  selectCombinedItems,
} from './app.selectors';
import { AppState } from '../app.state';
import { mockRecipe } from '../../models/__mocks__/recipe.model.mock';

describe('App Selectors', () => {
  const initialState: AppState = {
    recipies: [mockRecipe],
    selectedRecipe: mockRecipe,
    favoriteRecipies: [mockRecipe],
    loading: false,
    error: null,
  };

  it('should select the app state', () => {
    const result = selectAppState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select recipies', () => {
    const result = selectRecipies.projector(initialState);
    expect(result).toEqual(initialState.recipies);
  });

  it('should select selectedRecipe', () => {
    const result = selectSelectedRecipe.projector(initialState);
    expect(result).toEqual(initialState.selectedRecipe);
  });

  it('should select loading', () => {
    const result = selectLoading.projector(initialState);
    expect(result).toEqual(initialState.loading);
  });

  it('should select favoriteRecipies', () => {
    const result = selectFavoriteRecipies.projector(initialState);
    expect(result).toEqual(initialState.favoriteRecipies);
  });

  it('should select error', () => {
    const errorState: AppState = {
      ...initialState,
      error: 'An error occurred',
    };
    const result = selectError.projector(errorState);
    expect(result).toEqual('An error occurred');
  });

  it('should select combined items with isFavorite property', () => {
    const result = selectCombinedItems.projector(
      initialState.recipies,
      initialState.favoriteRecipies
    );
    const expected = (initialState.recipies || []).map((item) => ({
      ...item,
      isFavorite: (initialState.favoriteRecipies || []).some(
        (favItem) => favItem.idMeal === item.idMeal
      ),
    }));
    expect(result).toEqual(expected);
  });

  it('should handle empty recipies and favoriteRecipies in selectCombinedItems', () => {
    const emptyState: AppState = {
      ...initialState,
      recipies: [],
      favoriteRecipies: [],
    };
    const result = selectCombinedItems.projector(
      emptyState.recipies,
      emptyState.favoriteRecipies
    );
    expect(result).toEqual([]);
  });
});

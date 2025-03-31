import { appReducerReducerFunction } from './app.reducer';
import * as recipeActions from '../actions/app.actions';
import { AppState } from '../app.state';
import { mockRecipe } from '../../models/__mocks__/recipe.model.mock';

describe('App Reducer', () => {
  const initialState: AppState = {
    recipies: null,
    selectedRecipe: null,
    favoriteRecipies: [],
    loading: false,
    error: null,
  };

  it('should set loading to true on loadRandomRecipe action', () => {
    const action = recipeActions.LoadRandomRecipeActions.loadRandomRecipe();
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should set loading to false and update recipes on loadRandomRecipeSuccess action', () => {
    const action =
      recipeActions.LoadRandomRecipeActions.loadRandomRecipeSuccess({
        recipe: [mockRecipe],
      });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.recipies).toEqual([mockRecipe]);
  });

  it('should set error and loading to false on loadRandomRecipeFailure action', () => {
    const error = 'Failed to load random recipe';
    const action =
      recipeActions.LoadRandomRecipeActions.loadRandomRecipeFailure({
        error,
      });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should set loading to true on searchRecipe action', () => {
    const action = recipeActions.SearchRecipeActions.searchRecipe({
      query: 'Test',
    });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should set loading to false and update recipes on searchRecipeSuccess action', () => {
    const action = recipeActions.SearchRecipeActions.searchRecipeSuccess({
      recipe: [mockRecipe],
    });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.recipies).toEqual([mockRecipe]);
  });

  it('should set error and loading to false on searchRecipeFailure action', () => {
    const error = 'Failed to search recipes';
    const action = recipeActions.SearchRecipeActions.searchRecipeFailure({
      error,
    });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should set loading to true on getRecipeDetails action', () => {
    const action = recipeActions.GetRecipeDetailsActions.getRecipeDetails({
      id: '12345',
    });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should set loading to false and update selectedRecipe on getRecipeDetailsSuccess action', () => {
    const action =
      recipeActions.GetRecipeDetailsActions.getRecipeDetailsSuccess({
        recipe: mockRecipe,
      });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.selectedRecipe).toEqual(mockRecipe);
  });

  it('should set error and loading to false on getRecipeDetailsFailure action', () => {
    const error = 'Failed to get recipe details';
    const action =
      recipeActions.GetRecipeDetailsActions.getRecipeDetailsFailure({
        error,
      });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should add a recipe to favoriteRecipies on addFavoriteRecipe action', () => {
    const action = recipeActions.AddFavoriteRecipe.addFavoriteRecipe({
      recipe: mockRecipe,
    });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.favoriteRecipies).toContain(mockRecipe);
  });

  it('should remove a recipe from favoriteRecipies on deleteFavoriteRecipe action', () => {
    const initialStateWithFavorite: AppState = {
      ...initialState,
      favoriteRecipies: [mockRecipe],
    };
    const action = recipeActions.AddFavoriteRecipe.deleteFavoriteRecipe({
      recipe: mockRecipe,
    });
    const state = appReducerReducerFunction(initialStateWithFavorite, action);
    expect(state.favoriteRecipies).not.toContain(mockRecipe);
  });

  it('should reset recipes on resetRecipesList action', () => {
    const initialStateWithRecipes: AppState = {
      ...initialState,
      recipies: [mockRecipe],
    };
    const action = recipeActions.resetRecipesList();
    const state = appReducerReducerFunction(initialStateWithRecipes, action);
    expect(state.recipies).toEqual([]);
  });
});

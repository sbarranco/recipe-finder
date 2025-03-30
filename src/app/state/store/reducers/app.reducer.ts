import { Action, ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as recipeActions from '../actions/app.actions';
import { AppState, RecipeState } from '../app.state';

const initialAppState: AppState = {
  recipies: [],
  selectedRecipe: null,
  favoriteRecipies: [],
  loading: false,
  error: null,
};

const setLoadingState = (state: AppState, loading: boolean): AppState => ({
  ...state,
  loading,
});

const setErrorState = (state: AppState, error: string | null): AppState => ({
  ...state,
  loading: false,
  error,
});

const appReducer = createReducer(
  initialAppState,

  // Load Random Recipe
  on(recipeActions.LoadRandomRecipeActions.loadRandomRecipe, (state) =>
    setLoadingState(state, true)
  ),
  on(
    recipeActions.LoadRandomRecipeActions.loadRandomRecipeSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      recipies: action.recipe,
    })
  ),
  on(
    recipeActions.LoadRandomRecipeActions.loadRandomRecipeFailure,
    (state, action) => setErrorState(state, action.error)
  ),

  // Search Recipe
  on(recipeActions.SearchRecipeActions.searchRecipe, (state) =>
    setLoadingState(state, true)
  ),
  on(
    recipeActions.SearchRecipeActions.searchRecipeSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      recipies: action.recipe,
    })
  ),
  on(recipeActions.SearchRecipeActions.searchRecipeFailure, (state, action) =>
    setErrorState(state, action.error)
  ),

  // Navigate to Recipe Details
  on(
    recipeActions.NavigateToRecipeDetailsActions.navigateToRecipeDetails,
    (state) => setLoadingState(state, true)
  ),
  on(
    recipeActions.NavigateToRecipeDetailsActions.navigateToRecipeDetailsSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      selectedRecipe: action.recipe,
    })
  ),
  on(
    recipeActions.NavigateToRecipeDetailsActions.navigateToRecipeDetailsFailure,
    (state, action) => setErrorState(state, action.error)
  ),

  // Add Favorite Recipe
  on(recipeActions.AddFavoriteRecipe.addFavoriteRecipe, (state, action) => ({
    ...state,
    favoriteRecipies: [...state.favoriteRecipies, action.recipe],
  })),
  on(recipeActions.AddFavoriteRecipe.deleteFavoriteRecipe, (state, action) => ({
    ...state,
    favoriteRecipies: state.favoriteRecipies.filter(
      (item) => item.idMeal !== action.recipe.idMeal
    ),
  }))
);

export function appReducerReducerFunction(
  state: AppState | undefined,
  action: Action
) {
  return appReducer(state, action);
}

export const reducers: ActionReducerMap<RecipeState> = {
  APP_STATE: appReducerReducerFunction,
};

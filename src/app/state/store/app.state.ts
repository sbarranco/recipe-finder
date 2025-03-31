import { Recipe } from '../models/recipe.model';

export interface AppState {
  recipies: Recipe[] | null;
  selectedRecipe: Recipe | null;
  favoriteRecipies: Recipe[];
  loading: boolean;
  error: string | null;
}

export interface RecipeState {
  APP_STATE: AppState;
}

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';

export const LoadRandomRecipeActions = createActionGroup({
  source: '[Recipe] Load Random Recipe',
  events: {
    'Load Random Recipe': emptyProps(),

    'Load Random Recipe Success': props<{
      recipe: Recipe[];
    }>(),
    'Load Random Recipe Failure': props<{
      error: string;
    }>(),
  },
});

export const SearchRecipeActions = createActionGroup({
  source: '[Recipe]  Search Recipe',
  events: {
    ' Search Recipe': props<{
      query: string;
    }>(),

    ' Search Recipe Success': props<{
      recipe: Recipe[];
    }>(),
    ' Search Recipe Failure': props<{
      error: string;
    }>(),
  },
});

export const AddFavoriteRecipe = createActionGroup({
  source: '[Recipe] Add Favorite Recipe',
  events: {
    'Add Favorite Recipe': props<{
      recipe: Recipe;
    }>(),
    'Delete Favorite Recipe': props<{
      recipe: Recipe;
    }>(),
  },
});

export const GetRecipeDetailsActions = createActionGroup({
  source: '[Recipe] Get Recipe Details',
  events: {
    'Get Recipe Details': props<{
      id: string;
    }>(),
    'Get Recipe Details Success': props<{
      recipe: Recipe;
    }>(),
    'Get Recipe Details Failure': props<{
      error: string;
    }>(),
  },
});

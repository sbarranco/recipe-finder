import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromRecipeActions from '../actions/app.actions';
import { RecipeService } from '../../../services/recipe.service';
import { Router } from '@angular/router';

@Injectable()
export class AppEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private readonly recipeService = inject(RecipeService);

  loadView$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRecipeActions.LoadRandomRecipeActions.loadRandomRecipe),
      mergeMap(() =>
        this.recipeService.getRandomRecipe().pipe(
          map((response) =>
            fromRecipeActions.LoadRandomRecipeActions.loadRandomRecipeSuccess({
              recipe: response,
            })
          ),
          catchError((error) =>
            of(
              fromRecipeActions.LoadRandomRecipeActions.loadRandomRecipeFailure(
                error
              )
            )
          )
        )
      )
    )
  );

  searchItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRecipeActions.SearchRecipeActions.searchRecipe),
      mergeMap((action) => {
        return this.recipeService.searchRecipes(action.query).pipe(
          map((response) =>
            fromRecipeActions.SearchRecipeActions.searchRecipeSuccess({
              recipe: response,
            })
          ),
          catchError((error) =>
            of(fromRecipeActions.SearchRecipeActions.searchRecipeFailure(error))
          )
        );
      })
    )
  );

  getRecipeById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRecipeActions.GetRecipeDetailsActions.getRecipeDetails),
      mergeMap((action) => {
        return this.recipeService.getRecipeDetails(action.id).pipe(
          map((response) =>
            fromRecipeActions.GetRecipeDetailsActions.getRecipeDetailsSuccess({
              recipe: response,
            })
          ),
          catchError((error) =>
            of(
              fromRecipeActions.GetRecipeDetailsActions.getRecipeDetailsFailure(
                error
              )
            )
          )
        );
      })
    )
  );

  navigateToRecipeDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromRecipeActions.GetRecipeDetailsActions.getRecipeDetailsSuccess
        ),
        tap(({ recipe }) => {
          this.router.navigate(['/recipes', recipe.idMeal]);
        })
      ),
    { dispatch: false }
  );
}

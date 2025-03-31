import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import * as fromRecipeActions from '../store/actions/app.actions';
import {
  selectCombinedItems,
  selectError,
  selectFavoriteRecipies,
  selectLoading,
  selectSelectedRecipe,
} from '../store/selectors/app.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppFacade {
  private readonly store = inject(Store);
  recipes$: Observable<Recipe[] | null | undefined> =
    this.store.select(selectCombinedItems);
  selectedRecipe$: Observable<Recipe | null> =
    this.store.select(selectSelectedRecipe);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  favoriteRecipes$: Observable<Recipe[]> = this.store.select(
    selectFavoriteRecipies
  );
  error$: Observable<string | null> = this.store.select(selectError);

  loadRandomRecipe(): void {
    this.store.dispatch(
      fromRecipeActions.LoadRandomRecipeActions.loadRandomRecipe()
    );
  }

  searchRecipies(query: string): void {
    this.store.dispatch(
      fromRecipeActions.SearchRecipeActions.searchRecipe({ query })
    );
  }

  getRecipeDetails(id: string): void {
    this.store.dispatch(
      fromRecipeActions.GetRecipeDetailsActions.getRecipeDetails({
        id,
      })
    );
  }

  addFavoriteRecipe(recipe: Recipe): void {
    this.store.dispatch(
      fromRecipeActions.AddFavoriteRecipe.addFavoriteRecipe({ recipe })
    );
  }

  deleteFavoriteRecipe(recipe: Recipe): void {
    this.store.dispatch(
      fromRecipeActions.AddFavoriteRecipe.deleteFavoriteRecipe({ recipe })
    );
  }

  resetRecipesList(): void {
    this.store.dispatch(fromRecipeActions.resetRecipesList());
  }
}

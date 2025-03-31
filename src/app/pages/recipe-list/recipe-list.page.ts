import { Component, HostBinding, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { AppFacade } from '../../state/facades/app.facade';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { Recipe } from '../../state/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
  imports: [CommonModule, SearchBarComponent, RecipeCardComponent],
})
export class RecipeListPage {
  @HostBinding('class') class = 'app-recipe-list';
  private appFacade = inject(AppFacade);

  isSearchActive = signal(false);
  recipes$ = this.appFacade.recipes$;
  favorites$ = this.appFacade.favoriteRecipes$;
  isLoading$ = this.appFacade.loading$;

  viewRecipeDetails(recipeId: string): void {
    this.appFacade.getRecipeDetails(recipeId);
  }

  onClickSearchItems(query: string): void {
    this.isSearchActive.set(true);
    this.appFacade.searchRecipies(query);
  }

  onClickResetSearch(): void {
    this.isSearchActive.set(false);
  }

  onTriggerFavorite(recipe: Recipe): void {
    if (recipe.isFavorite) {
      this.appFacade.deleteFavoriteRecipe(recipe);
    } else {
      this.appFacade.addFavoriteRecipe(recipe);
    }
  }

  onClickRandomRecipe(): void {
    this.isSearchActive.set(true);
    this.appFacade.loadRandomRecipe();
  }

  onClickClearList(): void {
    this.isSearchActive.set(false);
    this.appFacade.resetRecipesList();
  }
}

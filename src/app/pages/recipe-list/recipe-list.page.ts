import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { AppFacade } from '../../state/facades/app.facade';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { Recipe } from '../../state/models/recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
  imports: [CommonModule, SearchBarComponent, RecipeCardComponent],
})
export class RecipeListPage implements OnInit {
  private appFacade = inject(AppFacade);
  private route = inject(Router);

  isSearchActive = signal(false);
  recipes$ = this.appFacade.recipes$;
  favorites$ = this.appFacade.favoriteRecipes$;

  ngOnInit(): void {
    this.appFacade.loadRandomRecipe();
  }

  viewRecipeDetails(recipeId: string): void {
    this.isSearchActive.set(false);
    this.appFacade.getRecipeDetails(recipeId);
  }

  onClickSearchItems(query: string): void {
    this.isSearchActive.set(true);
    this.appFacade.searchRecipies(query);
  }

  onClickResetSearch(): void {
    this.isSearchActive.set(false);
    this.appFacade.loadRandomRecipe();
  }

  onTriggerFavorite(recipe: Recipe): void {
    if (recipe.isFavorite) {
      this.appFacade.deleteFavoriteRecipe(recipe);
    } else {
      this.appFacade.addFavoriteRecipe(recipe);
    }
  }
}

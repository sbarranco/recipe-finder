import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../state/models/recipe.model';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { AppFacade } from '../../state/facades/app.facade';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  imports: [CommonModule, SearchBarComponent],
})
export class RecipeListComponent implements OnInit {
  private appFacade = inject(AppFacade);

  isSearchActive = signal(false);
  recipes$ = this.appFacade.recipes$;
  favorites$ = this.appFacade.favoriteRecipes$;

  ngOnInit(): void {
    this.appFacade.loadRandomRecipe();
  }

  viewRecipeDetails(recipeId: string): void {
    this.appFacade.navigateToRecipeDetails(recipeId);
  }

  onClickSearchItems(query: string): void {
    this.isSearchActive.set(true);
    this.appFacade.searchRecipies(query);
  }

  onClickResetSearch(): void {
    this.isSearchActive.set(false);
    this.appFacade.loadRandomRecipe();
  }
}

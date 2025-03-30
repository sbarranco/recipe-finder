import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Recipe } from '../../state/models/recipe.model';
import { AppFacade } from '../../state/facades/app.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [CommonModule],
})
export class FavoritesComponent {
  isOpen = input<boolean>(false);
  closeModal = output<void>();

  private appFacade = inject(AppFacade);

  favorites$ = this.appFacade.favoriteRecipes$;

  onDeleteFavorites(item: Recipe): void {
    this.appFacade.deleteFavoriteRecipe(item);
  }

  onViewRecipeDetails(idMeal: string): void {
    this.appFacade.getRecipeDetails(idMeal);
    this.closeModal.emit();
  }
}

import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../state/models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  imports: [CommonModule],
})
export class RecipeCardComponent {
  recipe = input.required<Recipe>();
  triggerFavorite = output<Recipe>();
  viewDetails = output<void>();
}

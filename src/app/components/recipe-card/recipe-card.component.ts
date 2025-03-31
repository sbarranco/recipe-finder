import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../state/models/recipe.model';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  imports: [CommonModule, ButtonComponent],
})
export class RecipeCardComponent {
  recipe = input.required<Recipe>();
  triggerFavorite = output<Recipe>();
  viewDetails = output<void>();
}

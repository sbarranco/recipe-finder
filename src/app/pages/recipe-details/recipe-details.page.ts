import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { AppFacade } from '../../state/facades/app.facade';

@Component({
  selector: 'app-recipe-details-page',
  templateUrl: './recipe-details.page.html',
  styleUrl: './recipe-details.page.scss',
  imports: [CommonModule],
})
export class RecipeDetailsPage {
  private appFacade = inject(AppFacade);
  recipe$ = this.appFacade.selectedRecipe$;
}

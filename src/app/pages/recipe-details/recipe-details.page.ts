import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { AppFacade } from '../../state/facades/app.facade';

@Component({
  selector: 'app-recipe-details-page',
  templateUrl: './recipe-details.page.html',
  styleUrl: './recipe-details.page.scss',
  imports: [CommonModule],
})
export class RecipeDetailsPage implements OnInit {
  private appFacade = inject(AppFacade);
  private route = inject(ActivatedRoute);
  recipe$ = this.appFacade.selectedRecipe$;

  ngOnInit(): void {
    const recipeId: string | null = this.route.snapshot.paramMap.get('id');
    this.recipe$ = this.recipe$.pipe(
      tap((recipe) => {
        if (!recipe || recipe.idMeal !== recipeId) {
          this.appFacade.getRecipeDetails(recipeId || '');
        }
      })
    );
  }
}

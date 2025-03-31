import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppFacade } from '../../state/facades/app.facade';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-recipe-details-page',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  imports: [CommonModule, ButtonComponent],
})
export class RecipeDetailsPage implements OnInit {
  private appFacade = inject(AppFacade);
  private route = inject(ActivatedRoute);
  recipe$ = this.appFacade.selectedRecipe$;

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id') || '';
    this.appFacade.getRecipeDetails(recipeId);
  }

  goBack(): void {
    window.history.back();
  }
}

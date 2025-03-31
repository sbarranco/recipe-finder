import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  input,
  OnChanges,
  output,
  ViewChild,
} from '@angular/core';
import { Recipe } from '../../state/models/recipe.model';
import { AppFacade } from '../../state/facades/app.facade';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [CommonModule, ButtonComponent],
})
export class FavoritesComponent implements OnChanges {
  isOpen = input<boolean>(false);
  closeModal = output<void>();

  private appFacade = inject(AppFacade);

  favorites$ = this.appFacade.favoriteRecipes$;

  @ViewChild('closeButton') closeButton!: ElementRef<HTMLButtonElement>;

  ngOnChanges(): void {
    if (this.isOpen()) {
      setTimeout(() => this.closeButton?.nativeElement.focus(), 0);
    }
  }

  onDeleteFavorites(item: Recipe): void {
    this.appFacade.deleteFavoriteRecipe(item);
  }

  onViewRecipeDetails(idMeal: string): void {
    this.appFacade.getRecipeDetails(idMeal);
    this.closeModal.emit();
  }
}

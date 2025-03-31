import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ButtonComponent } from './components/button/button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterModule, FavoritesComponent, ButtonComponent],
})
export class AppComponent {
  title = 'recipe Finder';
  @HostBinding('class') class = 'app-root';

  isFavoritesModalOpen = signal(false);

  openFavoritesModal(): void {
    this.isFavoritesModalOpen.set(!this.isFavoritesModalOpen());
  }
}

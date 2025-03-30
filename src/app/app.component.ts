import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, FavoritesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'recipe Finder';
  @HostBinding('class') class = 'app-root';

  isFavoritesModalOpen = signal(false);

  openFavoritesModal(): void {
    this.isFavoritesModalOpen.set(!this.isFavoritesModalOpen());
  }
}

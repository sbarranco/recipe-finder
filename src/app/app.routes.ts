import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RecipeDetailsPage } from './pages/recipe-details/recipe-details.page';
import { RecipeListPage } from './pages/recipe-list/recipe-list.page';

export const routes: Routes = [
  { path: '', component: RecipeListPage },
  { path: 'recipes/:id', component: RecipeDetailsPage },
  { path: '**', redirectTo: '' },
];

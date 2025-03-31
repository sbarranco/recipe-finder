import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppFacade } from './app.facade';
import * as fromRecipeActions from '../store/actions/app.actions';
import { Recipe } from '../models/recipe.model';
import {
  selectCombinedItems,
  selectError,
  selectFavoriteRecipies,
  selectLoading,
  selectSelectedRecipe,
} from '../store/selectors/app.selectors';
import { mockRecipe } from '../models/__mocks__/recipe.model.mock';

describe('AppFacade', () => {
  let facade: AppFacade;
  let store: MockStore;
  const initialState = {
    recipes: [],
    favoriteRecipes: [],
    selectedRecipe: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppFacade, provideMockStore({ initialState })],
    });

    facade = TestBed.inject(AppFacade);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  describe('Actions', () => {
    it('should dispatch loadRandomRecipe action', () => {
      const spy = jest.spyOn(store, 'dispatch');
      facade.loadRandomRecipe();
      expect(spy).toHaveBeenCalledWith(
        fromRecipeActions.LoadRandomRecipeActions.loadRandomRecipe()
      );
    });

    it('should dispatch searchRecipies action', () => {
      const query = 'chicken';
      const spy = jest.spyOn(store, 'dispatch');
      facade.searchRecipies(query);
      expect(spy).toHaveBeenCalledWith(
        fromRecipeActions.SearchRecipeActions.searchRecipe({ query })
      );
    });

    it('should dispatch getRecipeDetails action', () => {
      const recipeId = '12345';
      const spy = jest.spyOn(store, 'dispatch');
      facade.getRecipeDetails(recipeId);
      expect(spy).toHaveBeenCalledWith(
        fromRecipeActions.GetRecipeDetailsActions.getRecipeDetails({
          id: recipeId,
        })
      );
    });

    it('should dispatch addFavoriteRecipe action', () => {
      const spy = jest.spyOn(store, 'dispatch');
      facade.addFavoriteRecipe(mockRecipe);
      expect(spy).toHaveBeenCalledWith(
        fromRecipeActions.AddFavoriteRecipe.addFavoriteRecipe({
          recipe: mockRecipe,
        })
      );
    });

    it('should dispatch deleteFavoriteRecipe action', () => {
      const spy = jest.spyOn(store, 'dispatch');
      facade.deleteFavoriteRecipe(mockRecipe);
      expect(spy).toHaveBeenCalledWith(
        fromRecipeActions.AddFavoriteRecipe.deleteFavoriteRecipe({
          recipe: mockRecipe,
        })
      );
    });

    it('should dispatch resetRecipesList action', () => {
      const spy = jest.spyOn(store, 'dispatch');
      facade.resetRecipesList();
      expect(spy).toHaveBeenCalledWith(fromRecipeActions.resetRecipesList());
    });
  });

  describe('Selectors', () => {
    it('should select recipes$', (done) => {
      store.overrideSelector(selectCombinedItems, [
        { ...mockRecipe, isFavorite: false },
      ]);
      facade.recipes$.subscribe((recipes) => {
        expect(recipes).toEqual([mockRecipe]);
        done();
      });
    });

    it('should select selectedRecipe$', (done) => {
      store.overrideSelector(selectSelectedRecipe, mockRecipe);
      facade.selectedRecipe$.subscribe((recipe) => {
        expect(recipe).toEqual(mockRecipe);
        done();
      });
    });

    it('should select loading$', (done) => {
      store.overrideSelector(selectLoading, true);
      facade.loading$.subscribe((loading) => {
        expect(loading).toBe(true);
        done();
      });
    });

    it('should select favoriteRecipes$', (done) => {
      store.overrideSelector(selectFavoriteRecipies, [mockRecipe]);
      facade.favoriteRecipes$.subscribe((favoriteRecipes) => {
        expect(favoriteRecipes).toEqual([mockRecipe]);
        done();
      });
    });

    it('should select error$', (done) => {
      const mockError = 'An error occurred';
      store.overrideSelector(selectError, mockError);
      facade.error$.subscribe((error) => {
        expect(error).toBe(mockError);
        done();
      });
    });
  });
});

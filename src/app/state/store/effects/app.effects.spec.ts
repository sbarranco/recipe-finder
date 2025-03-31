import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { AppEffects } from './app.effects';
import { RecipeService } from '../../../services/recipe.service';
import * as fromRecipeActions from '../actions/app.actions';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { mockRecipe } from '../../models/__mocks__/recipe.model.mock';

describe('AppEffects', () => {
  let actions$: Observable<Action>;
  let effects: AppEffects;
  let recipeService: jest.Mocked<RecipeService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    const RecipeServiceMock = {
      getRandomRecipe: jest.fn(),
      searchRecipes: jest.fn(),
      getRecipeDetails: jest.fn(),
    };

    const RouterMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        { provide: RecipeService, useValue: RecipeServiceMock },
        { provide: Router, useValue: RouterMock },
      ],
    });

    effects = TestBed.inject(AppEffects);
    recipeService = TestBed.inject(RecipeService) as jest.Mocked<RecipeService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  describe('loadView$', () => {
    it('should dispatch loadRandomRecipeSuccess on success', () => {
      const action =
        fromRecipeActions.LoadRandomRecipeActions.loadRandomRecipe();
      const outcome =
        fromRecipeActions.LoadRandomRecipeActions.loadRandomRecipeSuccess({
          recipe: [mockRecipe],
        });

      actions$ = of(action);
      recipeService.getRandomRecipe.mockReturnValue(of([mockRecipe]));

      effects.loadView$.subscribe((result) => {
        expect(result).toEqual(outcome);
        expect(recipeService.getRandomRecipe).toHaveBeenCalled();
      });
    });

    it('should dispatch loadRandomRecipeFailure on failure', () => {
      const action =
        fromRecipeActions.LoadRandomRecipeActions.loadRandomRecipe();
      const outcome =
        fromRecipeActions.LoadRandomRecipeActions.loadRandomRecipeFailure({
          error: 'Error',
        });

      actions$ = of(action);
      recipeService.getRandomRecipe.mockReturnValue(
        throwError(new Error('Error'))
      );

      effects.loadView$.subscribe((result) => {
        expect(result).toEqual(outcome);
        expect(recipeService.getRandomRecipe).toHaveBeenCalled();
      });
    });
  });

  describe('searchItems$', () => {
    it('should dispatch searchRecipeSuccess on success', () => {
      const query = 'Test';
      const action = fromRecipeActions.SearchRecipeActions.searchRecipe({
        query,
      });
      const outcome = fromRecipeActions.SearchRecipeActions.searchRecipeSuccess(
        {
          recipe: [mockRecipe],
        }
      );

      actions$ = of(action);
      recipeService.searchRecipes.mockReturnValue(of([mockRecipe]));

      effects.searchItems$.subscribe((result) => {
        expect(result).toEqual(outcome);
        expect(recipeService.searchRecipes).toHaveBeenCalledWith(query);
      });
    });

    it('should dispatch searchRecipeFailure on failure', () => {
      const query = 'Test';
      const action = fromRecipeActions.SearchRecipeActions.searchRecipe({
        query,
      });
      const outcome = fromRecipeActions.SearchRecipeActions.searchRecipeFailure(
        { error: 'Error' }
      );

      actions$ = of(action);
      recipeService.searchRecipes.mockReturnValue(
        throwError(new Error('Error'))
      );

      effects.searchItems$.subscribe((result) => {
        expect(result).toEqual(outcome);
        expect(recipeService.searchRecipes).toHaveBeenCalledWith(query);
      });
    });
  });

  describe('getRecipeById$', () => {
    it('should dispatch getRecipeDetailsSuccess on success', () => {
      const recipeId = '12345';
      const action = fromRecipeActions.GetRecipeDetailsActions.getRecipeDetails(
        { id: recipeId }
      );
      const outcome =
        fromRecipeActions.GetRecipeDetailsActions.getRecipeDetailsSuccess({
          recipe: mockRecipe,
        });

      actions$ = of(action);
      recipeService.getRecipeDetails.mockReturnValue(of(mockRecipe));

      effects.getRecipeById$.subscribe((result) => {
        expect(result).toEqual(outcome);
        expect(recipeService.getRecipeDetails).toHaveBeenCalledWith(recipeId);
      });
    });

    it('should dispatch getRecipeDetailsFailure on failure', () => {
      const recipeId = '12345';
      const action = fromRecipeActions.GetRecipeDetailsActions.getRecipeDetails(
        { id: recipeId }
      );
      const outcome =
        fromRecipeActions.GetRecipeDetailsActions.getRecipeDetailsFailure({
          error: 'Error',
        });

      actions$ = of(action);
      recipeService.getRecipeDetails.mockReturnValue(
        throwError(new Error('Error'))
      );

      effects.getRecipeById$.subscribe((result) => {
        expect(result).toEqual(outcome);
        expect(recipeService.getRecipeDetails).toHaveBeenCalledWith(recipeId);
      });
    });
  });

  describe('navigateToRecipeDetails$', () => {
    it('should navigate to the recipe details page on success', () => {
      const action =
        fromRecipeActions.GetRecipeDetailsActions.getRecipeDetailsSuccess({
          recipe: mockRecipe,
        });

      actions$ = of(action);

      effects.navigateToRecipeDetails$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([
          '/recipes',
          mockRecipe.idMeal,
        ]);
      });
    });
  });
});

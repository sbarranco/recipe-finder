import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZoneChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  mockApiResponse,
  mockRecipe,
} from '../state/models/__mocks__/recipe.model.mock';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipeService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZoneChangeDetection({ ignoreChangesOutsideZone: true }),
      ],
    });

    service = TestBed.inject(RecipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchRecipes', () => {
    it('should return an array of recipes', (done) => {
      const keyword = 'chicken';

      service.searchRecipes(keyword).subscribe((recipes) => {
        expect(recipes.length).toBe(1);
        expect(recipes[0]).toEqual(mockRecipe);
        done();
      });

      const req = httpMock.expectOne(
        `${service['apiUrl']}/search.php?s=${keyword}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });
  });

  describe('getRecipeDetails', () => {
    it('should fetch recipe details by ID', (done) => {
      const recipeId = '12345';

      service.getRecipeDetails(recipeId).subscribe((recipe) => {
        expect(recipe).toEqual(mockRecipe);
        done();
      });

      const req = httpMock.expectOne(
        `${service['apiUrl']}/lookup.php?i=${recipeId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush({ meals: [mockRecipe] });
    });
  });

  describe('getRandomRecipe', () => {
    it('should fetch a random recipe', () => {
      service.getRandomRecipe().subscribe((recipes) => {
        expect(recipes.length).toBe(1);
        expect(recipes[0]).toEqual(mockRecipe);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/random.php`);
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });
  });

  describe('processRecipes', () => {
    it('should extract ingredients and measures correctly', () => {
      const transformedMeals = mockApiResponse.meals.map((meal) => ({
        ...meal,
        ingredients: [],
      }));
      const processedRecipes = service['processRecipes'](transformedMeals);
      expect(processedRecipes.length).toBe(1);
    });

    it('should handle empty or null ingredients gracefully', () => {
      const mockApiResponseWithEmptyIngredients = {
        meals: [
          {
            idMeal: '12345',
            strMeal: 'Test Meal',
            strCategory: 'Test Category',
            strArea: 'Test Area',
            strInstructions: 'Test Instructions',
            strMealThumb: 'https://example.com/image.jpg',
            strIngredient1: null,
            strMeasure1: null,
            strTags: 'Test Tag',
          },
        ],
      };

      const mealsWithRequiredFields =
        mockApiResponseWithEmptyIngredients.meals.map((meal) => ({
          ...meal,
          ingredients: [],
        }));
      const processedRecipes = service['processRecipes'](
        mealsWithRequiredFields
      );
      expect(processedRecipes.length).toBe(1);
      expect(processedRecipes[0].ingredients).toEqual([]);
    });
  });
});

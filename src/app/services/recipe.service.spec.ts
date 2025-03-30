import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { RecipeService } from './recipe.service';
import { Recipe } from '../state/models/recipe.model';
import { provideZoneChangeDetection } from '@angular/core';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

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
      const keyword = 'Arrabiata';
      const mockResponse = {
        meals: [{ idMeal: '1', strMeal: 'Test Meal' }] as Recipe[],
      };

      service.searchRecipes(keyword).subscribe((response) => {
        expect(response).toEqual(mockResponse.meals);
        expect(response.length).toBe(1);
      });
      const req = httpMock.expectOne(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`
      );
      expect(req.request.method).toBe('GET');
      req.flush({ mockResponse });
      done();
    });

    it('should return an empty array if no meals are found', (done) => {
      const keyword = 'test';

      service.searchRecipes(keyword).subscribe((response) => {
        expect(response).toEqual([]);
        done();
      });
    });
  });

  describe('getRecipeDetails', () => {
    it('should return a single recipe', (done) => {
      const mockResponse = {
        meals: [{ idMeal: '1', strMeal: 'Test Meal' }] as Recipe[],
      };
      httpMock.get.mockReturnValue(of(mockResponse));

      service.getRecipeDetails('1').subscribe((recipe) => {
        expect(recipe).toEqual(mockResponse.meals[0]);
        expect(httpMock.get).toHaveBeenCalledWith(
          'https://www.themealdb.com/api/json/v1/1/lookup.php?i=1'
        );
        done();
      });
    });

    it('should return an empty object if no recipe is found', (done) => {
      const mockResponse = { meals: null };
      httpMock.get.mockReturnValue(of(mockResponse));

      service.getRecipeDetails('1').subscribe((recipe) => {
        expect(recipe).toEqual({});
        done();
      });
    });
  });

  describe('getRandomRecipe', () => {
    it('should return an array of random recipes', (done) => {
      const mockResponse = {
        meals: [{ idMeal: '1', strMeal: 'Random Meal' }] as Recipe[],
      };
      httpMock.get.mockReturnValue(of(mockResponse));

      service.getRandomRecipe().subscribe((recipes) => {
        expect(recipes).toEqual(mockResponse.meals);
        expect(httpMock.get).toHaveBeenCalledWith(
          'https://www.themealdb.com/api/json/v1/1/random.php'
        );
        done();
      });
    });

    it('should return an empty array if no random recipes are found', (done) => {
      const mockResponse = { meals: null };
      httpMock.get.mockReturnValue(of(mockResponse));

      service.getRandomRecipe().subscribe((recipes) => {
        expect(recipes).toEqual([]);
        done();
      });
    });
  });
});

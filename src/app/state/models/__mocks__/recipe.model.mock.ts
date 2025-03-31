import { Recipe } from '../recipe.model';

export const mockRecipe: Recipe = {
  idMeal: '12345',
  strMeal: 'Test Meal',
  strCategory: 'Test Category',
  strArea: 'Test Area',
  strInstructions: 'Test Instructions',
  strMealThumb: 'https://example.com/image.jpg',
  strTags: '',
  ingredients: [],
  isFavorite: false,
};

export const mockApiResponse = {
  meals: [mockRecipe],
};

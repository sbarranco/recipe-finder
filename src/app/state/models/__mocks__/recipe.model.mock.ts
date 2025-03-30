import { Recipe } from '../recipe.model';

export const mockRecipe: Recipe = {
  idMeal: '52772',
  strMeal: 'Spaghetti Carbonara',
  strCategory: 'Pasta',
  strArea: 'Italian',
  strInstructions: `Bring a large pot of salted water to a boil. Cook the spaghetti according to the package instructions. 
    Meanwhile, heat a large skillet over medium heat. Add pancetta and cook until crispy. 
    In a bowl, whisk together eggs, Parmesan, and black pepper. 
    Drain the pasta and toss it with the pancetta. Remove from heat and quickly mix in the egg mixture. Serve immediately.`,
  strIngredients: [
    'Spaghetti - 400g',
    'Pancetta - 150g',
    'Eggs - 3',
    'Parmesan Cheese - 50g',
    'Black Pepper - to taste',
    'Salt - to taste',
  ],
  strMealThumb:
    'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
  strTags: 'Pasta,Quick',
  strYoutube: 'https://www.youtube.com/watch?v=3AAdKl1UYZs',
};

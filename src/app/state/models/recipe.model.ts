export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  ingredients: Ingredients[];
  strMealThumb: string;
  strTags: string;
  isFavorite?: boolean;
}

export interface Ingredients {
  ingredient: string;
  measure: string;
}

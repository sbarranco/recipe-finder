import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Recipe } from "../state/models/recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private readonly apiUrl = "https://www.themealdb.com/api/json/v1/1";
  private readonly http = inject(HttpClient);

  searchRecipes(keyword: string): Observable<Recipe[]> {
    return this.http
      .get<{ meals: Recipe[] }>(`${this.apiUrl}/search.php?s=${keyword}`)
      .pipe(map((response) => this.processRecipes(response.meals || [])));
  }

  getRecipeDetails(id: string): Observable<Recipe> {
    return this.http
      .get<{ meals: Recipe[] }>(`${this.apiUrl}/lookup.php?i=${id}`)
      .pipe(map((response) => this.processRecipes(response.meals || [])[0]));
  }

  getRandomRecipe(): Observable<Recipe[]> {
    return this.http
      .get<{ meals: Recipe[] }>(`${this.apiUrl}/random.php`)
      .pipe(map((response) => this.processRecipes(response.meals || [])));
  }

  private processRecipes(recipes: Recipe[]): Recipe[] {
    return recipes.map((recipe) => {
      const ingredients = Array.from({ length: 20 }, (_, i) => {
        const ingredient = recipe[
          `strIngredient${i + 1}` as keyof Recipe
        ] as string;
        const measure = recipe[`strMeasure${i + 1}` as keyof Recipe] as string;
        return ingredient && ingredient.trim() ? { ingredient, measure } : null;
      }).filter((item) => item !== null);

      return {
        ...recipe,
        ingredients,
      };
    });
  }
}

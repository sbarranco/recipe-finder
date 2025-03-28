import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private apiUrl = "https://www.themealdb.com/api/json/v1/1";

  constructor(private http: HttpClient) {}

  // Search recipes by keyword
  searchRecipes(keyword: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search.php?s=${keyword}`);
  }

  // Get recipe details by ID
  getRecipeDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lookup.php?i=${id}`);
  }

  // Get random recipe
  getRandomRecipe(): Observable<any> {
    return this.http.get(`${this.apiUrl}/random.php`);
  }
}

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Recipe } from './recipe.model';
import { catchError } from 'rxjs/internal/operators';
import { map, tap, distinctUntilChanged } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const endpoint = '/recipe/api';

@Injectable()

export class RecipeService {
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  private extractData(res: Response): any {
    const body = res;
    console.log('body', body)
    return body || {};
  }


  recipesChanged = new Subject<Recipe[]>();
  public recipes: Recipe[] = [];
  constructor(private shoppingList: ShoppingListService, private toastr: ToastrService, private http: HttpClient) { }

  getRecipe(index: number) {
    return this.recipes.find((data: any) => data.id === index);
  }

  getRecipes(): Observable<any> {
    return this.http.get(endpoint + "/recipe").pipe(
      tap((res: any) => {
        this.recipes = res.recipes
        this.recipesChanged.next(res.recipes)
      })
    )
  }

  updateRecipe(index: number, newRecipe: Recipe): Observable<any> {
    return this.http.put(endpoint + 'recipe/' + index, newRecipe).pipe(
      tap(data => {
        const tempRes = this.recipes.filter((res: any) => res.id !== data.id)
        this.recipes = [...tempRes, data]
        this.recipesChanged.next(this.recipes.slice());
      })
    )
  }

  addIngredients(recipe): Observable<any> {
    return this.http.post(endpoint + 'toShoppingList/' + recipe.id, {})
  }

  deleteRecipe(index: number): Observable<any> {
    return this.http.delete(endpoint + 'recipe/' + index).pipe(
      map((data: any) => {
        if (data.ok) {
          this.recipes = this.recipes.filter((data: any) => data.id !== index)
          this.recipesChanged.next(this.recipes.slice())
        }
      })
    )

  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(endpoint + 'recipe', recipe).pipe(
      tap((data: any) => {
        this.recipes = [data, ...this.recipes]
        this.recipesChanged.next(this.recipes.slice())
        this.toastr.success("Recipe Added Successfully", "Success");
      })
    )

  }
}
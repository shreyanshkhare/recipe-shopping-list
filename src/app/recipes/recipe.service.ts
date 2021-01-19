import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Recipe } from './recipe.model';
import { catchError } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const endpoint = 'https://premchalmeti.com/recipe/';
const access ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTEwNzc5MDQsImlhdCI6MTYxMTA3NjEwNCwibmJmIjoxNjExMDc2MTA0LCJpZGVudGl0eSI6MX0._iJRGAXYSwp_oTEXNQUhQUVgpD-X8OaC1OYjF2Dbf0s"

var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': "JWT " + access
});

const httpOptions = {
  headers: headers_object
};

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
    console.log('body',body)
    return body || {};
}


  recipesChanged = new Subject<Recipe[]>();
  public recipes: Recipe[] = [];
  constructor(private shoppingList: ShoppingListService, private toastr: ToastrService,private http: HttpClient) { }

  getRecipe(index: number) {
    return this.recipes.find((data:any)=>data.id === index);
  }

  getRecipes(){
    return this.http.get(endpoint+"recipe",httpOptions);
  }

  updateRecipe(index: number, newRecipe: Recipe):Observable<any> {
    return this.http.put(endpoint+'recipe/'+index,newRecipe,httpOptions)
  }

  addIngredients(recipe):Observable<any> {
    return this.http.post(endpoint+'toShoppingList/'+recipe.id,{},httpOptions)
  }

  deleteRecipe(index: number):Observable<any> {
    return this.http.delete(endpoint+'recipe/'+index,httpOptions).pipe(
      map((data:any) => {
        if(data.ok){
          this.getRecipes().subscribe((data:any)=>{
            console.log('data',data)
            this.recipes = data.recipes;
            this.recipesChanged.next(this.recipes.slice())})
        }
      })
    )

  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(endpoint+'recipe',recipe,httpOptions)
  }
}
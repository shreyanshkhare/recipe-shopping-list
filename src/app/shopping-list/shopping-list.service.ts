
import { EventEmitter, Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../shared/ingredient.model';
const endpoint = 'http://localhost:5000/';
@Injectable()
export class ShoppingListService {

    updatedIngredients = new EventEmitter<Ingredient[]>();
    startedEditing = new Subject<Number>();

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
        return body || {};
    }

    private ingredients: Ingredient[] = [];

    constructor(private http: HttpClient) { }

    getIngredients(): Observable<any> {
        return this.http.get(endpoint + "shoppingItemList").pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    getIngredient(id: number): Observable<any> {
        return this.http.get(endpoint + "shoppingItemUpdate/" + id).pipe(
            catchError(this.handleError)
        );
    }


    addIngredient(ingredient: Ingredient): Observable<any> {
        return this.http.post(endpoint + "shoppingItem/" + ingredient.name, {
            "amount": ingredient.amount
        }).pipe(
            catchError(this.handleError)
        );
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
        this.updatedIngredients.emit(this.ingredients.slice())
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.updatedIngredients.emit(this.ingredients.slice());
    }


    deleteIngredient(id: number): Observable<any> {
        console.log(endpoint + "shoppingItemUpdate/" + id)
        return this.http.delete<any>(endpoint + "shoppingItemUpdate/" + id).pipe(
            catchError(this.handleError)
        );
    }

}
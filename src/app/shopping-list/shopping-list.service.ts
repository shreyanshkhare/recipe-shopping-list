
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

const endpoint = '/recipe/api/';

@Injectable()
export class ShoppingListService {

    updatedIngredients = new BehaviorSubject<Ingredient[]>([]);
    startedEditing = new Subject<number>();

    constructor(private http: HttpClient) {
    }

    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.log(error.error.message);
        } else {
            console.log("Error code: ", error)
        }
        return throwError(
            'Something bad happened; please try again later.');
    }
    private extractData(res: Response): any {
        const body = res;
        return body || {};
    }

    public ingredients: Ingredient[] = [];




    getIngredients() {
        return this.http.get(endpoint + "shoppingItemList").pipe(
            catchError(this.handleError),
            tap((res: any) => {
                if (res) {
                    this.ingredients = res.items;
                    this.updatedIngredients.next(this.ingredients.slice());
                }
            })
        ).subscribe((resp: any) => {
            resp

        });

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
            catchError(this.handleError),
            tap((res: any) => {
                this.ingredients = [...this.ingredients, res];
                this.updatedIngredients.next(this.ingredients);
            })
        );
    }

    // addIngredients(ingredients: Ingredient[]) {
    //     this.ingredients.push(...ingredients)
    //     // this.updatedIngredients.emit(this.ingredients.slice())
    // }

    updateIngredient(index: number, newIngredient: Ingredient) {
        return this.http.put(endpoint + "shoppingItemUpdate/" + index, {
            "name": newIngredient.name,
            "amount": newIngredient.amount
        }).pipe(
            catchError(this.handleError),
            tap((res: any) => {
                var foundIndex = this.ingredients.findIndex(x => x.id == res.id);
                this.ingredients[foundIndex] = res;
                this.updatedIngredients.next(this.ingredients.slice());
            })
        );
    }


    deleteIngredient(id: number): Observable<any> {
        return this.http.delete(endpoint + "shoppingItemUpdate/" + id).pipe(
            catchError(this.handleError),
            tap((res: any) => {
                this.ingredients = this.ingredients.filter(x => x.id !== id);
                this.updatedIngredients.next(this.ingredients.slice());
            })
        );
    }

}
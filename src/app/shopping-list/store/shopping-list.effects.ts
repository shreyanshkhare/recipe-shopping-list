import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as fromShoppingList from './shopping-list.actions'

const endpoint = '/recipe/api/';

@Injectable()
export class ShoppingListEffects{
    @Effect()
    ShoppingList = this.actions$.pipe(
        ofType(fromShoppingList.FETCH_INGREDIENT),
        switchMap((data:fromShoppingList.FetchIngredients)=>{
            return this.http.get(endpoint + "shoppingItemList").pipe(
            map((res: any) => {
                if (res) {
                    const response = res.items
                    return new fromShoppingList.GetIngredients(response)
                }
            })
            )
        })
    )
    constructor(private actions$:Actions, private http:HttpClient,private toastr: ToastrService){}
}

@Injectable()
export class AddIngredientEffects{
    @Effect()
    addIngredient = this.actions$.pipe(
        ofType(fromShoppingList.START_ADD_INGREDIENTS),
        switchMap((ingredient:fromShoppingList.StartAddingIngredient)=>{
            return this.http.post(endpoint + "shoppingItem/" + ingredient.payload.name, {
               "name":ingredient.payload.name,
                "amount": ingredient.payload.amount
            }).pipe(
                map((res:any)=>{
                    this.toastr.success("Ingredient Added Successfully", "Success");
                    return new fromShoppingList.AddIngredient(res)
                })
            )
        })
    )
    constructor(private actions$:Actions,private http:HttpClient,private toastr: ToastrService){}
}


@Injectable()
export class UpdateIngredientEffects{
    @Effect()
    updateIngredient = this.actions$.pipe(
        ofType(fromShoppingList.START_UPDATING_INGREDIENTS),
        switchMap((ingredient:fromShoppingList.StartUpdatingIngredient)=>{
            return this.http.put(endpoint + "shoppingItemUpdate/" + ingredient.payload.index, {
                "name": ingredient.payload.ingredient.name,
                "amount": ingredient.payload.ingredient.amount,
                "id": ingredient.payload.ingredient.id
            }).pipe(
                map((res:any)=>{
                    this.toastr.success("Ingredient Updated Successfully", "Success");
                    return new fromShoppingList.UpdateIngredient({ index: ingredient.payload.index, ingredient:res })
                })
            )
        })
    )
    constructor(private actions$:Actions,private http:HttpClient,private toastr: ToastrService){}
}


@Injectable()
export class DeleteIngredientEffects{
    @Effect()
    updateIngredient = this.actions$.pipe(
        ofType(fromShoppingList.START_DELETE_INGREDIENTS),
        switchMap((id:fromShoppingList.StartDeleteIngredient)=>{
            return this.http.delete(endpoint + "shoppingItemUpdate/" + id.payload).pipe(
                map((res:any)=>{
                    this.toastr.success("Ingredient deleted Successfully", "Success");
                    return new fromShoppingList.DeleteIngredient(id.payload)
                })
            )
        })
    )
    constructor(private actions$:Actions,private http:HttpClient,private toastr: ToastrService){}
}
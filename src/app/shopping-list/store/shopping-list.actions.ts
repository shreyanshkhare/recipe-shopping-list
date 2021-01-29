import { Action } from "@ngrx/store";
import { Recipe } from "src/app/recipes/recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const FETCH_INGREDIENT = 'FETCH_INGREDIENT';
export const START_ADD_INGREDIENTS = 'START_ADD_INGREDIENTS';
export const START_UPDATING_INGREDIENTS = 'START_UPDATING_INGREDIENTS';
export const START_DELETE_INGREDIENTS = 'START_DELETE_INGREDIENTS';
export const START_Add_INGREDIENTS = 'START_Add_INGREDIENTS'

export class GetIngredients implements Action {
    readonly type = GET_INGREDIENTS;
    constructor(public payload: Ingredient[]) { }
}

export class FetchIngredients implements Action {
    readonly type = FETCH_INGREDIENT;
    props
    constructor() {}
}

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) { }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload: { index: number, ingredient: Ingredient }) { }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) { }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    constructor(public payload: number) { }
}
export class StartAddingIngredient implements Action {
    readonly type = START_ADD_INGREDIENTS;
    constructor(public payload: Ingredient) { }
}
export class StartUpdatingIngredient implements Action {
    readonly type = START_UPDATING_INGREDIENTS;
    constructor(public payload: { index: number, ingredient: Ingredient }) { }
}

export class StartDeleteIngredient implements Action {
    readonly type = START_DELETE_INGREDIENTS;
    constructor(public payload: number) { }
}

export type ShoppingListActions = AddIngredient | UpdateIngredient | AddIngredients | DeleteIngredient | GetIngredients
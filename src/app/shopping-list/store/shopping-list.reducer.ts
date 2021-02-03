import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { ADD_INGREDIENT } from './shopping-list.actions'
import * as ShoppingListActions from './shopping-list.actions'

export interface State {
    ingredients: Ingredient[];
}

const initialState = {
    ingredients: []
}

export function shoppingListReducer(
    state = initialState,
    action: ShoppingListActions.ShoppingListActions
) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const foundIndex = state.ingredients.findIndex(x => x.id === action.payload.index);
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[foundIndex] = action.payload.ingredient;
            return {
                ...state,
                ingredients: updatedIngredients
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(ingredient => ingredient.id !== action.payload)
            };
        case ShoppingListActions.GET_INGREDIENTS:
            return {
                ...state,
                ingredients: [...action.payload]
            };
        default:
            return state;
    }
}
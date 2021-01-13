
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';


export class ShoppingListService{
    updatedIngredients = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

getIngredients(){
    return this.ingredients.slice();
}

addIngredient(ingredient:Ingredient){
     this.ingredients.push(ingredient);
     this.updatedIngredients.emit(this.ingredients.slice())    
}

 addIngredients(ingredients){
    this.ingredients.push(...ingredients)
    this.updatedIngredients.emit(this.ingredients.slice())
}

}
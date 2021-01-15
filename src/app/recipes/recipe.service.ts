import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Recipe} from './recipe.model';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    )
  ];
  constructor(private shoppingList:ShoppingListService,private toastr: ToastrService){}

      getRecipe(index: number) {
        return this.recipes[index];
      }

      getRecipes() {
        return this.recipes.slice();
    }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.toastr.success("Recipe Updated Successfully","Success",{
          positionClass: 'toast-top-center',
        });
        this.recipesChanged.next(this.recipes.slice());
      }

      addIngredients(ingredients:Ingredient){
        this.shoppingList.addIngredients(ingredients)
        this.toastr.success("Ingredients Added Successfully","Success",{
          positionClass: 'toast-top-center',
        });
    }

     deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.toastr.success("Recipe Deleted Successfully","Success",{
      positionClass: 'toast-top-center',
    });
    this.recipesChanged.next(this.recipes.slice());
  } 

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.toastr.success("Recipe Added Successfully","Success",{
      positionClass: 'toast-top-center',
    });
    this.recipesChanged.next(this.recipes.slice());
  }
}
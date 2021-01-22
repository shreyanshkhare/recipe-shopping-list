import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private shoppingList: ShoppingListService, private toastr: ToastrService) { }

  ngOnInit() {
    this.subscription = this.shoppingList.updatedIngredients.subscribe(
      (ingredient: Ingredient[]) => this.shoppingList.ingredients = ingredient
    )
    this.shoppingList.getIngredients();
    this.shoppingList.updatedIngredients.subscribe((ingredient: Ingredient[]) => {
      this.ingredients = ingredient;
    });
  }



  onEditItem(id: number) {
    this.shoppingList.startedEditing.next(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

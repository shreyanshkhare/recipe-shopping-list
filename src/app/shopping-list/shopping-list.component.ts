import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit() {
    this.shoppingList.getIngredients().subscribe((resp: any) => {
      this.ingredients = resp.items;
    });
    this.subscription = this.shoppingList.updatedIngredients.subscribe(
      (ingredient: Ingredient[]) => this.ingredients = ingredient
    )
  }

  onEditItem(id: number) {
    this.shoppingList.startedEditing.next(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

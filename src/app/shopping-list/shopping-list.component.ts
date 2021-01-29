import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import * as fromShoppingListAction from './store/shopping-list.actions'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations:[trigger('divState',[
    state('in',style({
      opacity:1,
      transform:'translateX(0)'
    })),
    transition('void => *',[
      style({
        opacity:0,
        transform:'translateX(-100px)',
        color:'white',
        backgroundColor:'green'
      }),
      animate(600)
    ]),
    transition('* => void',[
      animate(500, style({
        transform:'translateX(100px)',
        opacity:0,
        color:'white',
        backgroundColor:'red'
      }))
    ])
  ])]
})
export class ShoppingListComponent implements OnInit {

  ingredients: Observable<{ingredients:Ingredient[]}>;
  private subscription: Subscription;

  constructor(
    private shoppingList: ShoppingListService,
    private store:Store<fromApp.AppState>
    ) { }


  ngOnInit() {
  this.store.dispatch(new fromShoppingListAction.FetchIngredients())
  this.ingredients = this.store.select('shoppingList')
  }



  onEditItem(id: number) {
    this.shoppingList.startedEditing.next(id);
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}

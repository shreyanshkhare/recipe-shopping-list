import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
  OnChanges
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions'
import * as fromApp from './../../store/app.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  getIngredient: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  isVisible = false;
  ingredient = Ingredient;
  title = 'Delete';

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (id: number) => {
          this.editMode = true;
          this.editedItemIndex = id;
          this.store.select('shoppingList').subscribe((data: any) => {
            let ingredient = data.ingredients;
            ingredient = ingredient.find(ingredient => ingredient.id === id);
            if (ingredient) {
              this.slForm.setValue({
                id: ingredient.id,
                name: ingredient.name,
                amount: ingredient.amount
              });
            }
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = { id: value.id, name: value.name, amount: value.amount }

    if (this.editMode) {
      this.editMode = false;
      this.onClear();
      form.reset();
      this.store.dispatch(new ShoppingListActions.StartUpdatingIngredient({ index: this.editedItemIndex, ingredient: newIngredient }))

    } else {
      this.editMode = false;
      this.onClear();
      form.reset();
      this.store.dispatch(new ShoppingListActions.StartAddingIngredient(newIngredient));


    }
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnChanges() {
    console.log('this.editMode ', this.editMode);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

  confirmDelete(): void {
    this.store.dispatch(new ShoppingListActions.StartDeleteIngredient(this.editedItemIndex))
    this.isVisible = false;
    this.editMode = false;
    this.slForm.reset();

  }

  cancelChanges() {
    this.isVisible = false;
  }

  onDelete() {
    this.isVisible = true;
  }

}

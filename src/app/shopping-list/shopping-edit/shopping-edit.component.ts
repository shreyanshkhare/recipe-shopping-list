import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Input
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  isVisible = false
  ingredient = Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (id: number) => {
          this.editMode = true;
          this.editedItemIndex = id;
          this.slService.getIngredient(id).subscribe(
            (data: Ingredient) =>
              this.slForm.setValue({
                id: data.id,
                name: data.name,
                amount: data.amount
              })
          );
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }


  onDelete(): void {
    this.onClear();
    this.isVisible = false;
    this.slService.deleteIngredient(this.editedItemIndex)
      .subscribe(() => {
        this.slService.getIngredients();
      }, (err) => {
        console.log(err);
      }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  confirmDelete() {
    this.isVisible = true;
  }

  cancelChanges() {
    this.isVisible = false;
  }

}

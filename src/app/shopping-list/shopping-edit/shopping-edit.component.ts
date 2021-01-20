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
import { ToastrService } from 'ngx-toastr';

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
  title="Delete"

  constructor(private slService: ShoppingListService, private toastr: ToastrService) { }

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
    const newIngredient = { id: value.id, name: value.name, amount: value.amount }
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
        .subscribe((resp) => {
          this.onClear();
          this.isVisible = false;
          this.toastr.success("Ingredient Updated Successfully", "Success");
        }, (err) => {
          this.toastr.error("Something went wrong", "Error");
        })
    } else {
      this.editMode = false;
      form.reset();
      this.slService.addIngredient(newIngredient)
        .subscribe((resp) => {
          this.onClear();
          this.isVisible = false;
          this.toastr.success("Ingredient Added Successfully", "Success");
        }, (err) => {
          this.toastr.error("Something went wrong", "Error");
        })
    }
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  confirmDelete(): void {
    this.slService.deleteIngredient(this.editedItemIndex)
      .subscribe(() => {
        this.onClear();
        this.isVisible = false;
        this.toastr.success("Ingredient Deleted Successfully", "Success");
      }, (err) => {
        this.toastr.error("Something went wrong", "Error");
      }
      );
  }

  cancelChanges() {
    this.isVisible = false;
  }

  onDelete(){
    this.isVisible = true;
  }

}

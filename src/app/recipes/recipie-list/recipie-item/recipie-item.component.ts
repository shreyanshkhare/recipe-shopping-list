import { Component, Input, OnInit ,EventEmitter, Output} from '@angular/core';
import { Recipe } from '../../recipe.modal';

@Component({
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrls: ['./recipie-item.component.css']
})
export class RecipieItemComponent implements OnInit {
  @Input() recipeItem = Recipe;
  @Output() recipeSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

onSelected(){
  this.recipeSelected.emit()
}

}

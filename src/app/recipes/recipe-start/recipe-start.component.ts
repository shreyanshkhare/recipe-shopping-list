import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {
  recipes:Recipe[]
  constructor(private recipe:RecipeService) { }

  ngOnInit(): void {
    this.recipe.recipesChanged.subscribe((data:Recipe[])=>{
        this.recipes =data;
    })
  }

}

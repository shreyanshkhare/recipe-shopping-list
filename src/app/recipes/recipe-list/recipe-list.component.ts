import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription: Subscription;
  loading:boolean = true

  constructor(private recipeService: RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe((recipe:Recipe[])=>{
      this.recipes = recipe;
    })
    this.recipeService.getRecipes().subscribe(()=>{
      this.loading = false
    })
    this.recipeService.recipesChanged.subscribe((recipe:Recipe[])=>{
      this.recipes = recipe;
    })
  }

  onRecipeSelected(recipe: Recipe) {
   this.recipeWasSelected.emit(recipe);
  }

  addNewRecipe(){
    this.router.navigate(['addNewRecipe'],{relativeTo:this.route});
  }

}

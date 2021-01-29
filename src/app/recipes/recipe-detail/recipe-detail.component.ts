import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  isVisible: boolean = false;
  title = "Delete"

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id)
        this.recipeService.recipesChanged.subscribe((recipes: any) => {
          this.recipe = recipes.find((data: any) => data.id === this.id);
        })
      }
    )
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  addToShoppingList(recipe: Recipe) {
    this.recipeService.addIngredients(recipe).subscribe(data => {
      if (data.ok) {
        this.toastr.success('Ingredients Added Successfully', "Success");
      }
    })
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id).subscribe(() =>
      this.toastr.success("Recipe deleted Successfully", "Success")
    )
    this.isVisible = false;
    // console.log('check',this.recipeService.recipes)
    this.router.navigate(['/recipes']);
  }

  deleteRecipe() {
    this.isVisible = true;
  }

  cancelChanges() {
    this.isVisible = false;
  }

}
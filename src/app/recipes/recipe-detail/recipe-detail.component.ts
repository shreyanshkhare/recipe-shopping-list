import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id)
      }
    )
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  addToShoppingList(recipe: Recipe) {
    this.recipeService.addIngredients(recipe).subscribe(data => {
      if (data.ok) {
        this.toastr.success("Ingredients Added Successfully", "Success", {
          positionClass: 'toast-top-center',
        });
      }
    })
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id).subscribe(() =>
      this.toastr.success("Ingredients Added Successfully", "Success", {
        positionClass: 'toast-top-center',
      })
      // this.recipeService.getRecipes().subscribe((rec: any) => {
      //   this.recipeService.recipesChanged.next(rec.recipes)
      //   this.toastr.success("Ingredients Added Successfully", "Success", {
      //     positionClass: 'toast-top-center',
      //   });
      // })
    )
    this.isVisible = false;
    console.log('check', this.recipeService.recipes)
    this.router.navigate(['/recipes']);
  }

  deleteRecipe() {
    this.isVisible = true;
  }

  cancelChanges() {
    this.isVisible = false;
  }

}
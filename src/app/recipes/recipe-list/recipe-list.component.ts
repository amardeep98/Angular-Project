import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("Test Recipe 1", "This is a test recipe", "https://cookwithparul.com/wp-content/uploads/2021/11/Eggless-Omelette-Recipe.jpg"),
    new Recipe("Test Recipe 2", "This is another test recipe", "https://eadn-wc02-3894996.nxedge.io/cdn/wp-content/uploads/2018/01/pistachio-turmeric-rice-bowl6-1024x683.jpg")
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}

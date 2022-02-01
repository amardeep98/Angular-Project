import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe("Chicken Biryani",
     "Most sought out dish in India",
      "https://i.tribune.com.pk/media/images/1590373-biryani-1513939158/1590373-biryani-1513939158.gif",
      [new Ingredient('rice', 1),
      new Ingredient('chicken', 2)]
    ),
    new Recipe("Burger",
     "Take away food", 
     "https://www3.pictures.zimbio.com/mp/wwj1hrnad01x.jpg",
      [new Ingredient('bread', 1),
      new Ingredient('meat slice', 1)]
    )
  ];
  
  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

}

import { Subject } from 'rxjs';
import {  Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recepiChange = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }


  addRecepi(recepi: Recipe){
    this.recipes.push(recepi);
    this.recepiChange.next(this.recipes.slice());
  }

  updateRecepi(indeks: number, recepi: Recipe){
    this.recipes[indeks] = recepi;
    this.recepiChange.next(this.recipes.slice());
  }

  deliteRecepi(indeks: number){
    this.recipes.splice(indeks, 1);
    this.recepiChange.next(this.recipes.slice());
  }

  setRecepis(rec: Recipe[]){
    this.recipes = rec;
    this.recepiChange.next(this.recipes.slice());
  }
}

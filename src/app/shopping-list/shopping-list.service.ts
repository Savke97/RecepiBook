import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  poceoEditovanje = new Subject<number>();
  private ingredients: Ingredient[] = [];


  getIngredients() {
    return this.ingredients.slice();
  }

  getIngridient(indeks: number){
    return this.ingredients[indeks];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    /* Ovde je bilo emit al posto kotistimo Subject observbl onta menjamo sa ovim */
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    /* I ovde isto za emit */
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngridient(indeks: number, newIngridient: Ingredient){
    this.ingredients[indeks] = newIngridient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deliteIngridient(indeks: number){
      this.ingredients.splice(indeks, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
  }
}

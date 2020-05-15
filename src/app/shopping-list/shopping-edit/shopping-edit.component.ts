import { Ingredient } from './../../shared/ingredient.model';
import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})


export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editItamIndeks: number;
  editingItem: Ingredient;
  @ViewChild('f') slForm: NgForm;
  /* @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef; */

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.poceoEditovanje.subscribe(
      (indeks: number) => {
        this.editItamIndeks = indeks;
        this.editMode = true;
        this.editingItem = this.slService.getIngridient(indeks);
        this.slForm.setValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    /* const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value; */
    const vrednost = form.value;
    const newIngredient = new Ingredient(vrednost.name, vrednost.amount);
    if(this.editMode){
      this.slService.updateIngridient(this.editItamIndeks, newIngredient);
      this.editMode = false;
    }else{
      this.slService.addIngredient(newIngredient);
    }
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.onClear();
    this.slService.deliteIngridient(this.editItamIndeks);
  }

  ngOnDestroy(){
      this.subscription.unsubscribe();
  }

}

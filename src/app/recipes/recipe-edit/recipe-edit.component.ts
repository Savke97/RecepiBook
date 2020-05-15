import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recepiForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recepiService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit(){
    const newRecepi = new Recipe(
      this.recepiForm.value['name'],
      this.recepiForm.value['opis'],
      this.recepiForm.value['imgPath'],
      this.recepiForm.value['namernice'],
    )
    if(this.editMode){
      this.recepiService.updateRecepi(this.id, newRecepi);
    }else{
      this.recepiService.addRecepi(newRecepi);
    }
    this.onCancel(); 
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeliteIng(indeks: number){
    (<FormArray>this.recepiForm.get('namernice')).removeAt(indeks);
  }

  onAddIngridient(){
    (<FormArray>this.recepiForm.get('namernice')).push(
      new FormGroup({
              'name': new FormControl(null,Validators.required),
              'amount': new FormControl(null,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0+9]*$/)
              ])
      })
    )
  }

  private initForm(){
    let recepiName = '';
    let recImgPath = '';
    let Opis = '';
    let ingridients = new FormArray([]);

    if(this.editMode){
      const recepi = this.recepiService.getRecipe(this.id);
      recepiName = recepi.name; 
      recImgPath = recepi.imagePath;
      Opis  = recepi.description;
      if(recepi['ingredients']){
        for(let ing of recepi.ingredients){
          ingridients.push(
            new FormGroup({
              'name': new FormControl(ing.name, Validators.required),
              'amount': new FormControl(ing.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0+9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recepiForm = new FormGroup({
        'name': new FormControl(recepiName, Validators.required),
        'imgPath': new FormControl(recImgPath, Validators.required),
        'opis': new FormControl(Opis, Validators.required),
        'namernice': ingridients
    });
  }

 

}

import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';





@Injectable()
export class DataStorage {
    constructor(private http: Http, private recepisService: RecipeService){}

    storerecepis(){
       return this.http.put('https://recepibook-98720.firebaseio.com/recepis.json', this.recepisService.getRecipes());
    }

    getRecepis(){
        this.http.get('https://recepibook-98720.firebaseio.com/recepis.json')
        .map(
            (response: Response) => {
                const recepis: Recipe[] = response.json();
                for(let rec of recepis){
                    if(!rec['ingredients']){
                        console.log(rec);
                        rec['ingredients'] = [];
                    }
                }
                return recepis;
            }
        )
        .subscribe(
           ( recepis: Recipe[] ) => {
                this.recepisService.setRecepis(recepis);
            }
        );
    }
}
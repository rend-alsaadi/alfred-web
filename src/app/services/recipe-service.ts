import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Recipe } from '../models/recipe-data-model';
import { environment } from '../../environments/environment';

@Injectable()
export class RecipeService {

    constructor(private http: Http) { }

    saveNewRecipe(newRecipe: Recipe) {
        return this.http.post(environment.apiURL + '/recipe', newRecipe).map(res => res.json()); 
    }

    getAllRecipes(){
        return this.http.get(environment.apiURL + '/recipe').map(res => res.json());
    }
}
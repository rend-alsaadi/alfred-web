import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
    let testRes = this.getRecipes().subscribe(res => console.log(res));
    console.log(testRes); 
  }

  getRecipes (){
    return this.http.get(environment.apiURL+'/recipe').map(res => res.json());
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

    private recipeFromRowClick = new BehaviorSubject<Object>({});
    currentRecipe = this.recipeFromRowClick.asObservable();

    constructor() { }

    updateRecipe(recipeToUpdate: Object) {
        this.recipeFromRowClick.next(recipeToUpdate)
    }
}
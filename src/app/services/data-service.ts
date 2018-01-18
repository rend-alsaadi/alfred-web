import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

    private recipeFromRowClick = new BehaviorSubject<Object>({});
    currentMessage = this.recipeFromRowClick.asObservable();

    constructor() { }

    updateRecipe(recipeToEdit: Object) {
        this.recipeFromRowClick.next(recipeToEdit)
    }
}
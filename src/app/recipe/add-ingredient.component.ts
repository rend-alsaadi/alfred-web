import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { InventoryService } from '../services/inventory-services';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    moduleId: module.id,
    selector: 'add-ingredient',
    templateUrl: 'add-ingredient.component.html'
})
export class AddIngredientComponent {
    @Input('group')
    public ingredientForm: FormGroup;
    units: any;
    public array = [];
    searchTerm$ = new Subject<string>();
    model: any;

    constructor(private inventoryService: InventoryService) { }

    /**
     * Formatts input and out of t he ng-type-ahead
     * Doesnt handle straight objects well
     */
    formatter = (x: { name: string }) => x.name;

    /**
    * searches inventory for all units that match 
    * @param test$ 
    */
    searchIngredients = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term =>
                this.inventoryService.searchInventory(term, '/inventory'));

    /**
     * searches inventory for all units that match 
     * @param test$ 
     */
    searchUnits = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term =>
                this.inventoryService.searchInventory(term, '/units'));
}
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription }   from 'rxjs/Subscription';

import { mealType, seasons } from '../models/recipe-data-model';

//services
import { InventoryService } from '../services/inventory-services';
import { RecipeService } from '../services/recipe-service';
import { DataService } from '../services/data-service';

@Component({
    selector: 'add-new-recipe',
    templateUrl: './add-new-recipe.component.html',
    styleUrls: ['./recipe.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AddNewRecipeComponent implements OnInit, OnDestroy {

    addNewRecipeForm: FormGroup;
    dropdownList = [];
    seasons = [];
    selectedItems = [];
    dropdownSettings = {};
    subscription: Subscription;

    constructor(private formBuilder: FormBuilder,
        private dataService: DataService,
        private inventoryService: InventoryService,
        private recipeService: RecipeService
    ) { }

    ngOnInit() {
        this.subscription = this.dataService.currentMessage.subscribe(message => console.log(message));
        this.createForm();
        this.dropdownList = mealType;
        this.seasons = seasons;
        this.selectedItems = [];
        this.dropdownSettings = {
            singleSelection: false,
            text: "Select Meal Type",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false
        };

    }

    createForm() {
        this.addNewRecipeForm = this.formBuilder.group({
            recipeName: ['', Validators.required],
            servings: ['', Validators.required],
            season: [''],
            mealType: [[]],
            ingredients: this.formBuilder.array([
                this.initIngredients()
            ]),
            directions: this.formBuilder.array([
            ])
        });
    }

    addRecipe(addNewRecipeForm) {
        console.log(addNewRecipeForm)
        this.recipeService.saveNewRecipe(addNewRecipeForm.value).subscribe(res => {
            console.log(res);
        });
    }

    initIngredients() {
        return this.formBuilder.group({
            amount: ['', Validators.required],
            unit: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    addIngredient() {
        const control = <FormArray>this.addNewRecipeForm.get('ingredients');
        const addrCtrl = this.initIngredients();
        control.push(addrCtrl);
    }

    removeIngredient(i: number) {
        const control = <FormArray>this.addNewRecipeForm.get('ingredients');
        control.removeAt(i);
    }

    initDirections() {
        return this.formBuilder.group({
            step: [''],
            direction: ['']
        });
    }

    addDirection() {
        const control = <FormArray>this.addNewRecipeForm.get('directions');
        const addrCtrl = this.initDirections();
        control.push(addrCtrl);
    }

    removeDirection(i: number) {
        const control = <FormArray>this.addNewRecipeForm.get('directions');
        control.removeAt(i);
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
      }
}
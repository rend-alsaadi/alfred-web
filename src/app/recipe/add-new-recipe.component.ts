import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { mealType, seasons } from '../models/recipe-data-model';

//services
import { InventoryService } from '../services/inventory-services';
import { RecipeService } from '../services/recipe-service';
import { DataService } from '../services/data-service';
import { isDefined } from '@ng-bootstrap/ng-bootstrap/util/util';

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
    recipeSubscription: Subscription;
    recipe;

    constructor(private formBuilder: FormBuilder,
        private dataService: DataService,
        private inventoryService: InventoryService,
        private recipeService: RecipeService
    ) { }

    ngOnInit() {
        this.recipeSubscription = this.dataService.currentRecipe.subscribe(recipeToEdit => {
            this.recipe = recipeToEdit
        });
        console.log(this.recipe);
        this.createForm();
        this.loadIngredients(this.recipe.ingredients);
        this.loadDirections(this.recipe.directions)
        this.dropdownList = mealType;
        this.seasons = seasons;
        this.dropdownSettings = {
            singleSelection: false,
            text: "Select Meal Type",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false
        };
    }

    createForm() {
        this.selectedItems = [];
        this.addNewRecipeForm = this.formBuilder.group({
            recipeName: [!_.isEmpty(this.recipe) ? this.recipe.recipeName : '', Validators.required],
            servings: [!_.isEmpty(this.recipe) ? this.recipe.servings : '', Validators.required],
            season: [!_.isEmpty(this.recipe) ? this.recipe.season : ''],
            mealType: [!_.isEmpty(this.recipe) ? this.selectedItems = this.recipe.mealType : ''],
            ingredients: this.formBuilder.array([]),
            directions: this.formBuilder.array([])
        });
    }

    addRecipe(addNewRecipeForm) {
        console.log(addNewRecipeForm)
        this.recipeService.saveNewRecipe(addNewRecipeForm.value).subscribe(res => {
            console.log(res);
        });
    }

    initIngredients(ingredient?) {
        return this.formBuilder.group({
            amount: [typeof ingredient !== 'undefined' ? ingredient.amount : '', Validators.required],
            unit: [typeof ingredient !== 'undefined' ? ingredient.unit : '', Validators.required],
            name: [typeof ingredient !== 'undefined' ? ingredient.name : '', Validators.required]
        });

    }

    addIngredient(ingredient) {
        const control = <FormArray>this.addNewRecipeForm.get('ingredients');
        const addrCtrl = this.initIngredients(ingredient);
        control.push(addrCtrl);
    }

    removeIngredient(i: number) {
        const control = <FormArray>this.addNewRecipeForm.get('ingredients');
        control.removeAt(i);
    }

    initDirections(direction?) {
        return this.formBuilder.group({
            step: [typeof direction !== 'undefined' ? direction.step : ''],
            direction: [typeof direction !== 'undefined' ? direction.instructions : '']
        });
    }

    addDirection(direction) {
        const control = <FormArray>this.addNewRecipeForm.get('directions');
        const addrCtrl = this.initDirections(direction);
        control.push(addrCtrl);
    }

    removeDirection(i: number) {
        const control = <FormArray>this.addNewRecipeForm.get('directions');
        control.removeAt(i);
    }

    loadIngredients(ingredientArray) {
        _.forEach(ingredientArray, (ingredient) => {
            this.addIngredient({
                amount: ingredient.amount,
                //have to format in this way so it can be read by the typeahead
                name: {
                    name: ingredient.name
                },
                unit: {
                    name: ingredient.unit
                }
            });
        });
    }

    loadDirections(directionArray){
        _.forEach(directionArray, (direction) => {
            this.addDirection(direction);
        }); 
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.recipeSubscription.unsubscribe();
    }
}
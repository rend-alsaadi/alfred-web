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
        this.selectedItems = [];
        this.createForm();
        this.loadIngredients(this.recipe.ingredients);
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
        this.addNewRecipeForm = this.formBuilder.group({
            recipeName: [!_.isEmpty(this.recipe)? this.recipe.recipeName : '', Validators.required],
            servings: [!_.isEmpty(this.recipe)? this.recipe.servings : '', Validators.required],
            season: [!_.isEmpty(this.recipe)? this.recipe.season : ''],
            mealType: [!_.isEmpty(this.recipe)? this.selectedItems = this.recipe.mealType : ''],
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
            amount: [typeof ingredient !== 'undefined'? ingredient.amount : 'test', Validators.required],
            unit: ['', Validators.required],
            name: ['', Validators.required]
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

    loadIngredients(ingredientArray) {
        //this.addIngredient(ingredientArray[0]);
        _.forEach(ingredientArray, (ingredient) => {
            this.addIngredient(ingredient);
        })
        /*
        console.log(ingredientArray);
        ingredientArray.array.forEach(element => {
            
        });
        forEach(ingredientArray, function(ingredient){
            this.addIngredient(ingredient);
        })
        _.forEach(ingredientArray, function (ingredient) {
        });
        */
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.recipeSubscription.unsubscribe();
    }
}
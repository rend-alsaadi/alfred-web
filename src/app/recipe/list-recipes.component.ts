import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from '../services/recipe-service';
import { GridOptions } from "ag-grid/main";
import { RecipeListEditButton } from './recipelist-edit-button.component';
import { Router } from '@angular/router';

@Component({
    selector: 'list-recipes',
    templateUrl: './list-recipes.component.html',
    styleUrls: ['./recipe.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ListRecipesComponent implements OnInit {
    columnDefs;
    rowData;
    context;
    gridOptions: GridOptions;
    frameworkComponents;

    constructor(private recipeService: RecipeService, private router: Router) {

        this.gridOptions = <GridOptions>{};

        this.columnDefs = [
            {
                headerName: "Recipe Name",
                field: "recipeName",
                width: 300
            },
            {
                headerName: "Edit",
                field: "value",
                cellRenderer: "childMessageRenderer",
                colId: "params",
                width: 180
            }
        ];
        this.context = { componentParent: this };
        this.frameworkComponents = {
            childMessageRenderer: RecipeListEditButton
        };
    }

    ngOnInit() {
        this.recipeService.getAllRecipes().subscribe(res => {
            this.rowData = res.entities;
        });
    }

    onGridReady(params) {
        this.gridOptions = params;
    }


    onFilterTextBoxChanged($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    }

    methodFromParent(data) {
        console.log(data);
        this.router.navigate(['/addNewRecipe'], { queryParams: {
            amountOfTimesMade: data.amountOfTimesMade,
            directions: data.directions
        }});
        //alert("Parent Component Method from " + cell + "!");
    }

}
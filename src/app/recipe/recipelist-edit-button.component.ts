import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { Router } from '@angular/router';

//services
import { DataService } from '../services/data-service';
import { Data } from "@angular/router/src/config";

@Component({
    selector: 'recipe-list-edit-button',
    template: `<span><button style="height: 20px" (click)="passToDataService()" class="btn btn-info">Invoke Parent</button></span>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class RecipeListEditButton implements ICellRendererAngularComp {
    public params: any;

    constructor (private dataService: DataService, private router: Router){}

    agInit(params: any): void {
        this.params = params;
    }

    public passToDataService() {
        this.dataService.updateRecipe(this.params.data); 
        this.router.navigate(['/addNewRecipe']);
    }

    refresh(): boolean {
        return false;
    }
}
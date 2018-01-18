//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from "ag-grid-angular";

//components 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeComponent } from './recipe/recipe.component';
import { AddNewRecipeComponent } from './recipe/add-new-recipe.component';
import { AddIngredientComponent } from './recipe/add-ingredient.component';
import { AddDirectionComponent } from './recipe/add-direction.component';
import { ListRecipesComponent } from './recipe/list-recipes.component';
import { RecipeListEditButton } from './recipe/recipelist-edit-button.component';

//services 
import { InventoryService } from './services/inventory-services';
import { RecipeService } from './services/recipe-service';
import { DataService } from './services/data-service';


@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    AddNewRecipeComponent,
    AddIngredientComponent,
    AddDirectionComponent,
    ListRecipesComponent,
    RecipeListEditButton
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    AgGridModule.withComponents([RecipeListEditButton]),
    NgbModule.forRoot()
  ],
  providers: [
    InventoryService,
    RecipeService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

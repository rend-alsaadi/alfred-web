import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import components
import { ListRecipesComponent } from './recipe/list-recipes.component';
import { AddNewRecipeComponent } from './recipe/add-new-recipe.component'

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: ListRecipesComponent },
  { path: 'addNewRecipe', component: AddNewRecipeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

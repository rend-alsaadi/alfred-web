import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import components
import { ListRecipesComponent } from './recipe/list-recipes.component';
import { RecipeFormComponent } from './recipe/recipe-form.component'

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: ListRecipesComponent },
  { path: 'addNewRecipe', component: RecipeFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

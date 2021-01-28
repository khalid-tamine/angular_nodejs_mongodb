import { FilmsComponent } from './films/films.component';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'home' , component:HomeComponent},
  {path:'movies', component:MoviesComponent},
  {path:'films', component:FilmsComponent},
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'**', redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

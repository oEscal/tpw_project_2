import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AddStadiumComponent} from './add-stadium/add-stadium.component';
import {StadiumComponent} from './stadium/stadium.component';
import {AddTeamComponent} from './add-team/add-team.component';


const routes: Routes = [
  {path: 'adicionar-estadio', component: AddStadiumComponent, data: {title: 'Adicionar estádio'}},
  {path: 'adicionar-equipa', component: AddTeamComponent, data: {title: 'Adicionar equipa'}},

  {path: 'estadio/:name', component: StadiumComponent, data: {title: 'Estádio'}}
];


@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

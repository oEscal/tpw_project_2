import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AddStadiumComponent} from './add-stadium/add-stadium.component';
import {StadiumComponent} from './stadium/stadium.component';
import {AddTeamComponent} from './add-team/add-team.component';
import {TeamsComponent} from './teams/teams.component';
import {TeamComponent} from './team/team.component';
import {AddPlayerComponent} from './add-player/add-player.component';


const routes: Routes = [
  {path: 'adicionar-estadio', component: AddStadiumComponent, data: {title: 'Adicionar estádio'}},
  {path: 'adicionar-equipa', component: AddTeamComponent, data: {title: 'Adicionar equipa'}},
  {path: 'adicionar-jogador', component: AddPlayerComponent, data: {title: 'Adicionar jogador'}},

  {path: 'estadio/:name', component: StadiumComponent, data: {title: 'Estádio'}},
  {path: 'equipas', component: TeamsComponent, data: {title: 'Equipas'}},
  {path: 'equipa/:name', component: TeamComponent, data: {title: 'Equipa'}}
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

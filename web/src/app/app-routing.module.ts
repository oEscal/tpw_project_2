import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AddStadiumComponent} from './add-stadium/add-stadium.component';
import {StadiumComponent} from './stadium/stadium.component';
import {AddTeamComponent} from './add-team/add-team.component';
import {TeamsComponent} from './teams/teams.component';
import {TeamComponent} from './team/team.component';
import {AddPlayerComponent} from './add-player/add-player.component';
import {PlayerComponent} from './player/player.component';
import {AddGameComponent} from './add-game/add-game.component';
import {GamesComponent} from './games/games.component';
import {AddPlayersGameComponent} from './add-players-game/add-players-game.component';
import {AddEventComponent} from './add-event/add-event.component';


const routes: Routes = [
  {path: 'adicionar-estadio', component: AddStadiumComponent, data: {title: 'Adicionar estádio', update: false}},
  {path: 'adicionar-equipa', component: AddTeamComponent, data: {title: 'Adicionar equipa', update: false}},
  {path: 'adicionar-jogador', component: AddPlayerComponent, data: {title: 'Adicionar jogador', update: false}},
  {path: 'adicionar-jogo', component: AddGameComponent, data: {title: 'Adicionar jogo', update: false}},
  {path: 'adicionar-jogadores-jogo/:id', component: AddPlayersGameComponent, data: {title: 'Adicionar jogadores a um jogo'}},
  {path: 'adicionar-evento/:id', component: AddEventComponent, data: {title: 'Adicionar evento'}},

  {path: 'estadio/:name', component: StadiumComponent, data: {title: 'Estádio'}},
  {path: 'equipas', component: TeamsComponent, data: {title: 'Equipas'}},
  {path: 'equipa/:name', component: TeamComponent, data: {title: 'Equipa'}},
  {path: 'jogador/:id', component: PlayerComponent, data: {title: 'Jogador'}},
  {path: 'jogos', component: GamesComponent, data: {title: 'Jogos'}},

  {path: 'editar-estadio/:name', component: AddStadiumComponent, data: {title: 'Editar estádio', update: true}},
  {path: 'editar-equipa/:name', component: AddTeamComponent, data: {title: 'Editar equipa', update: true}},
  {path: 'editar-jogador/:id', component: AddPlayerComponent, data: {title: 'Editar jogador', update: true}},
  {path: 'editar-jogo/:id', component: AddGameComponent, data: {title: 'Editar jogo', update: true}},
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

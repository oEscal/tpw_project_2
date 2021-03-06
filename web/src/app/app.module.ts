import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AddStadiumComponent } from './add-stadium/add-stadium.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StadiumComponent } from './stadium/stadium.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { PlayerComponent } from './player/player.component';
import { AddGameComponent } from './add-game/add-game.component';
import { GamesComponent } from './games/games.component';
import { AddPlayersGameComponent } from './add-players-game/add-players-game.component';
import { AddEventComponent } from './add-event/add-event.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStadiumComponent,
    StadiumComponent,
    AddTeamComponent,
    TeamsComponent,
    TeamComponent,
    AddPlayerComponent,
    PlayerComponent,
    AddGameComponent,
    GamesComponent,
    AddPlayersGameComponent,
    AddEventComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

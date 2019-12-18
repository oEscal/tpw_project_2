import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

import {ErrorHandlingService} from '../error-handling.service';

@Component({
  selector: 'app-add-players-game',
  templateUrl: './add-players-game.component.html',
  styleUrls: ['./add-players-game.component.css']
})
export class AddPlayersGameComponent implements OnInit {

  is_logged: boolean = false;

  // url params
  update = false;
  title = '';

  // for update
  players_game = [];

  // for remove
  REMOVE_MESSAGE =  ['Remover todos os jogadores inscritos num jogo implica',
                    ' - Remover todos os jogos nos quais eles participam'];

  players;
  game_id;

  teams = ['um', 'dois'];

  new_players;

  interval_of_players = [14, 18];
  array_loop = [];

  error_message: string;
  success_message: string;

  constructor(private formBuilder: FormBuilder,
              private rest_api_service: RestApiService,
              private route: ActivatedRoute,
              private error_service: ErrorHandlingService) {

    // it doesnt let me add this dynamically
    this.new_players = this.formBuilder.group({
      um: new FormArray([
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
      ]),
      dois: new FormArray([
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
        new FormControl(''),
      ])
    });
  }

  ngOnInit() {
    this.clear_messages();

    this.is_logged = this.rest_api_service.is_logged();
    if (!this.is_logged) {
      this.error_message = 'Não tem conta iniciada!';
    } else {
      this.route.data.subscribe(data => {this.title = data.title; });

      this.route.data.subscribe(data => {this.update = data.update; });
      if (this.update) {
        this.route.params.subscribe(param => {this.game_id = param.id; });
        this.rest_api_service.get_players_per_game_and_events(this.game_id).subscribe(
          result => {
            let team_id = 0;
            for (let team in result.data.teams) {
              this.players_game.push([]);
              for (let i = 0; i < result.data.teams[team].length; i++)
                this.players_game[team_id].push(result.data.teams[team][i].id);
              team_id++;
            }
          },
          error => {this.error_message = this.error_service.handle_error(error); });
      }

      for (let i = 0; i < this.interval_of_players[1]; i++)
        this.array_loop.push(i);

      this.route.params.subscribe(params => {
        this.game_id = params.id;
      });
      this.rest_api_service.get_game_team_players(this.game_id).subscribe(
        result => {
          this.players = result.data;
        },
        error => {this.error_message = this.error_service.handle_error(error); });
    }
  }

  add_players_game(new_players_game): void {
    this.clear_messages();

    const data = {};
    data[this.players.teams[0]] = new_players_game['um'];
    data[this.players.teams[1]] = new_players_game['dois'];

    this.rest_api_service.add_players_game(data, this.game_id).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error); });
  }

  update_players_game(new_players_game): void {
    this.clear_messages();

    const data = {};
    data[this.players.teams[0]] = new_players_game['um'];
    data[this.players.teams[1]] = new_players_game['dois'];

    this.rest_api_service.update_players_game(data, this.game_id).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error); });
  }

  remove_players_game(): void {
    this.clear_messages();

    this.rest_api_service.remove_players_game(this.game_id).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error); });
  }

  clear_messages() {
    this.error_message = null;
    this.success_message = null;
  }
}

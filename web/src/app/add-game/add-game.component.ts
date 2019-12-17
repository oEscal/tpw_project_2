import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';

import {ErrorHandlingService} from '../error-handling.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  is_logged: boolean = false;

  // url params
  update = false;
  title = '';

  // for update
  game_id;
  game;

  // for remove
  REMOVE_MESSAGE = [
    'Remover o jogo implica:',
    ' - Remover as estatisticas do jogo',
    '- Remover os jogadores inscritos no jogo'
  ];

  stadiums;
  teams_props;
  new_game;

  error_message: string;
  success_message: string;

  constructor(private formBuilder: FormBuilder,
              private rest_api_service: RestApiService,
              private route: ActivatedRoute,
              private router: Router,
              private error_service: ErrorHandlingService) {
    this.new_game = this.formBuilder.group({
      date: '',
      journey: '',
      stadium: '',
      home_team: '',
      away_team: '',
      home_shots: '',
      away_shots: '',
      home_ball_pos: '',
      away_ball_pos: '',
      home_corners: '',
      away_corners: '',
      home_goals: '',
      away_goals: '',
    });
  }

  ngOnInit() {

    this.is_logged = this.rest_api_service.is_logged();
    if (!this.is_logged) {
      this.error_message = 'Não tem conta iniciada!';
    } else {
    this.route.data.subscribe(data => {this.title = data.title; });

    this.route.data.subscribe(data => {this.update = data.update; });
    if (this.update) {
      this.route.params.subscribe(param => {this.game_id = param.id; });
      this.rest_api_service.get_game(this.game_id).subscribe(
        result => {this.game = result.data; },
        error => {this.error_message = this.error_service.handle_error(error)});
    }

    this.rest_api_service.get_stadiums().subscribe(
      result => this.stadiums = result.data,
      error => {this.error_message = this.error_service.handle_error(error)});

    // TODO -> posteriormente, poderá adicionar-se um método à rest api só para retornar os nomes das equipas, para não tornar esta chamada tão pesada
    this.rest_api_service.get_teams().subscribe(
      result => this.teams_props = result.data,
      error => {this.error_message = this.error_service.handle_error(error)});
    }
  }

  normalize_data(data): object {

    return {
      date: data.date,
      journey: data.journey,
      stadium: data.stadium,
      teams: [data.home_team, data.away_team],
      shots: [data.home_shots, data.away_shots],
      ball_possessions: [data.home_ball_pos, data.away_ball_pos],
      corners: [data.home_corners, data.away_corners],
      goals: [data.home_goals, data.away_goals],
    };
  }

  add_game(new_game): void {
    this.rest_api_service.add_game(this.normalize_data(new_game)).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error)});
  }

  update_game(new_game): void {
    this.rest_api_service.update_game(new_game, this.game_id).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error)});
  }

  remove_game(): void {
    this.rest_api_service.remove_game(this.game_id).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error)});
  }
}

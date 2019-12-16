import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  stadiums;
  teams_props;
  new_game;

  error_message: string;
  error_data: [];
  success_message: string;

  constructor(private formBuilder: FormBuilder, private rest_api_service: RestApiService) {
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
    this.rest_api_service.get_stadiums().subscribe(
      result => this.stadiums = result.data,
      error => this.handle_error(error));

    // TODO -> posteriormente, poderá adicionar-se um método à rest api só para retornar os nomes das equipas, para não tornar esta chamada tão pesada
    this.rest_api_service.get_teams().subscribe(
      result => this.teams_props = result.data,
      error => this.handle_error(error));
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
    console.log(this.normalize_data(new_game));
    this.rest_api_service.add_game(this.normalize_data(new_game)).subscribe(
      result => this.success_message = result.message,
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_data = error.error.data;
    this.error_message = error.error.message;
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  stadiums;
  teams;
  new_player;

  error_message: string;
  success_message: string;

  constructor(private formBuilder: FormBuilder, private rest_api_service: RestApiService) {
    this.new_player = this.formBuilder.group({
      date: '',
      journey: '',
      stadium: '',
      teams: [],
      shots: [],
      ball_possession: [],
      corners: [],
      goals: [],
    });
  }

  ngOnInit() {
    this.rest_api_service.get_stadiums().subscribe(
      result => this.stadiums = result.data,
      error => this.handle_error(error));

    // TODO -> posteriormente, poderá adicionar-se um método à rest api só para retornar os nomes das equipas, para não tornar esta chamada tão pesada
    this.rest_api_service.get_teams().subscribe(
      result => this.teams = result.data,
      error => this.handle_error(error));
  }

  add_player(new_player): void {
    this.rest_api_service.add_player(new_player).subscribe(
      result => this.success_message = result.message,
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }
}

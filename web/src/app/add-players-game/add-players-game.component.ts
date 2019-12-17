import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-players-game',
  templateUrl: './add-players-game.component.html',
  styleUrls: ['./add-players-game.component.css']
})
export class AddPlayersGameComponent implements OnInit {

  is_logged = false;

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
              private route: ActivatedRoute) {
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
    this.is_logged = this.rest_api_service.is_logged();
    if (!this.is_logged) {
      this.error_message = "Não tem conta iniciada!";
    } else {
      for (let i = 0; i < this.interval_of_players[1]; i++)
        this.array_loop.push(i);

      this.route.params.subscribe(params => {
        this.game_id = params.id;
      });
      this.rest_api_service.get_game_team_players(this.game_id).subscribe(
        result => {
          this.players = result.data;
        },
        error => this.handle_error(error));
    }
  }

  add_players_game(new_players_game): void {
    console.log(new_players_game);
    const data = {};
    data[this.players.teams[0]] = new_players_game['um'];
    data[this.players.teams[1]] = new_players_game['dois'];

    this.rest_api_service.add_players_game(data, this.game_id).subscribe(
      result => this.success_message = result.message,
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }
}

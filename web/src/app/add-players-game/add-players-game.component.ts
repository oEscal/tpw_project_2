import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-players-game',
  templateUrl: './add-players-game.component.html',
  styleUrls: ['./add-players-game.component.css']
})
export class AddPlayersGameComponent implements OnInit {

  players;
  game_id;

  error_message: string;
  success_message: string;

  constructor(private formBuilder: FormBuilder,
              private rest_api_service: RestApiService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {this.game_id = params.id; });
    this.rest_api_service.get_game_team_players(this.game_id).subscribe(
      result => this.players = result.data,
      error => this.handle_error(error));
  }

  add_players_game(new_players_game): void {
    this.rest_api_service.add_players_game(new_players_game, this.game_id).subscribe(
      result => this.success_message = result.message,
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }
}

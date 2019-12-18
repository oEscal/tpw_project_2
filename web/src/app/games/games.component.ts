import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Game, Player} from '../entities';
import {RestApiService} from '../rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import $ from 'jquery';
import {ErrorHandlingService} from '../error-handling.service';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit{

  is_logged: boolean = false;

  games: Game[];
  show_game_info: boolean[] = [];
  show_events: boolean = false;

  error_message: string = '';

  constructor(private rest_api_service: RestApiService,
              private route: ActivatedRoute,
              private error_service: ErrorHandlingService) { }

  ngOnInit() {
    this.is_logged = this.rest_api_service.is_logged();
    this.get_games();
  }

  get_games(): void {
    this.rest_api_service.get_games().subscribe(
      result => {
        this.games = result.data as Game[];
        for (let i = 0; i < this.games.length; i++)
          this.show_game_info.push(false);
        },
      error => {this.error_message = this.error_service.handle_error(error); });
  }

  show_game(id) {
    this.hidden_all_games()
    this.show_game_info[id] = true;
  }

  hidden_all_games() {
    for (let i = 0; i < this.show_game_info.length; i++)
      this.show_game_info[i] = false;
  }
}

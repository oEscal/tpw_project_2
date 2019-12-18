import { Component, OnInit } from '@angular/core';
import {Player} from '../entities';
import {RestApiService} from '../rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandlingService} from '../error-handling.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  is_logged: boolean = false;

  player: Player;
  player_id: number;

  error_message: string = '';

  constructor(private rest_api_service: RestApiService,
              private route: ActivatedRoute,
              private error_service: ErrorHandlingService) { }

  ngOnInit() {
    this.clear_messages();

    this.is_logged = this.rest_api_service.is_logged();

    this.route.params.subscribe(params => {this.player_id = params.id; });
    this.get_team();
  }

  get_team(): void {
    this.clear_messages();

    this.rest_api_service.get_player(this.player_id).subscribe(
      result => this.player = result.data as Player,
      error => {this.error_message = this.error_service.handle_error(error); });
  }

  clear_messages() {
    this.error_message = null;
  }
}

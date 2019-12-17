import { Component, OnInit } from '@angular/core';
import {Player, Team} from '../entities';
import {RestApiService} from '../rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player: Player;
  player_id: number;

  error_message: string = '';

  constructor(private rest_api_service: RestApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {this.player_id = params.id;});
    this.get_team();
  }

  get_team(): void {
    this.rest_api_service.get_player(this.player_id).subscribe(
      result => this.player = result.data as Player,
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }
}

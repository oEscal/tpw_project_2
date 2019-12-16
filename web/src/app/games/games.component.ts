import { Component, OnInit } from '@angular/core';
import {Game, Player} from '../entities';
import {RestApiService} from '../rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import $ from 'jquery';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[];

  error_message: string = '';

  constructor(private rest_api_service: RestApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.get_games();

    // jquery code
    $(document).ready(function () {
      $(".more_info_btn").click(function () {
        $(".more_info").hide(1000);
        $("#more_info_" + this.id).show(1000);
      });

      $(".less_info_btn").click(function () {
        $("#more_info_" + this.id).hide(1000);
      });
    });
  }

  get_games(): void {
    this.rest_api_service.get_games().subscribe(
      result => this.games = result.data as Game[],
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }
}

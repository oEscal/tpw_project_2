import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  update = false;

  // for update
  player_id;
  player;

  player_positions;
  teams;
  new_player;

  error_message: string;
  success_message: string;

  constructor(private formBuilder: FormBuilder,
              private rest_api_service: RestApiService,
              private route: ActivatedRoute) {
    this.new_player = this.formBuilder.group({
      name: '',
      birth_date: '',
      nick: '',
      position: '',
      team: ''
      // photo: File,
    });
  }

  ngOnInit() {
    this.route.data.subscribe(data => {this.update = data.update; });
    if (this.update) {
      this.route.params.subscribe(param => {this.player_id = param.id; });
      this.rest_api_service.get_player(this.player_id).subscribe(
        result => this.player = result.data,
        error => this.handle_error(error));
    }

    this.rest_api_service.get_positions().subscribe(
      result => this.player_positions = result.data,
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

  update_player(new_player): void {
    this.rest_api_service.update_player(new_player, this.player_id).subscribe(
      result => this.success_message = result.message,
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }
}

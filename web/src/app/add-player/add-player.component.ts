import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

import {ErrorHandlingService} from '../error-handling.service';
import {FilesService} from '../files.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  is_logged = false;

  // url params
  update = false;
  title = '';

  // for update
  player_id;
  player;

  // for remove
  REMOVE_MESSAGE = ['Remover o jogador implica remover:', ' - Todos os eventos que o jogador fez durante os jogos'];

  image;

  player_positions;
  teams;
  new_player;

  error_message: string;
  success_message: string;

  constructor(private formBuilder: FormBuilder,
              private rest_api_service: RestApiService,
              private route: ActivatedRoute,
              private error_service: ErrorHandlingService,
              private files_service: FilesService) {
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
    this.is_logged = this.rest_api_service.is_logged();
    if (!this.is_logged) {
      this.error_message = 'Não tem conta iniciada!';
    } else {
      this.route.data.subscribe(data => {
        this.title = data.title;
      });

      this.route.data.subscribe(data => {
        this.update = data.update;
      });
      if (this.update) {
        this.route.params.subscribe(param => {
          this.player_id = param.id;
        });
        this.rest_api_service.get_player(this.player_id).subscribe(
          result => this.player = result.data,
          error => {this.error_message = this.error_service.handle_error(error); });
      }

      this.rest_api_service.get_positions().subscribe(
        result => this.player_positions = result.data,
        error => {this.error_message = this.error_service.handle_error(error); });

      this.rest_api_service.get_teams().subscribe(
        result => this.teams = result.data,
        error => {this.error_message = this.error_service.handle_error(error); });
    }
  }

  read_file($event) {
    this.image = this.files_service.read_file($event);
    console.log(this.image);
  }

  add_player(new_player): void {
    if (this.image)
      new_player.photo = this.image;
    this.rest_api_service.add_player(new_player).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error); });
  }

  update_player(new_player): void {
    this.rest_api_service.update_player(new_player, this.player_id).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error); });
  }

  remove_player(): void {
    this.rest_api_service.remove_player(this.player_id).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error); });
  }
}

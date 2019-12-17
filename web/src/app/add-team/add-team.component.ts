import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

import {ErrorHandlingService} from '../error-handling.service';


@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  is_logged: boolean = false;

  // url params
  update = false;
  title = '';

  // for update
  team_name;
  team;

  // for remove
  REMOVE_MESSAGE = [
    'Remover a equipa implica remover:',
    ' - Todos os jogos em que a equipa participa\n',
    '- Todos os jogadores inscritos na equipa'
  ];

  stadiums;
  new_team;

  error_message: string = null;
  success_message: string = null;

  constructor(private formBuilder: FormBuilder,
              private rest_api_service: RestApiService,
              private route: ActivatedRoute,
              private error_service: ErrorHandlingService) {
    this.new_team = this.formBuilder.group({
      name: '',
      foundation_date: '',
      stadium: 'string',
      // logo: File,
  });
  }

  ngOnInit() {
    this.is_logged = this.rest_api_service.is_logged();
    if (!this.is_logged) {
      this.error_message = 'Não tem conta iniciada!';
      return;
    } else {
      this.route.data.subscribe(data => {this.title = data.title; });

      this.route.data.subscribe(data => {this.update = data.update; });
      if (this.update) {
        this.route.params.subscribe(param => {this.team_name = param.name; });
        this.rest_api_service.get_team(this.team_name).subscribe(
          result => this.team = result.data,
          error => {this.error_message = this.error_service.handle_error(error); });
      }

      this.rest_api_service.get_all_unused_stadiums().subscribe(
        result => this.stadiums = result.data,
        error => {this.error_message = this.error_service.handle_error(error); });
    }
  }

  add_team(new_team): void {
    this.rest_api_service.add_team(new_team).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error); });
  }

  update_team(new_team): void {
    this.rest_api_service.update_team(new_team, this.team_name).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error); });
  }

  remove_team(): void {
    this.rest_api_service.remove_team(this.team_name).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error); });
  }
}

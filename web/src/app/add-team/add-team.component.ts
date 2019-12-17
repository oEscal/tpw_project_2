import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  is_logged = false;

  // url params
  update = false;
  title = '';

  // for update
  team_name;
  team;

  stadiums;
  new_team;

  error_message:string = null;
  success_message:string = null;

  constructor(private formBuilder: FormBuilder,
              private rest_api_service: RestApiService,
              private route: ActivatedRoute) {
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
      this.error_message = "Não tem conta iniciada!";
      return;
    }
    else {
      this.route.data.subscribe(data => {this.title = data.title; });

      this.route.data.subscribe(data => {this.update = data.update; });
      if (this.update) {
        this.route.params.subscribe(param => {this.team_name = param.name; });
        this.rest_api_service.get_team(this.team_name).subscribe(
          result => this.team = result.data,
          error => this.handle_error(error));
      }

      this.rest_api_service.get_all_unused_stadiums().subscribe(
        result => this.stadiums = result.data,
        error => this.handle_error(error));
    }
  }

  add_team(new_team): void {
    this.rest_api_service.add_team(new_team).subscribe(
      result => this.success_message = result.message,
      error => this.handle_error(error));
  }

  update_team(new_team): void {
    this.rest_api_service.update_team(new_team, this.team_name).subscribe(
      result => this.success_message = result.message,
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    if (error.error.message)
      this.error_message = error.error.message;
    else
      this.error_message = "Houve um erro a contactar a REST API!";
  }
}

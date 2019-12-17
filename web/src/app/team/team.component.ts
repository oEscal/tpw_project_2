import { Component, OnInit } from '@angular/core';
import {Team} from '../entities';
import {RestApiService} from '../rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

import {ErrorHandlingService} from '../error-handling.service';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  is_logged: boolean = false;

  team: Team;

  team_name: string;
  error_message: string = '';

  constructor(
    private rest_api_service: RestApiService,
    private route: ActivatedRoute,
    private error_service: ErrorHandlingService) {
  }

  ngOnInit() {
    this.is_logged = this.rest_api_service.is_logged();

    this.route.params.subscribe(params => {this.team_name = params.name; });
    this.get_team();
  }

  get_team(): void {
    this.rest_api_service.get_team(this.team_name).subscribe(
      result => this.team = result.data as Team,
      error => {this.error_message = this.error_service.handle_error(error); });
  }
}

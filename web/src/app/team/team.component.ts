import { Component, OnInit } from '@angular/core';
import {Team, TeamMinimal} from '../entities';
import {RestApiService} from '../rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: TeamMinimal;

  team_name: string;
  error_message: string = '';

  constructor(private rest_api_service: RestApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {this.team_name = params.name;});
    this.get_team();
  }

  get_team(): void {
    this.rest_api_service.get_team(this.team_name).subscribe(
      result => this.team = result.data as Team,
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }
}

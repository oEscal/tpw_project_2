import { Component, OnInit } from '@angular/core';
import {Stadium, TeamMinimal} from '../entities';
import {RestApiService} from '../rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: TeamMinimal[];

  error_message: string = '';

  constructor(private rest_api_service: RestApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.get_teams();
  }

  get_teams(): void {
    this.rest_api_service.get_teams().subscribe(
      result => this.teams = result.data as TeamMinimal[],
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  stadiums;
  new_team;

  error_message:string = null;
  success_message:string = null;

  constructor(private formBuilder: FormBuilder, private rest_api_service: RestApiService) {
    this.new_team = this.formBuilder.group({
      name: '',
      foundation_date: '',
      stadium: 'string',
      // logo: File,
  });
  }

  ngOnInit() {
    this.rest_api_service.get_all_unused_stadiums().subscribe(
      result => this.stadiums = result.data,
      error => this.handle_error(error));
  }

  add_team(new_team): void {
    this.rest_api_service.add_team(new_team).subscribe(
      result => this.success_message = result.message,
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }

}

import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {RestApiService} from '../rest-api.service';
import {FormBuilder} from '@angular/forms';
import {Stadium} from '../entities';


@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit {

  stadium: Stadium = null;

  error_message: string = '';

  constructor(private rest_api_service: RestApiService) {
  }

  ngOnInit() {
    this.get_stadium('ola');
  }

  get_stadium(stadium_name): void {
    this.rest_api_service.get_stadium(stadium_name).subscribe(
      result => this.stadium = result.data as Stadium,
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }

}

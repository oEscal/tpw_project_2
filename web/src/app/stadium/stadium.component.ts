import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {RestApiService} from '../rest-api.service';
import {FormBuilder} from '@angular/forms';
import {Stadium} from '../entities';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit {

  stadium: Stadium = null;

  error_message: string = '';
  stadium_name;

  constructor(private rest_api_service: RestApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {this.stadium_name = params.name})
    this.get_stadium(this.stadium_name);
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

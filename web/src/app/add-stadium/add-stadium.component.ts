import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrls: ['./add-stadium.component.css']
})
export class AddStadiumComponent implements OnInit {

  // url params
  update = false;
  title = '';

  // for update
  stadium_name;
  stadium;

  new_stadium;

  error_message:string = null;
  success_message:string = null;

  constructor(private formBuilder: FormBuilder,
              private rest_api_service: RestApiService,
              private route: ActivatedRoute) {
    this.new_stadium = this.formBuilder.group({
      name: '',
      address: '',
      number_seats: 1,
      // picture: 1
    });
  }

  ngOnInit() {
    this.route.data.subscribe(data => {this.title = data.title; });

    this.route.data.subscribe(data => {this.update = data.update; });
    if (this.update) {
      this.route.params.subscribe(param => {this.stadium_name = param.name; });
      this.rest_api_service.get_stadium(this.stadium_name).subscribe(
        result => this.stadium = result.data,
        error => this.handle_error(error));
    }
  }

  add(new_stadium): void {
    this.rest_api_service.add_stadium(new_stadium).subscribe(
      result => this.success_message = result.message,
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }

}

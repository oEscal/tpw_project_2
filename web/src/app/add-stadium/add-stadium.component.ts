import { Component, OnInit } from '@angular/core';
import {Stadium} from '../entities';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {error} from 'util';

@Component({
  selector: 'app-add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrls: ['./add-stadium.component.css']
})
export class AddStadiumComponent implements OnInit {

  title = `Adicionar estádio`;

  new_stadium;

  error_message:string = null;
  success_message:string = null;

  constructor(private formBuilder: FormBuilder, private rest_api_service: RestApiService) {
    this.new_stadium = this.formBuilder.group({
      name: '',
      address: '',
      number_seats: 1,
      // picture: 1
    });
  }

  ngOnInit() {
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

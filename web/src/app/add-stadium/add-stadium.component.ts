import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {ActivatedRoute} from '@angular/router';

import {ErrorHandlingService} from '../error-handling.service';
import {FilesService} from '../files.service';


@Component({
  selector: 'app-add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrls: ['./add-stadium.component.css']
})
export class AddStadiumComponent implements OnInit {

  is_logged = false;

  // url params
  update = false;
  title = '';

  // for update
  stadium_name;
  stadium;

  // for remove
  REMOVE_MESSAGE = [
    'Remover estadio implica remover:',
    ' - Remover a equipa associada ao estadio',
    ' - Remover todos os jogos da equipa',
    ' - Remover todos os jogadores da equipa'
  ];

  // for image
  image;

  new_stadium;

  error_message: string = null;
  success_message: string = null;

  constructor(private formBuilder: FormBuilder,
              private rest_api_service: RestApiService,
              private route: ActivatedRoute,
              private error_service: ErrorHandlingService,
              private files_service: FilesService) {
    this.new_stadium = this.formBuilder.group({
      name: '',
      address: '',
      number_seats: '',
    });
  }

  ngOnInit() {
    this.is_logged = this.rest_api_service.is_logged();
    if (!this.is_logged) {
      this.error_message = 'Não tem conta iniciada!';
    } else {
      this.route.data.subscribe(data => {
        this.title = data.title;
      });

      this.route.data.subscribe(data => {
        this.update = data.update;
      });
      if (this.update) {
        this.route.params.subscribe(param => {
          this.stadium_name = param.name;
        });
        this.rest_api_service.get_stadium(this.stadium_name).subscribe(
          result => this.stadium = result.data,
          error => {this.error_message = this.error_service.handle_error(error); });
      }
    }
  }

  read_file($event) {
    this.image = this.files_service.read_file($event);
  }

  add(new_stadium): void {
    if (this.image)
      new_stadium.picture = this.image;
    console.log(this.image);
    this.rest_api_service.add_stadium(new_stadium).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error); });
  }

  update_stadium(new_stadium): void {
    this.rest_api_service.update_stadium(new_stadium, this.stadium_name).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error); });
  }

  remove_stadium(): void {
    this.rest_api_service.remove_stadium(this.stadium_name).subscribe(
      result => this.success_message = result.message,
      error => {this.error_message = this.error_service.handle_error(error); });
  }
}

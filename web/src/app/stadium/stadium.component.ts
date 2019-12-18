import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../rest-api.service';
import {Stadium} from '../entities';
import {ActivatedRoute} from '@angular/router';

import {ErrorHandlingService} from '../error-handling.service';


@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit {

  is_logged: boolean = false;

  stadium: Stadium = null;

  error_message: string = '';
  stadium_name: string;

  constructor(private rest_api_service: RestApiService,
              private route: ActivatedRoute,
              private error_service: ErrorHandlingService) {
  }

  ngOnInit() {
    this.clear_messages();

    this.is_logged = this.rest_api_service.is_logged();

    this.route.params.subscribe(params => {this.stadium_name = params.name;});
    this.get_stadium();
  }

  get_stadium(): void {
    this.clear_messages();

    this.rest_api_service.get_stadium(this.stadium_name).subscribe(
      result => this.stadium = result.data as Stadium,
      error => {this.error_message = this.error_service.handle_error(error); });
  }

  clear_messages() {
    this.error_message = null;
  }
}

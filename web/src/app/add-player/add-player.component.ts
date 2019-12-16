import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  player_positions;
  teams;
  new_player;

  error_message: string;
  success_message: string;

  constructor(private formBuilder: FormBuilder, private rest_api_service: RestApiService) {
    this.new_player = this.formBuilder.group({
      name: '',
      birth_date: '',
      nick: '',
      position: '',
      team: ''
      // photo: File,
    });
  }

  ngOnInit() {
    // this.rest_api_service.get_all_unused_stadiums().subscribe(
    //   result => this.stadiums = result.data,
    //   error => this.handle_error(error));
  }

  add_player(new_player): void {
    this.rest_api_service.add_player(new_player).subscribe(
      result => this.success_message = result.message,
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }
}
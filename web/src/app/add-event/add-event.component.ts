import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import $ from 'jquery';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  new_event;

  form_data;
  game_id;
  teams;

  error_message: string;
  success_message: string;

  constructor(private formBuilder: FormBuilder,
              private rest_api_service: RestApiService,
              private route: ActivatedRoute) {
    this.new_event = this.formBuilder.group({
      team: '',
      player: '',
      kind_event: '',
      minute: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {this.game_id = params.id; });
    this.rest_api_service.get_players_per_game_and_events(this.game_id).subscribe(
      result => {
        this.form_data = result.data;
        this.teams = Object.keys(this.form_data.teams);
      },
      error => this.handle_error(error));

    // jquery
    $(document).ready(function () {
      $("." + $("#id_team option:selected").text().replace(" ", "_")).show(1000);

      $("#id_team").change(function () {
        console.log("ola")
        $("#id_team option").each(function () {
          $("." + $(this).text().replace(" ", "_")).hide(1000);
        });

        $("." + $("#id_team option:selected").text().replace(" ", "_")).show(1000);
      });
    });
  }

  add_event(new_event): void {
    this.rest_api_service.add_event(new_event, this.game_id).subscribe(
      result => this.success_message = result.message,
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }
}

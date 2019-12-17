import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../rest-api.service';

@Component({
  selector: 'app-remove-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.css']
})
export class RemoveModalComponent implements OnInit {

  remove_info;

  constructor(private rest_api_service: RestApiService) { }

  ngOnInit() {
  }

  // remove(): void {
  //   this.rest_api_service.remove_game(1).subscribe(
  //     result => this.success_message = result.message,
  //     error => this.handle_error(error));
  // }
}

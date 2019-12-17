import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestApiService} from './rest-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  is_logged = false;

  constructor(private route: ActivatedRoute, private rest_api_service: RestApiService) { }

  ngOnInit(): void {
    this.is_logged = this.rest_api_service.is_logged();
  }
}

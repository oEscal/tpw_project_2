import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private rest_api_service: RestApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.rest_api_service.logout();
    window.location.href = '/';
  }

}

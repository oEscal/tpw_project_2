import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  new_login;

  error_message: string;
  success_message: string;

  constructor(private formBuilder: FormBuilder,
              private rest_api_service: RestApiService,
              private route: ActivatedRoute,
              private router: Router) {
    this.new_login = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit() { }

  login(new_login): void {
    this.error_message = null;
    this.success_message = null;

    this.rest_api_service.login(new_login).subscribe(
      result => {
        this.success_message = result.message;
        window.location.href = '/';
      },
      error => this.handle_error(error));
  }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    this.error_message = error.error.message;
  }
}

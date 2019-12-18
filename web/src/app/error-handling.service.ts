import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  handle_error(error: HttpErrorResponse) {
    console.log(error);
    let error_message = '';

    if (error.statusText == 'Unauthorized')
      window.location.href = '/logout';

    if (error.error.message)
      error_message = error.error.message;
    else
      error_message = 'Houve um erro a contactar a REST API!';
    return error_message;
  }
}

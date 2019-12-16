import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stadium} from './entities';


const http_options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 14660b0bdf7cfd2fa5cc8448fe2ae7b94a4cd104',
  })
};

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  add_stadium(new_stadium): Observable<any> {
    const url: string = `${API_URL}/add_stadium`;
    return this.http.post(url, new_stadium, http_options);
  }

  get_stadium(name): Observable<any> {
    const url: string = `${API_URL}/stadium/${name}/`;
    return this.http.get(url, http_options);
  }
}

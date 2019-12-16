import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stadium} from './entities';


const http_options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 2a03d163dee0ad4ca5c77290a957e7bcbc5ac424',
  })
};

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  /************************************** Add **************************************/

  add_stadium(new_stadium): Observable<any> {
    const url: string = `${API_URL}/add_stadium`;
    return this.http.post(url, new_stadium, http_options);
  }

  add_team(new_team): Observable<any> {
    const url: string = `${API_URL}/add_team`;
    return this.http.post(url, new_team, http_options);
  }

  add_player(add_player): Observable<any> {
    const url: string = `${API_URL}/add_player/`;
    return this.http.post(url, add_player, http_options);
  }


  /************************************** Get **************************************/

  get_stadium(name): Observable<any> {
    const url: string = `${API_URL}/stadium/${name}/`;
    return this.http.get(url, http_options);
  }

  get_all_unused_stadiums(): Observable<any> {
    const url: string = `${API_URL}/get_all_unused_stadiums/`;
    return this.http.get(url, http_options);
  }

  get_teams(): Observable<any> {
    const url: string = `${API_URL}/teams/`;
    return this.http.get(url, http_options);
  }

  get_team(name): Observable<any> {
    const url: string = `${API_URL}/team/${name}`;
    return this.http.get(url, http_options);
  }

  get_positions(): Observable<any> {
    const url: string = `${API_URL}/positions/`;
    return this.http.get(url, http_options);
  }
}

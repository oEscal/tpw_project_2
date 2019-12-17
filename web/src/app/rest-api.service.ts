import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';



const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private setSession(authResult) {
    const token = authResult.token;
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('is_logged', 'true');
  }

  private get_token(): string {
    return localStorage.getItem('token');
  }

  private http_options() {
    if (this.is_logged())
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Token ' + this.get_token()
        })
      };
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  is_logged(): boolean {
    return localStorage.getItem('is_logged') == 'true';
  }


  constructor(private http: HttpClient) { }

  login(new_login): Observable<any> {
    const url: string = `${API_URL}/login/`;
    return this.http.post(url, new_login, this.http_options()).pipe(
      tap(result => this.setSession(result))
    );
  }

  logout() {
    localStorage.removeItem('is_logged');
    localStorage.removeItem('token');
  }


  /************************************** Add **************************************/

  add_stadium(new_stadium): Observable<any> {
    const url: string = `${API_URL}/add_stadium`;
    return this.http.post(url, new_stadium, this.http_options());
  }

  add_team(new_team): Observable<any> {
    const url: string = `${API_URL}/add_team`;
    return this.http.post(url, new_team, this.http_options());
  }

  add_player(new_player): Observable<any> {
    const url: string = `${API_URL}/add_player/`;
    return this.http.post(url, new_player, this.http_options());
  }

  add_game(new_game): Observable<any> {
    const url: string = `${API_URL}/add_game/`;
    return this.http.post(url, new_game, this.http_options());
  }

  add_players_game(new_players_game, id): Observable<any> {
    const url: string = `${API_URL}/add_players_game/${id}/`;
    return this.http.post(url, new_players_game, this.http_options());
  }

  add_event(new_event, id): Observable<any> {
    const url: string = `${API_URL}/add_event/${id}/`;
    return this.http.post(url, new_event, this.http_options());
  }


  /************************************** Get **************************************/

  get_stadium(name): Observable<any> {
    const url: string = `${API_URL}/stadium/${name}/`;
    return this.http.get(url, this.http_options());
  }

  get_all_unused_stadiums(): Observable<any> {
    const url: string = `${API_URL}/get_all_unused_stadiums/`;
    return this.http.get(url, this.http_options());
  }

  get_teams(): Observable<any> {
    const url: string = `${API_URL}/teams/`;
    return this.http.get(url, this.http_options());
  }

  get_team(name): Observable<any> {
    const url: string = `${API_URL}/team/${name}`;
    return this.http.get(url, this.http_options());
  }

  get_positions(): Observable<any> {
    const url: string = `${API_URL}/positions/`;
    return this.http.get(url, this.http_options());
  }

  get_player(id): Observable<any> {
    const url: string = `${API_URL}/player/${id}/`;
    return this.http.get(url, this.http_options());
  }

  get_stadiums(): Observable<any> {
    const url: string = `${API_URL}/stadiums/`;
    return this.http.get(url, this.http_options());
  }

  get_games(): Observable<any> {
    const url: string = `${API_URL}/games/`;
    return this.http.get(url, this.http_options());
  }

  get_game_team_players(id): Observable<any> {
    const url: string = `${API_URL}/get_game_team_players/${id}/`;
    return this.http.get(url, this.http_options());
  }

  get_players_per_game_and_events(id): Observable<any> {
    const url: string = `${API_URL}/get_players_per_game_and_events/${id}/`;
    return this.http.get(url, this.http_options());
  }

  get_game(id): Observable<any> {
    const url: string = `${API_URL}/game/${id}/`;
    return this.http.get(url, this.http_options());
  }

  get_event(id): Observable<any> {
    const url: string = `${API_URL}/event/${id}/`;
    return this.http.get(url, this.http_options());
  }


  /************************************** Update **************************************/
  update_player(new_data, id): Observable<any> {
    const url: string = `${API_URL}/update_player/${id}/`;
    return this.http.put(url, new_data, this.http_options());
  }

  update_stadium(new_data, name): Observable<any> {
    const url: string = `${API_URL}/update_stadium/${name}/`;
    return this.http.put(url, new_data, this.http_options());
  }

  update_team(new_data, name): Observable<any> {
    const url: string = `${API_URL}/update_team/${name}/`;
    return this.http.put(url, new_data, this.http_options());
  }

  update_game(new_data, id): Observable<any> {
    const url: string = `${API_URL}/update_game/${id}/`;
    return this.http.put(url, new_data, this.http_options());
  }

  update_event(new_data, id): Observable<any> {
    const url: string = `${API_URL}/update_event/${id}/`;
    return this.http.put(url, new_data, this.http_options());
  }


  /************************************** Remove **************************************/

  remove_game(id): Observable<any> {
    const url: string = `${API_URL}/remove_game/${id}/`;
    return this.http.delete(url, this.http_options());
  }
}

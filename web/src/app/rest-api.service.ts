import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private set_session(auth) {
    const token = auth.token;
    localStorage.setItem('token', auth.token);
    localStorage.setItem('is_logged', 'true');
  }

  private update_token(auth) {
    const token = auth.token;
    localStorage.setItem('token', auth.token);
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
    return localStorage.getItem('is_logged') == 'true' && localStorage.getItem('token').length > 0;
  }


  constructor(private http: HttpClient) { }

  login(new_login): Observable<any> {
    const url: string = `${API_URL}/login/`;
    return this.http.post(url, new_login, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  logout() {
    localStorage.removeItem('is_logged');
    localStorage.removeItem('token');
  }


  /************************************** Add **************************************/

  add_stadium(new_stadium): Observable<any> {
    const url: string = `${API_URL}/add_stadium`;
    return this.http.post(url, new_stadium, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  add_team(new_team): Observable<any> {
    const url: string = `${API_URL}/add_team`;
    return this.http.post(url, new_team, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  add_player(new_player): Observable<any> {
    const url: string = `${API_URL}/add_player/`;
    return this.http.post(url, new_player, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  add_game(new_game): Observable<any> {
    const url: string = `${API_URL}/add_game/`;
    return this.http.post(url, new_game, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  add_players_game(new_players_game, id): Observable<any> {
    const url: string = `${API_URL}/add_players_game/${id}/`;
    return this.http.post(url, new_players_game, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  add_event(new_event, id): Observable<any> {
    const url: string = `${API_URL}/add_event/${id}/`;
    return this.http.post(url, new_event, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }


  /************************************** Get **************************************/

  get_stadium(name): Observable<any> {
    const url: string = `${API_URL}/stadium/${name}/`;
    return this.http.get(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  get_all_unused_stadiums(): Observable<any> {
    const url: string = `${API_URL}/get_all_unused_stadiums/`;
    return this.http.get(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  get_teams(): Observable<any> {
    const url: string = `${API_URL}/teams/`;
    return this.http.get(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  get_team(name): Observable<any> {
    const url: string = `${API_URL}/team/${name}`;
    return this.http.get(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  get_positions(): Observable<any> {
    const url: string = `${API_URL}/positions/`;
    return this.http.get(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  get_player(id): Observable<any> {
    const url: string = `${API_URL}/player/${id}/`;
    return this.http.get(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  get_stadiums(): Observable<any> {
    const url: string = `${API_URL}/stadiums/`;
    return this.http.get(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  get_games(): Observable<any> {
    const url: string = `${API_URL}/games/`;
    return this.http.get(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  get_game_team_players(id): Observable<any> {
    const url: string = `${API_URL}/get_game_team_players/${id}/`;
    return this.http.get(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  get_players_per_game_and_events(id): Observable<any> {
    const url: string = `${API_URL}/get_players_per_game_and_events/${id}/`;
    return this.http.get(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  get_game(id): Observable<any> {
    const url: string = `${API_URL}/game/${id}/`;
    return this.http.get(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  get_event(id): Observable<any> {
    const url: string = `${API_URL}/event/${id}/`;
    return this.http.get(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }


  /************************************** Update **************************************/
  update_player(new_data, id): Observable<any> {
    const url: string = `${API_URL}/update_player/${id}/`;
    return this.http.put(url, new_data, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  update_stadium(new_data, name): Observable<any> {
    const url: string = `${API_URL}/update_stadium/${name}/`;
    return this.http.put(url, new_data, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  update_team(new_data, name): Observable<any> {
    const url: string = `${API_URL}/update_team/${name}/`;
    return this.http.put(url, new_data, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  update_game(new_data, id): Observable<any> {
    const url: string = `${API_URL}/update_game/${id}/`;
    return this.http.put(url, new_data, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  update_event(new_data, id): Observable<any> {
    const url: string = `${API_URL}/update_event/${id}/`;
    return this.http.put(url, new_data, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }


  /************************************** Remove **************************************/

  remove_event(id): Observable<any> {
    const url: string = `${API_URL}/remove_event/${id}/`;
    return this.http.delete(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  remove_game(id): Observable<any> {
    const url: string = `${API_URL}/remove_game/${id}/`;
    return this.http.delete(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  remove_player(id): Observable<any> {
    const url: string = `${API_URL}/remove_player/${id}/`;
    return this.http.delete(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  remove_players_game(id): Observable<any> {
    const url: string = `${API_URL}/remove_players_game/${id}/`;
    return this.http.delete(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  remove_stadium(id): Observable<any> {
    const url: string = `${API_URL}/remove_stadium/${id}/`;
    return this.http.delete(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }

  remove_team(id): Observable<any> {
    const url: string = `${API_URL}/remove_team/${id}/`;
    return this.http.delete(url, this.http_options()).pipe(
      tap(result => this.update_token(result))
    );
  }
}

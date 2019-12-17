import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stadium} from './entities';


const http_options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 70de2e3e311ab48615455e977939badd7cd611cb',
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

  add_player(new_player): Observable<any> {
    const url: string = `${API_URL}/add_player/`;
    return this.http.post(url, new_player, http_options);
  }

  add_game(new_game): Observable<any> {
    const url: string = `${API_URL}/add_game/`;
    return this.http.post(url, new_game, http_options);
  }

  add_players_game(new_players_game, id): Observable<any> {
    const url: string = `${API_URL}/add_players_game/${id}/`;
    return this.http.post(url, new_players_game, http_options);
  }

  add_event(new_event, id): Observable<any> {
    const url: string = `${API_URL}/add_event/${id}/`;
    return this.http.post(url, new_event, http_options);
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

  get_player(id): Observable<any> {
    const url: string = `${API_URL}/player/${id}/`;
    return this.http.get(url, http_options);
  }

  get_stadiums(): Observable<any> {
    const url: string = `${API_URL}/stadiums/`;
    return this.http.get(url, http_options);
  }

  get_games(): Observable<any> {
    const url: string = `${API_URL}/games/`;
    return this.http.get(url, http_options);
  }

  get_game_team_players(id): Observable<any> {
    const url: string = `${API_URL}/get_game_team_players/${id}/`;
    return this.http.get(url, http_options);
  }

  get_players_per_game_and_events(id): Observable<any> {
    const url: string = `${API_URL}/get_players_per_game_and_events/${id}/`;
    return this.http.get(url, http_options);
  }

  get_game(id): Observable<any> {
    const url: string = `${API_URL}/game/${id}/`;
    return this.http.get(url, http_options);
  }


  /************************************** Update **************************************/
  update_player(new_data, id): Observable<any> {
    const url: string = `${API_URL}/update_player/${id}/`;
    return this.http.put(url, new_data, http_options);
  }

  update_stadium(new_data, name): Observable<any> {
    const url: string = `${API_URL}/update_stadium/${name}/`;
    return this.http.put(url, new_data, http_options);
  }

  update_team(new_data, name): Observable<any> {
    const url: string = `${API_URL}/update_team/${name}/`;
    return this.http.put(url, new_data, http_options);
  }

  update_game(new_data, id): Observable<any> {
    const url: string = `${API_URL}/update_game/${id}/`;
    return this.http.put(url, new_data, http_options);
  }
}

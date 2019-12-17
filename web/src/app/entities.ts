
export class Stadium {
  name: string;
  address: string;
  number_seats: number;
  picture: string;
  team: string;
}

export class PlayerMinimal {
  id: number;
  name: string;
  position: string;
  photo: string;
}

export class Player {
  id: number;
  name: string;
  birth_date: string;
  nick: string;
  position: string;
  team: string;
  photo: string;
}

export class TeamMinimal {
  name: string;
  logo: string;
}

export class Team {
  name: string;
  foundation_date: string;
  logo: string;
  stadium;
  players: PlayerMinimal[];
}

export class Event {
  kind_event: string;
  id: number;
  minute: number;
  player: string;
  player_id: number;
  photo: string;
  team: string;
}

export class TeamPlayGame {
  name: string;
  shots: number;
  ball_possession: number;
  corners: number;
  goals: number;
  logo: string;
}

export class Game {
  id: number;
  date: string;
  journey: number;
  stadium: string;
  stadium_picture: string;
  teams: TeamPlayGame[];
  events: Event[];
}


export class Stadium {
  name: string;
  address: string;
  number_seats: number;
  picture: File;
  team: string;
}

export class PlayerMinimal {
  id: number;
  name: string;
  position: string;
  photo: File;
}

export class Player {
  id: number;
  name: string;
  birth_date: string;
  nick: string;
  position: string;
  team: string;
  photo: File;
}

export class TeamMinimal {
  name: string;
  logo: File;
}

export class Team {
  name: string;
  foundation_date: string;
  logo: File;
  stadium: string;
  players: PlayerMinimal[];
}

export class Event {
  kind_event: string;
  id: number;
  minute: number;
  player: string;
  player_id: number;
  photo: File;
  team: string;
}

export class Game {
  id: number;
  stadium: string;
  stadium_picture: File;
  teams: TeamMinimal[];
  events: Event[];
}

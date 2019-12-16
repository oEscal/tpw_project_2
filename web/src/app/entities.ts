
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

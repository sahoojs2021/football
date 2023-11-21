interface Goals {
    for: number;
    against: number;
  }
  
  interface TeamStats {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: Goals;
  }
  
  interface TeamDetails {
    id: number;
    name: string;
    logo: string;
  }
  
  interface TeamStanding {
    rank: number;
    team: TeamDetails;
    points: number;
    goalsDiff: number;
    group: string;
    form: string;
    status: string;
    description: string;
    all: TeamStats;
    home: TeamStats;
    away: TeamStats;
    update: string;
  }
  
export  interface LeagueInfo {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    standings: TeamStanding[][];
  }
  
  interface StandingsResponse {
    league: LeagueInfo;
  }
  
export  interface StandingsDataDto {
    get: string;
    parameters: {
      league: string;
      season: string;
    };
    errors: any[]; 
    results: number;
    paging: {
      current: number;
      total: number;
    };
    response: StandingsResponse[];
  }

export interface StandingDto{
    [key:number | string]: LeagueInfo;
}
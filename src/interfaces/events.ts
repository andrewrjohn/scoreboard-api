export interface TEvents {
  date: string;
  scores: TScore[];
}

export interface TScore {
  startTime: string;
  shortName: string;
  status: TStatus;
  teams: {
    awayTeam: TTeam;
    homeTeam: TTeam;
  };
}

interface TStatus {
  inning: number;
  state: "pre" | "in" | "post";
  detail: string;
  shortDetail: string;
  completed: boolean;
}

interface TTeam {
  shortDisplayName: string;
  alternateColor: string;
  color: string;
  displayName: string;
  name: string;
  logo: string;
  location: string;
  abbreviation: string;
  isActive: boolean;
  score: string;
}

export type Game = {
  id: string;
  mode: string;
  status: string;
  currentLetter?: string;
  currentRound: number;
  maxPlayers: number;
  timeLimit: number;
  players?: Player[];
  createdAt: string;
  updatedAt: string;
};

export type Player = {
  id: string;
  username: string;
  gamesPlayed: number;
  gamesWon: number;
  highScore: number;
  totalScore: number;
};

export type GameRound = {
  id: string;
  gameId: string;
  roundNumber: number;
  letter: string;
  answers?: Answer[];
  startTime?: string;
  endTime?: string;
};

export type Answer = {
  id: string;
  gameRoundId: string;
  playerId: string;
  name?: string;
  place?: string;
  animal?: string;
  thing?: string;
  isValid?: boolean;
  score?: number;
  submittedAt: string;
};
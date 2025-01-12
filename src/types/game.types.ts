export interface Player {
  id: string;
  name: string;
  isReady: boolean;
  answers: GameAnswers;
  score: number;
  validationResults: ValidationResults;
  finishTime?: number;
}

export interface GameAnswers {
  name: string;
  place: string;
  animal: string;
  thing: string;
}

export interface ValidationResults {
  name: boolean;
  place: boolean;
  animal: boolean;
  thing: boolean;
}

export interface GameState {
  id: string;
  status: GameStatus;
  currentLetter: string;
  timeRemaining: number;
  players: { [playerId: string]: Player };
  duplicateWords: { [word: string]: string[] }; // Maps words to player IDs who used them
  startTime?: number;
  winnerId?: string;
}

export type GameStatus = 'waiting' | 'playing' | 'finished';

export interface LeaderboardEntry {
  playerId: string;
  playerName: string;
  score: number;
  gamesPlayed: number;
  gamesWon: number;
  averageScore: number;
}

// Add this to game.types.ts
export enum GameMode {
  SINGLE_PLAYER = 'SINGLE_PLAYER',
  MULTIPLAYER = 'MULTIPLAYER',
}

export interface Player {
  id: number;
  name: string;
  position: string;
  number?: number;
  x?: number;
  y?: number;
}

export type Team = 'team1' | 'team2';

export interface Position {
  name: string;
  displayName: string;
}

export interface DropPosition {
  x: number;
  y: number;
}

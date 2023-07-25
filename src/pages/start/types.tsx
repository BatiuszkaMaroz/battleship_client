export type Coords = {
  x: number;
  y: number;
};

export type Ship = {
  readonly id: string;
  readonly size: number;
  cellIndex: number;
  orientation: 'h' | 'v';
};

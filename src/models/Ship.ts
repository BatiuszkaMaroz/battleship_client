class Ship {
  id: string;
  settled: boolean = false;

  constructor(id: number, public size: number) {
    this.id = `ship-${id}`;
  }
}

export type Ships = Ship[];

export const createShips = () => {
  return [
    new Ship(0, 4),
    new Ship(1, 3),
    new Ship(2, 3),
    new Ship(3, 2),
    new Ship(4, 2),
    new Ship(5, 2),
    new Ship(6, 1),
    new Ship(7, 1),
    new Ship(8, 1),
    new Ship(9, 1),
  ];
};

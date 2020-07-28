import { Action, Reducer } from 'redux';

class Ship {
  orientation: 'horizontal' | 'vertical';

  constructor(public id: number | string, public size: number) {
    this.orientation = 'horizontal';
  }
}

const ships = [
  new Ship(1, 4),
  new Ship(2, 3),
  new Ship(3, 3),
  new Ship(4, 2),
  new Ship(5, 2),
  new Ship(6, 2),
  new Ship(7, 1),
  new Ship(8, 1),
  new Ship(9, 1),
  new Ship(10, 1),
];

//--------------------------------------------------//

type ShipsState = Ship[];

interface ShipsAction extends Action {}

const initialState = ships;

const shipsReducer: Reducer<ShipsState, ShipsAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default shipsReducer;

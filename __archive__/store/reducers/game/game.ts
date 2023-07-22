import { combineReducers } from 'redux';

import enemyBoard from './enemyBoard';
import playerBoard from './playerBoard';
import turn from './turn';
import mode from './mode';

export default combineReducers({ enemyBoard, playerBoard, turn, mode });

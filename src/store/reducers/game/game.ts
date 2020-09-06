import { combineReducers } from 'redux';

import enemyBoard from './enemyBoard';
import playerBoard from './playerBoard';
import turn from './turn';

export default combineReducers({ enemyBoard, playerBoard, turn });

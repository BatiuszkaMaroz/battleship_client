import { combineReducers } from 'redux';

import auth from './auth';
import board from './board';
import ships from './ships';
import game from './game';

const rootReducer = combineReducers({ auth, board, ships, game });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

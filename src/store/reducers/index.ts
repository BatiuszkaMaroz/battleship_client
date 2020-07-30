import { combineReducers } from 'redux';

import './RANDOMIZER';

import auth from './auth';
import board from './board';
import ships from './ships';

const rootReducer = combineReducers({ auth, board, ships });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

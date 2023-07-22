import { combineReducers } from 'redux';

import stage from './stages';
import connect from './connect';
import settings from './settings/settings';
import game from './game/game';

const rootReducer = combineReducers({ stage, connect, settings, game });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

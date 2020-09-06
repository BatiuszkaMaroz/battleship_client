import { combineReducers } from 'redux';

import status from './status';
import connect from './connect';
import settings from './settings/settings';
import game from './game/game';

const rootReducer = combineReducers({ status, connect, settings, game });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

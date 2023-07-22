import { combineReducers } from 'redux';

import ships from './ships';
import board from './board';

export default combineReducers({ ships, board });

import {combineReducers} from 'redux';
import board from './board';
import auth from './auth';

const rootReducer=combineReducers({
    auth,
    board
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
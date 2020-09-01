import {combineReducers} from 'redux';
import board from './board';
import auth from './auth';
import notification from './notification';

type RootType = ReturnType<typeof rootReducer>;

const rootReducer:RootType=combineReducers({
    auth,
    board,
    notification
});

export default rootReducer;


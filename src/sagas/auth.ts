import {all, put, call, fork, takeEvery} from 'redux-saga/effects'

import {GET_LOGGED, getLogged} from "../reducers/auth";
import axios from "axios";

export default function* authSaga() {
    yield all([
        getLogged$()
    ])
}

const AuthCheckAPI=()=>{
    return axios.get('/api/user/auth/check');
}

function* getLogged$() {
    try {
        const logged = yield call(AuthCheckAPI);
        yield put(getLogged(logged.data.is_user));
        sessionStorage.setItem('logged', logged.data.is_user);
    } catch (err) {
        console.log(err);
        yield put(getLogged(null));
        sessionStorage.removeItem('logged');
    }
}

import {all, put, call, fork, takeEvery} from 'redux-saga/effects'

// import {GET_LOGGED, getLogged} from "../reducers/auth";
import {REFRESH_TOKEN, refreshToken} from "../reducers/auth";

import axios from "axios";

export default function* authSaga() {
    yield all([
        getLogged$()
    ])
}

// const AuthCheckAPI=()=>{
//     return axios.get('/api/user/auth/check');
// }

const refreshTokenAPI=()=>{
    return axios.post('/api/user/refresh');
}

function* getLogged$() {
    try {
        // const logged = yield call(AuthCheckAPI);
        // yield put(getLogged(logged.data.is_user));
        // sessionStorage.setItem('logged', logged.data.is_user);
        const res = yield call(refreshTokenAPI);
        yield put(refreshToken(res.data.expired_in, res.data.access_token));
    } catch (err) {
        console.log(err);
        yield put(refreshToken(0,''));
    }
}

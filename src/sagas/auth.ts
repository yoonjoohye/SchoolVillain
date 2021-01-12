import {all, put, call, fork, takeEvery} from 'redux-saga/effects'

import {GET_LOGGED, getLogged} from "../reducers/auth";
// import {REFRESH_TOKEN, refreshToken} from "../reducers/auth";

import axios from "axios";
import {removeCookie, setCookie, getCookie} from "../utils/cookie";

export default function* authSaga() {
    yield all([
        getLogged$()
    ])
}

// const AuthCheckAPI=()=>{
//     return axios.get('/api/user/auth/check');
// }

const refreshTokenAPI = () => {
    return axios.post('/api/user/refresh');
}

function* getLogged$() {
    try {
        // const logged = yield call(AuthCheckAPI);
        // yield put(getLogged(logged.data.is_user));
        const res = yield call(refreshTokenAPI);
        console.log(res);
        if(res.status===200) {
            yield put(getLogged(res.data.access_token));
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
            let date=new Date();
            date.setSeconds(date.getSeconds()+res.data.expires_in);
            setCookie('user_token', res.data.access_token,{expires: date});
        }
    } catch (err) {
        console.log(err);
        removeCookie('user_token');
        yield put(getLogged(null));
    }
}

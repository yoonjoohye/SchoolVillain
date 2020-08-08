import React, {useEffect} from 'react';
import Root from './router/Root';
import {GlobalStyle} from '../assets/style/Global.style';
import axios from 'axios';

import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/index';

axios.defaults.withCredentials=true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = 'https://dev.villain.school';

const sagaMiddleware = createSagaMiddleware();
const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)));

const App: React.FC = () => {
    useEffect(()=>{
        UserAPI();
    },[]);

    const UserAPI=async ()=> {
        try {
            let response = await axios({
                method: 'GET',
                url: 'api/user/auth/check'
            });
            // console.log(response);

            if (response.status === 200) {
                if(response.data.is_user){
                    sessionStorage.setItem('logged', response.data.is_user);
                }else{
                    sessionStorage.removeItem('logged');
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Provider store={store}>
            <GlobalStyle/>
            <Root/>
        </Provider>
    )
}

export default App;
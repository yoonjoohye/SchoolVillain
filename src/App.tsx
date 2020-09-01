import React, {useEffect} from 'react';
import Root from './router/Root';
import {GlobalStyle} from '../assets/style/Global.style';
import axios from 'axios';
import {cacheAdapterEnhancer} from 'axios-extensions';
import Store from './store/store';

axios.defaults.withCredentials=true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
let url = 'https://dev.villain.school';

if (process.env.BUILD_ENV == 'production') {
    url = 'https://api.villain.school';
}

if (process.env.BUILD_ENV == 'development') {
    url = 'https://dev.villain.school';
}

axios.defaults.baseURL=url;
axios.defaults.adapter=cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false, cacheFlag: 'useCache'});


const App: React.FC = () => {
    useEffect(() => {
        UserAPI();
    }, []);

    const UserAPI = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/user/auth/check',
                cache: true
            });
            if (response.status === 200) {
                sessionStorage.setItem('logged', response.data.is_user);
            }
        } catch (err) {
            sessionStorage.removeItem('logged');
        }
    }

    return (
        <Store>
            <GlobalStyle/>
            <Root/>
        </Store>
    )
}

export default App;
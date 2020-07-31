import React, {useEffect} from 'react';
import Root from './router/Root';
import {GlobalStyle} from '../assets/style/Global.style';
import axios from 'axios';

axios.defaults.withCredentials=true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = 'https://dev.villain.school';

const App: React.FC = () => {
    useEffect(()=>{
        UserAPI();
    },[]);

    const UserAPI=async ()=> {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/me'
            });
            if (response.status === 200) {
                sessionStorage.setItem('logged', true);
                console.log(response);
            }
        } catch (err) {
            sessionStorage.removeItem('logged');
            console.error(err);
        }
    }

    return (
        <>
            <GlobalStyle/>
            <Root/>
        </>
    )
}

export default App;
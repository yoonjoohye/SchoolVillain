import React from 'react';
import Root from './router/Root';
import {GlobalStyle} from '../assets/style/Global.style';
import Store from './store/store';

const App: React.FC = () => {
    // useEffect(() => {
    //     UserAPI();
    // }, []);
    //
    // const UserAPI = async () => {
    //     try {
    //         let response = await axios({
    //             method: 'GET',
    //             url: '/api/user/auth/check'
    //         });
    //         if (response.status === 200) {
    //             sessionStorage.setItem('logged', response.data.is_user);
    //         }
    //     } catch (err) {
    //         sessionStorage.removeItem('logged');
    //     }
    // }

    return (
        <Store>
            <GlobalStyle/>
            <Root/>
        </Store>
    )
}

export default App;
import React, {useEffect} from 'react';
import Root from './router/Root';
import {GlobalStyle} from '../assets/style/Global.style';
import Store from './store/store';

const App = () => {
    return (
        <Store>
            <GlobalStyle/>
            <Root/>
        </Store>
    )
}

export default App;
import * as React from 'react';
import Root from "./router/Root";
import {GlobalStyle} from "../assets/style/Global.style";

const App: React.FC = () => {
    return (
        <>
            <GlobalStyle/>
            <Root/>
        </>
    )
}

export default App;
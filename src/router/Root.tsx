import * as React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Index from "../pages/index/Index";
import Login from "../pages/auth/Login";
import Join from "../pages/auth/Join";
import ServiceRule from "../constants/join/ServiceRule";
import PrivacyRule from "../constants/join/PrivacyRule";
import Write from "../pages/write/Write";
import Mypage from "../pages/mypage/Mypage";
import Detail from "../pages/detail/Detail";
import NotFound from "../pages/404/NotFound";
import Header from "../constants/base/Header";

const Root: React.FC = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Index}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/join/:id" component={Join}/>
                <Route exact path="/write" component={Write}/>
                <Route exact path="/mypage" component={Mypage}/>
                <Route exact path="/detail/:id" component={Detail}/>
                <Route path="" component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Root;
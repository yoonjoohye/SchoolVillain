import * as React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Index from "../pages/index/Index";
import Login from "../pages/auth/Login";
import Join from "../pages/auth/Join";
import Write from "../pages/board/Write";
import Detail from "../pages/board/Detail";
import Mypage from "../pages/mypage/Mypage";
import NotFound from "../pages/404/NotFound";
import Header from "../constants/base/Header";

const Root: React.FC = () => {
    return (
        <BrowserRouter>
            <Header/>

                <Route exact path="/" component={Index}/>
                <Route exact path="/login" component={Login}/>
            <Switch>
                <Route exact path="/join/:id" component={Join}/>
            </Switch>
                <Route exact path="/write" component={Write}/>
                <Route exact path="/mypage" component={Mypage}/>
            <Switch>
                <Route exact path="/detail/:id" component={Detail}/>
            </Switch>

            <Route path="" component={NotFound}/>
        </BrowserRouter>
    )
}

export default Root;
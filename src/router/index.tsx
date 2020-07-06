import * as React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Sign from "../pages/auth/Sign";
import Join from "../pages/auth/Join";
import ServiceRule from "../pages/auth/ServiceRule";
import PrivacyRule from "../pages/auth/PrivacyRule";
import Write from "../pages/write/Write";
import Mypage from "../pages/mypage/Mypage";
import Detail from "../pages/detail/Detail";
import NotFound from "../pages/404/NotFound";
import Header from "../constants/base/Header";

const Index=()=>{
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Index}/>
                <Route exact path="/sign" component={Sign}/>
                <Route exact path="/sign" component={Join}/>
                <Route exact path="/service-rule" component={ServiceRule}/>
                <Route exact path="/privacy-rule" component={PrivacyRule}/>
                <Route exact path="/write" component={Write}/>
                <Route exact path="/mypage" component={Mypage}/>
                <Route exact path="/detail/:id" component={Detail}/>
                <Route path="" component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Index;
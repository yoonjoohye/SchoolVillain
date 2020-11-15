import * as React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import ScrollToTop from "./ScrollToTop";
import Index from "../pages/index/Index";
import Login from "../pages/auth/Login";
import Join from "../pages/auth/Join";
import Write from "../pages/board/Write";
import Edit from "../pages/board/Edit";
import Detail from "../pages/board/Detail";
import Mypage from "../pages/mypage/Mypage";
import NotFound from "../pages/error/NotFound";
import Header from "../templates/base/Header";
import Apply from "../pages/banner/Apply";
import SendEmail from "../pages/auth/SendEmail";
import Withdrawal from "../pages/auth/Withdrawal";
import ResetPassword from "../pages/auth/ResetPassword";
import Notification from "../pages/notification/Notification";
import Search from "../pages/search/Search";
import Result from "../pages/search/Result";
import {useSelector} from "react-redux";
import Myboard from "../pages/myboard/Myboard";

const Root = (props) => {
    console.log(props.param);
    let logged = useSelector(state => state.auth.logged);
    return (
        <BrowserRouter>
            <ScrollToTop/>

                <Header/>
            <Switch>
                <Route exact path="/" component={Index}/>
                <Route exact path="/login" render={props => (
                    logged ? <Redirect to="/"/> : <Login {...props} />
                )}/>
                <Route exact path="/send/email" render={props => (
                    logged ? <Redirect to="/"/> : <SendEmail {...props} />
                )}/>
                <Route exact path="/reset/password" render={props => (
                    logged ? <Redirect to="/"/> : <ResetPassword {...props} />
                )}/>
                <Route exact path="/join/:id" render={props => (
                    logged ? <Redirect to="/"/> : <Join {...props} />
                )}/>
                <Route exact path="/notification" render={props => (
                    logged ? <Notification {...props} /> : <Redirect to="/login"/>
                )}/>
                <Route exact path="/mypage" render={props => (
                    logged ? <Mypage {...props} /> : <Redirect to="/login"/>
                )}/>
                <Route exact path="/myboard/:name" render={props => (
                    logged ? <Myboard {...props} /> : <Redirect to="/login"/>
                )}/>
                <Route exact path="/withdrawal" render={props => (
                    logged ? <Withdrawal {...props} /> : <Redirect to="/login"/>
                )}/>
                <Route exact path="/write" render={props => (
                    logged ? <Write {...props} /> : <Redirect to="/login"/>
                )}/>
                <Route exact path="/edit/:id" render={props => (
                    logged ? <Edit {...props} /> : <Redirect to="/login"/>
                )}/>
                <Route path="/search" component={Search}/>
                <Route path="/result" component={Result}/>
                <Route exact path="/detail/:id" component={Detail}/>
                <Route exact path="/banner/apply" component={Apply}/>

                <Route path="" component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Root;
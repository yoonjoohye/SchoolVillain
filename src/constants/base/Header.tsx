import * as React from 'react';
import {Link} from 'react-router-dom';


const Header=()=>{
    return(
        <header className="welcome">
            <Link to="/login">로그인</Link>
            <Link to="/join">회원가입</Link>
        </header>
    )
}

export default Header;
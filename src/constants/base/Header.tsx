import * as React from 'react';
import {Link} from 'react-router-dom';
import {MarkdownXl} from "../../../assets/style/Markdown.style";
import styled from "@emotion/styled";
import {media} from "../../../assets/style/Media.style";

const HeaderSection=styled.header`
  ${MarkdownXl()}
`;

const Header=()=>{
    return(
        <HeaderSection>
            <Link to="/login">로그인</Link>
            <Link to="/join">회원가입</Link>
        </HeaderSection>
    )
}

export default Header;
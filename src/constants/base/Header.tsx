import * as React from 'react';
import {Link} from 'react-router-dom';
import styled from "@emotion/styled";
import {MarkdownMd, MarkdownXl} from "../../../assets/style/Markdown.style";
import {FlexBox} from "../../../assets/style/Layout.style";
import {media} from "../../../assets/style/Media.style";
import {Color} from "../../../assets/style/Color.style";
import Nav from "./Nav";
import {useCallback, useState} from "react";

const HeaderSection = styled.header`
  position: fixed;
  top:0;
  width:100%;
  background-color:${Color.white};
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.16);
  z-index: 3;

`;
const HeaderContainer = styled.section`
  ${FlexBox('space-between', 'center')};
  padding:0 15%;
  height:4em;
  ${media.sm`padding:0 5%`}
`
const HeaderLogo = styled.div`
  ${MarkdownMd()};
`
const HeaderMenu = styled.span`
  text-align:right;
  min-width: fit-content;
`

const Header = () => {
    let [isNav,setIsNav]=useState(false);

    const onNav=useCallback(()=>{
        setIsNav(isNav);
    },[isNav]);
    return (
        <HeaderSection>
            <HeaderContainer>
                <HeaderLogo>
                    <Link to="/">
                        스쿨빌런
                    </Link>
                </HeaderLogo>
                <HeaderMenu>

                {
                    localStorage.getItem('token')?
                        <>
                            <div onClick={onNav}>프로필</div>
                            <Nav isNav={isNav}></Nav>
                        </>
                        :
                        <>
                            <Link to="/login">로그인</Link>/<Link to="/join/agreement">가입</Link>
                        </>
                }
                </HeaderMenu>


            </HeaderContainer>
        </HeaderSection>
    )
}

export default Header;
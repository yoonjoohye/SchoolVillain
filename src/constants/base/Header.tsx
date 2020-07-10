import * as React from 'react';
import {Link} from 'react-router-dom';
import styled from "@emotion/styled";
import {MarkdownMd, MarkdownXl} from "../../../assets/style/Markdown.style";
import {FlexBox} from "../../../assets/style/Box.style";

const HeaderSection = styled.header`
  position: fixed;
  width:100%;
`;
const HeaderContainer=styled.section`
  ${FlexBox('space-between', 'center')};
  padding:0 10%;
  height:60px;
`
const HeaderLogo = styled.div`
  ${MarkdownMd()};
  width:100%;
  text-align:center;
`
const HeaderMenu = styled.span`
  text-align:right;
  min-width: fit-content;
`

const Header = () => {
    return (
        <HeaderSection>
            <HeaderContainer>
                <HeaderLogo>
                    스쿨빌런
                </HeaderLogo>
                <HeaderMenu>
                    <Link to="/login">로그인</Link>/<Link to="/join/1">가입</Link>
                </HeaderMenu>
            </HeaderContainer>
        </HeaderSection>
    )
}

export default Header;
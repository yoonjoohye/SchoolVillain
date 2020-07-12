import * as React from 'react';
import {Link} from 'react-router-dom';
import styled from "@emotion/styled";
import {MarkdownMd, MarkdownXl} from "../../../assets/style/Markdown.style";
import {FlexBox} from "../../../assets/style/Box.style";
import {media} from "../../../assets/style/Media.style";
import {Color} from "../../../assets/style/Color.style";

const HeaderSection = styled.header`
  position: fixed;
  width:100%;
  background-color:${Color.white};
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.16);
  z-index: 3;

`;
const HeaderContainer = styled.section`
  ${FlexBox('space-between', 'center')};
  padding:0 10%;
  height:60px;
  ${media.sm`padding:0 5%`}
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
                    <Link to="/">
                        스쿨빌런
                    </Link>
                </HeaderLogo>
                <HeaderMenu>
                    <Link to="/login">로그인</Link>/<Link to="/join/agreement">가입</Link>
                </HeaderMenu>
            </HeaderContainer>
        </HeaderSection>
    )
}

export default Header;
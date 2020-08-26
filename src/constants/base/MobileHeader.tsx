import {css} from "@emotion/core";
import {FlexBox} from "../../../assets/style/Layout.style";
import {Link} from "react-router-dom";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownSm} from "../../../assets/style/Markdown.style";
import * as React from "react";
import styled from "@emotion/styled";
import {media} from "../../../assets/style/Media.style";

const HeaderSection = styled.header`
  position: fixed;
  top:0;
  width:100%;
  background-color:${Color.white};
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.16);
  z-index: 3;

`;
const HeaderContainer = styled.section`
  ${FlexBox('', 'space-between', 'center')};
  height:4em;
  width:1000px;
  margin:auto;
  ${media.md`width:80%;`};
  ${media.sm`width:90%;`};
`

const MobileHeader=()=>{
    return(
        <HeaderSection>
            <HeaderContainer>


            </HeaderContainer>
        </HeaderSection>
    )
}
export default MobileHeader;
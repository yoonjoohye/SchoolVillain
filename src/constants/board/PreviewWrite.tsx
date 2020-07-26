import {css} from "@emotion/core";
import React from "react";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox} from "../../../assets/style/Box.style";
import {Link} from "react-router-dom";

const WriteSection = styled.section`
  width:100%;
  margin-top:6em;
`
const WriteContainer = styled.div`
  ${FlexBox('flex-start','center')};
  box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.15);
  color:${Color.purple200};
  padding:2em;
  cursor:pointer;
  &:hover{
    background-color:${Color.purple100};
  }
`

const PreviewWrite = ({history}:any) => {
    return (
        <WriteSection>
            <Link to={'/write'}>
                <WriteContainer>
                    <img css={css`width:2em; height:2em; margin-right:10px;`} src="../../../assets/img/icon/edit.svg"/>
                    빌런아, 오늘 있었던 일 뭐야?
                </WriteContainer>
            </Link>
        </WriteSection>
    )
}

export default PreviewWrite;
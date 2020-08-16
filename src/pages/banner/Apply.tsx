import React from 'react';
import styled from "@emotion/styled";
import {FlexBox, onlyMobile, onlyPc, Section} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";
import {MarkdownLg} from "../../../assets/style/Markdown.style";
import {media} from "../../../assets/style/Media.style";

const ApplySection = styled.section`
  margin:6em 0 4em 0;
  ${Section};
  ${media.sm`padding:0; margin-bottom:6em;`}
`
const ApplyImg = styled.img`
  display:block;
  width:100%;
`
const ApplyFloating=styled.div`
  position:fixed; 
  bottom:0; 
  left:0;
  padding:0.5em 0; 
  ${FlexBox()};
  width:100%;
  border-top:4px solid #000000;
  background-color:white;
  ${MarkdownLg('', 700)};
  &:hover{
    background-color:#eeeeee;
  }
`
const Apply = () => {
    return (
        <ApplySection>
                <ApplyImg css={css`${onlyPc()}`} src={require('../../../assets/img/banner/pc_apply.png')}/>
                <ApplyImg css={css`${onlyMobile()}`} src={require('../../../assets/img/banner/m_apply.png')}/>

            <ApplyFloating><a css={css`width:100%; text-align: center;`} href="https://pf.kakao.com/_QxakAK" target="_blank">지금 바로 배너등록 신청하기</a></ApplyFloating>
        </ApplySection>
    )
}

export default Apply;
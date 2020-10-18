import React, {useState} from 'react';
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {Link} from "react-router-dom";
import {css} from "@emotion/core";
import {FlexBox} from "../../../assets/style/Layout.style";
import {MarkdownBase, MarkdownLg, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import SkeletonIdentification from "../loading/SkeletonIdentification";
import {useSelector} from "react-redux";
import {Blink} from "../../../assets/style/Animate.style";

const ProfileContainer = styled.div`
  position:relative;
  width:100%;
  height:250px;
  transform-style: preserve-3d;
  transition: transform 1s;
  &:hover{
    transform: rotateY(180deg);
  }
`
const ProfileSection = styled.div`
  position: absolute;
  width:100%;
  height:100%;
  cursor:pointer;
  border-radius:0.3em;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  &.back{
    ${FlexBox('column', 'space-around', '')};
    transform: rotateY(180deg);
    background-color:${Color.white};
  }
  
`
const ProfileTitle = styled.div`
  border-radius: 0.3em 0.3em 0 0;
  background-image: url(${require('../../../assets/img/bg/identification.png')});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0 1em;
  margin-bottom:1em;
  height:35%;
  ${FlexBox('row', 'space-between', 'center')};
`

const ProfileName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  ${MarkdownLg(Color.white, 500)};
}
`
const ProfileBody = styled.div`
  padding:0 1em;
  ${MarkdownSm()};
  height:7.5em;
`

const ProfileFooter = styled.div`
  padding: 1.2em;
  text-align:center;
`

const IdentificationWrapper=styled.div`
  width:100%;
  background:#f4f4f4;
`
const IdentificationImg=styled.img`
  width:100%;
  height: 150px;
`
const Identification = ({user}: any) => {
    return (
        <>
            {
                user ?
                    <IdentificationWrapper>
                        <IdentificationImg src={require('../../../assets/img/bg/identification.png')}/>
                        <div css={css`padding:30px;`}>
                            <div css={css`margin-bottom:20px; text-align:center;`}>
                                <span css={css`${MarkdownLg('',500)}; margin-right:10px;`}>{user.name || '익명'}</span>
                                <span css={css`${MarkdownLg('',400)};`}>최고의 빌런</span>
                            </div>
                            <div css={css`${MarkdownSm('',300)}`}>
                                위 학생은 본교 학생임을 인증합니다.
                            </div>
                        </div>
                    </IdentificationWrapper>
                    :
                    <SkeletonIdentification/>
            }
        </>
    )
}
export default Identification;
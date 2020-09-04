import React, {useState} from 'react';
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {Link} from "react-router-dom";
import {css} from "@emotion/core";
import SkeletonProfile from "../loading/SkeletonIdentification";
import {FlexBox} from "../../../assets/style/Layout.style";
import {MarkdownBase, MarkdownLg, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {media} from "../../../assets/style/Media.style";
import SkeletonIdentification from "../loading/SkeletonIdentification";
import {useSelector} from "react-redux";

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
    ${FlexBox('column','space-around','')};
    transform: rotateY(180deg);
    background-color:${Color.white};
  }
  
`
const ProfileTitle = styled.div`
  border-radius: 0.3em 0.3em 0 0;
  background-image: url(${require('../../../assets/img/bg/identification.png')});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0 1em;
  margin-bottom:1em;
  height:35%;
  ${FlexBox('row', 'space-between', 'center')};
`

const ProfileName=styled.div`
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

const ProfileFooter=styled.div`
  padding: 1.2em;
  text-align:center;
`

interface btnProps {
    isFull:boolean;
}


const AuthBtn = styled.button<btnProps>`
  width:100%;
  padding:1em;
  border-radius: 0.3em;
  text-align:center;
  border:1px solid ${Color.purpl200};

   ${(props: btnProps) => props.isFull?
    css`
    background-color:${Color.purple200};
    color:${Color.white};
    &:hover{
      background-color:${Color.purple300};
    }
    margin-bottom:1em;
    `:
    css`
    background-color:${Color.white};
    color:${Color.purple200};
     &:hover{
      background-color:${Color.purple100};
    }
    `
};
  
`

const Identification = ({user}: any) => {
    let logged=useSelector(state=>state.auth.logged);
    return (
        <>
            {
                logged ?
                    user ?
                        <ProfileContainer>
                            <ProfileSection>
                                <ProfileTitle>
                                    <div css={css` width:100%; margin-right:0.3em; overflow:hidden;`}>
                                        <ProfileName>{user.name || '익명'}</ProfileName>
                                    </div>
                                    <img css={css`width:4em;`} src={require('../../../assets/img/badge/badge.svg')}/>
                                </ProfileTitle>
                                <ProfileBody>
                                    <div css={css`${MarkdownLg('', 500)}; margin-bottom:0.5em;`}>스쿨빌런학교</div>
                                    <div>학생 ID : {user.email}</div>
                                    <div>유효기간 : 고등학교 졸업식</div>
                                </ProfileBody>

                                <ProfileFooter css={css`${MarkdownSm(Color.gray200)};`}>
                                    위 학생은 본교 학생임을 인증합니다.
                                </ProfileFooter>
                            </ProfileSection>
                            <ProfileSection className="back">
                                <div
                                    css={css`text-align:center; padding: 1.2em; margin-bottom:1em; ${MarkdownMd('', 500)}; border-bottom:1px solid ${Color.gray100}`}>
                                    유의사항
                                </div>
                                <ProfileBody>
                                    <li css={css`${FlexBox('', 'Flex-start', '')}; margin-bottom:0.5em;`}>
                                        <div css={css`margin-right:1em;`}>▶</div>
                                        <div>당신만의 학생다움을 보여주세요.</div>
                                    </li>
                                    <li css={css`${FlexBox('', 'Flex-start', '')}; margin-bottom:0.5em;`}>
                                        <div css={css`margin-right:1em;`}>▶</div>
                                        <div>바르고 고운 말을 사용해주세요.</div>
                                    </li>
                                    <li css={css`${FlexBox('', 'Flex-start', '')}; margin-bottom:0.5em;`}>
                                        <div css={css`margin-right:1em;`}>▶</div>
                                        <div>타인에게 양도할 수 없습니다.</div>
                                    </li>
                                    <li css={css`${FlexBox('', 'Flex-start', '')};`}>
                                        <div css={css`margin-right:1em;`}>▶</div>
                                        <div>타인이 접속한 경우, 로그아웃해주세요.</div>
                                    </li>
                                </ProfileBody>
                                <ProfileFooter
                                    css={css`${MarkdownMd('', 500)};`}>스쿨빌런학교짱
                                </ProfileFooter>
                            </ProfileSection>
                        </ProfileContainer>
                        :
                        <SkeletonIdentification/>
                    :
                    <section css={css`padding:1.5em 1em;
                                      box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16);
                                      margin-bottom:2em;
                                      text-align:center;
                                      ${MarkdownBase('')}`}>
                        <div css={css`margin-bottom:1em;`}>아직도 <span css={css`font-weight:700;`}>스쿨빌런 가입</span> 안했나요?</div>
                        <Link to="/login">
                            <AuthBtn isFull={true}>
                                로그인
                            </AuthBtn>
                        </Link>
                        <Link to="/join/agreement">
                            <AuthBtn isFull={false}>
                                회원가입
                            </AuthBtn>
                        </Link>
                    </section>
            }
        </>
    )
}
export default Identification;
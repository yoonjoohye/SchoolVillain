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

const ProfileContainer = styled.div`
  position:relative;
  margin-bottom:1em;
  height:250px;
  transform-style: preserve-3d;
  transition: transform 1s;
  &:hover{
    transform: rotateY(180deg);
  }
  ${media.md`height:350px;`}
`
const ProfileSection = styled.div`
  position: absolute;
  width:100%;
  height:250px;
  cursor:pointer;
  border-radius:0.3em;
  box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  ${media.md`height:350px;`}
  &.back{
    transform: rotateY(180deg);
    background-color:${Color.white};
  }
  
`
const ProfileTitle = styled.div`
  background-image: url(${require('../../../assets/img/bg/identification.png')});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0 1em;
  margin-bottom:1.5em;
  height:35%;
  ${FlexBox('row', 'space-between', 'center')};
`
const ProfileBody = styled.div`
  padding:0 1em;
  ${MarkdownSm()}
  margin-bottom:2em;
`

const ProfileFooter=styled.div`
  padding:0.5em 1em;
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
    return (
        <>
            {
                sessionStorage.getItem('logged') ?
                    user ?
                        <ProfileContainer>
                            <ProfileSection>
                                <ProfileTitle>
                                    <span css={css`${MarkdownLg(Color.white, 700)};`}>{user.name || '익명'}</span>
                                    <img css={css`width:4em;`} src={require('../../../assets/img/badge/badge.svg')}/>
                                </ProfileTitle>
                                <ProfileBody>
                                    <div css={css`${MarkdownLg('', 700)}; margin-bottom:0.5em;`}>스쿨빌런학교</div>
                                    <div>학생 ID : {user.email}</div>
                                    <div>유효기간 : 고등학교 졸업식</div>
                                </ProfileBody>

                                <ProfileFooter css={css`${MarkdownSm(Color.gray200)}; `}>
                                    위 학생은 본교 학생임을 인증합니다.
                                </ProfileFooter>
                            </ProfileSection>
                            <ProfileSection className="back">
                                <div
                                    css={css`text-align:center; padding: 1em; margin-bottom:1em; ${MarkdownMd('', 700)}; border-bottom:1px solid ${Color.gray100}`}>
                                    유의사항
                                </div>
                                <ProfileBody css={css`margin-bottom:1em;`}>
                                    <li css={css`${FlexBox('', 'Flex-start', '')}; margin-bottom:0.5em;`}>
                                        <div css={css`margin-right:0.5em;`}>▶</div>
                                        <div>당신만의 학생다움을 보여주세요.</div>
                                    </li>
                                    <li css={css`${FlexBox('', 'Flex-start', '')}; margin-bottom:0.5em;`}>
                                        <div css={css`margin-right:0.5em;`}>▶</div>
                                        <div>바르고 고운 말을 사용해주세요.</div>
                                    </li>
                                    <li css={css`${FlexBox('', 'Flex-start', '')}; margin-bottom:0.5em;`}>
                                        <div css={css`margin-right:0.5em;`}>▶</div>
                                        <div>본인만이 사용할 수 있으며, 타인에게 양도할 수 없습니다.</div>
                                    </li>
                                    <li css={css`${FlexBox('', 'Flex-start', '')};`}>
                                        <div css={css`margin-right:0.5em;`}>▶</div>
                                        <div>본인이 아닐경우, 즉시 로그아웃을 진행해주시길 바랍니다.</div>
                                    </li>
                                </ProfileBody>
                                <ProfileFooter
                                    css={css`${MarkdownBase('', 700)};`}>스쿨빌런학교짱
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
import React from 'react';
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {Link} from "react-router-dom";
import {css} from "@emotion/core";
import SkeletonProfile from "../loading/SkeletonProfile";
import {FlexBox} from "../../../assets/style/Layout.style";
import {MarkdownSm} from "../../../assets/style/Markdown.style";

const ProfileSection = styled.section`
  ${FlexBox('','','flex-start')};
  padding:1em;
  box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16);
  margin-bottom:1em;
`
interface btnProps {
    bgColor: string;
    color: string;
}

const AuthBtn = styled.button`
  width:100%;
  padding:1em;
   ${(props: btnProps) => `
    background-color:${props.bgColor};
    color:${props.color}!important;
    `};
  text-align:center;
`

const Profile = ({user}:any) => {
    return (
        <>
        {
            sessionStorage.getItem('logged') ?
                user ?
                    <ProfileSection>
                        <img css={css`width:30%; margin-right:0.5em;`} src="../../../assets/img/index/badge.png"></img>
                        <div css={css`width:70%;`}>
                            <div css={css`margin-bottom:0.5em;`}>{user.name || '익명'}</div>
                            <div css={css`margin-bottom:0.5em;`}>미림여자정보과학고등학교</div>
                            <div>{user.email}</div>
                        </div>
                    </ProfileSection> :
                    <SkeletonProfile/>
                :
                <section css={css`padding:1em;
                                      box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16);
                                      margin-bottom:1em;
                                      text-align:center;`}>
                    <div>아직 스쿨빌런에 가입을 하지 않으셨나요?</div>
                    <Link to="/login">
                        <AuthBtn css={css`margin-bottom:1em;`} color={Color.purple200}
                                 bgColor={Color.purple100}>
                            로그인
                        </AuthBtn>
                    </Link>
                    <Link to="/login">
                        <AuthBtn color={Color.yellow200} bgColor={Color.yellow100}>
                            회원가입
                        </AuthBtn>
                    </Link>
                </section>
        }
        </>
    )
}
export default Profile;
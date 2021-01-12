import React, {useEffect, useState} from "react";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import axios from "axios";
import styled from "@emotion/styled";
import {
    MarkdownBase,
    MarkdownLg,
    MarkdownMd,
    MarkdownMdx,
    MarkdownSm,
    MarkdownXl
} from "../../../assets/style/Markdown.style";
import {FlexBox, onlyMobile} from "../../../assets/style/Layout.style";
import {ErrorMsg} from "../../../assets/style/Util";
import {media} from "../../../assets/style/Media.style";
import Modal from "../modal/Modal";
import Identification from "./Identification";

const ProfileTitle = styled.div`
  ${MarkdownMd('', 600)};
  margin-bottom:30px;
`

const Input = styled.input`
    ${MarkdownBase()};
    width:calc(100% - 1em);
    border-radius: 0.5em;
    border:1px solid ${Color.gray100};
    outline:none;
    height:45px;
    padding-left: 1em;
    ${media.sm`
        height:35px;
    `}
`
const Title=styled.div`
  ${MarkdownMdx('#c1c1c1')};
    margin-right:20px;
    width:50px;

`
const ProfileBox = styled.div`
  ${FlexBox('','','center')}; 
  margin-bottom:40px;
  ${media.sm`
    ${FlexBox('column','ceneter','center')};
  `}
`
const Avartar=styled.div`
  margin-right:40px;
  box-shadow: 0 0 4px rgba(152, 149, 149, 0.25);
  border-radius: 5px;
  padding:30px 50px;
  ${media.sm`margin:30px 0;`}
`

const ProfileSection=styled.div`
  ${FlexBox('','','center')};
  margin-bottom:30px;
`

interface buttonProps {
    enabled: boolean;
}

const Button = styled.button`
  padding:10px 40px;
  ${MarkdownMd(Color.white)};
  border-radius: 0.3em;
  margin-top:30px;
  ${(props: buttonProps) => props.enabled ?
    css`pointer-events:initial;
     background-color:${Color.purple200};
    ` :
    css`pointer-events:none;
     background-color:#DFDFDF;
     color:#A9A9A9;
    `
}
  &:hover{
    background-color: ${Color.purple300};
  }
`

const EditButton = styled.button`
  height: 45px;
  width: 100px;
  ${MarkdownBase(Color.white)};
  border-radius: 0.3em;
  ${media.sm`
    margin-left:0;
    height:35px;
    width:75px;
  `}

  ${(props: buttonProps) => props.enabled ?
    css`pointer-events:initial;
     background-color:${Color.purple200};
    ` :
    css`pointer-events:none;
     background-color:#DFDFDF;
     color:#A9A9A9;
    `
}
  &:hover{
    background-color: ${Color.purple300};
    }
`

const Label = styled.label`
  display:block;
  ${MarkdownBase(Color.gray200, 500)};
  margin-bottom:10px;
  
`
const GrayButton = styled.button`
  ${MarkdownSm(Color.gray200)};
  background-color:${Color.gray100};
  padding:0.5em 1em;
  margin-left:1em;
  border-radius: 0.3em;
  &:hover{
    background-color:#e1e1e1;
  }
`

interface propsType {
    user: any;

    nickname: string;
    nicknameErr: string;
    nicknameCheck: boolean;
    changeNickname: any;

    email: string;

    currentPassword: string;
    currentPasswordErr: string;
    currentPasswordCheck: boolean;
    changeCurrentPassword: any;

    newPassword: string;
    newPasswordErr: string;
    newPasswordCheck: boolean;
    changeNewPassword: any;

    newPasswordConfirm: string;
    newPasswordConfirmErr: string;
    newPasswordConfirmCheck: boolean;
    changeNewPasswordConfirm: any;

    editNickname: any;
    editPassword: any;
    goLogout: any;
    goWithdrawal: any;
}

const Profile: React.FC<propsType> = ({
                                          user,
                                          nickname,
                                          nicknameErr,
                                          nicknameCheck,
                                          changeNickname,

                                          email,

                                          currentPassword,
                                          currentPasswordErr,
                                          currentPasswordCheck,
                                          changeCurrentPassword,

                                          newPassword,
                                          newPasswordErr,
                                          newPasswordCheck,
                                          changeNewPassword,

                                          newPasswordConfirm,
                                          newPasswordConfirmErr,
                                          newPasswordConfirmCheck,
                                          changeNewPasswordConfirm,

                                          editNickname,
                                          editPassword,
                                          goLogout,
                                          goWithdrawal
                                      }) => {

    return (
        <>
            {/*<div css={css`border-bottom:1px solid #dfdfdf; ${FlexBox('', 'space-between', 'center')}`}>*/}
            {/*    <ProfileTitle>내 프로필</ProfileTitle>*/}
            {/*    <EditButton enabled={nicknameCheck} onClick={editNickname}>저장</EditButton>*/}
            {/*</div>*/}
            <ProfileBox>
                <Avartar>
                    <img src={require('../../../assets/img/profile.svg')}/>
                </Avartar>

                <div>
                    <ProfileSection>
                        <Title>닉네임</Title>
                        <>
                            <div css={css`margin-right:1em;`}>
                                <Input type="text" value={nickname}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeNickname(e)}
                                       placeholder="닉네임을 입력해주세요"/>
                                {/*<ErrorMsg visible={nicknameErr.length > 0}>{nicknameErr}</ErrorMsg>*/}
                            </div>
                        </>
                        <EditButton enabled={nicknameCheck} onClick={editNickname}>저장</EditButton>
                    </ProfileSection>
                    <ProfileSection>
                        <Title>이메일</Title>
                        <>
                            <div css={css`margin-right:1em;`}>{email}</div>
                        </>
                    </ProfileSection>
                    <ProfileSection>
                        <Title>소속</Title>
                        <>
                            <div css={css`margin-right:1em;`}>{user && user.school_type===2 ? '고등학교' : '중학교'}</div>
                        </>
                    </ProfileSection>
                    <ProfileSection>
                        <Title>학년</Title>
                        <>
                            <div css={css`margin-right:1em;`}>{user && user.grade}</div>
                        </>
                    </ProfileSection>
                </div>
            </ProfileBox>
            <div>
                <ProfileTitle>비밀번호 변경</ProfileTitle>
                <div css={css`margin-bottom:20px;`}>
                    <Label>현재 비밀번호</Label>
                    <Input type="password" value={currentPassword}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeCurrentPassword(e)}
                           placeholder="현재 비밀번호를 입력해주세요"/>
                    <ErrorMsg visible={currentPasswordErr.length > 0}>{currentPasswordErr}</ErrorMsg>
                </div>
                <div css={css`margin-bottom:20px;`}>
                    <Label>새로운 비밀번호</Label>
                    <Input type="password" value={newPassword}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeNewPassword(e)}
                           placeholder="새로운 비밀번호를 입력해주세요"/>
                    <ErrorMsg visible={newPasswordErr.length > 0}>{newPasswordErr}</ErrorMsg>

                </div>
                <div>
                    <Label>비밀번호 확인</Label>
                    <Input type="password" value={newPasswordConfirm}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeNewPasswordConfirm(e)}
                           placeholder="새로운 비밀번호를 입력해주세요"/>
                    <ErrorMsg visible={newPasswordConfirmErr.length > 0}>{newPasswordConfirmErr}</ErrorMsg>
                </div>
                <div css={css`text-align:center;`}>
                    <Button enabled={currentPasswordCheck && newPasswordCheck && newPasswordConfirmCheck}
                            onClick={editPassword}>패스워드 변경</Button>
                </div>
            </div>

            <div css={css` margin-top:40px; padding:40px 0; text-align: right; border-top:1px solid ${Color.gray100};`}>
                <GrayButton onClick={goWithdrawal}>회원탈퇴</GrayButton>
                <GrayButton onClick={goLogout}>로그아웃</GrayButton>
            </div>

        </>
    )
}
export default Profile;
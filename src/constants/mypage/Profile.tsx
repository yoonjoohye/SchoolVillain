import React, {useEffect, useState} from "react";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import axios from "axios";
import styled from "@emotion/styled";
import {MarkdownBase, MarkdownLg, MarkdownMd, MarkdownSm, MarkdownXl} from "../../../assets/style/Markdown.style";
import {FlexBox, onlyMobile} from "../../../assets/style/Layout.style";
import {ErrorMsg} from "../../../assets/style/Util";
import {media} from "../../../assets/style/Media.style";

const Greeting = styled.div`
    ${MarkdownMd('', 500)};
    //padding: 1em 0;
    //text-align: center;
    margin-bottom:2em;
`
const ProfileTitle = styled.div`
  ${MarkdownMd('', 600)};
  margin-bottom:1em;
`
const ImgBox = styled.div`
  margin-bottom:2em;
  ${FlexBox()};

`
const FakeFileInput = styled.label`
  display:block;
  ${FlexBox()};
  width: 450px;
  height: 200px;
  cursor:pointer;
  border-radius: 1em;
  ${MarkdownLg(Color.gray200, 600)};
  //background-color: ${Color.gray100};
  border:2px dashed ${Color.gray200};
`

const Input = styled.input`
    ${MarkdownBase()};
    width:100%;
    border-radius: 0.5em;
    border:1px solid ${Color.gray100};
    outline:none;
    height:45px;
    padding-left: 1em;
`

const ProfileBox = styled.div`
  padding:3em 0;
  border-top: 1px solid ${Color.gray100};
  ${media.sm`padding:2em 0`}
`

interface buttonProps {
    enabled: boolean;
}

const Button = styled.button`
  padding:0 2em;
  ${MarkdownMd(Color.white)};
  height: 45px;
  border-radius: 0.3em;
  margin-top:30px;
  ${(props: buttonProps) => props.enabled ?
    css`pointer-events:initial;
     background-color:${Color.purple200};
    ` :
    css`pointer-events:none;
     background-color:${Color.purple100};
    `
}
  &:hover{
    background-color: ${Color.purple300};
  }
`

const EditButton = styled.button`
  padding:0 1em;
  height:45px;
  ${MarkdownBase(Color.white)};
  border-radius: 0.3em;
  ${media.sm`margin-left:0;`}

  ${(props: buttonProps) => props.enabled ?
    css`pointer-events:initial;
     background-color:${Color.purple200};
    ` :
    css`pointer-events:none;
     background-color:${Color.purple100};
    `
}
  &:hover{
    background-color: ${Color.purple300};
    }
`

const Label = styled.label`
  display:block;
  ${MarkdownBase(Color.gray200, 500)};
  margin-bottom:0.5em;
  
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
    // const [nickname, setNickname] = useState('');
    // const [nicknameErr, setNicknameErr] = useState('');
    // const [nicknameCheck, setNicknameCheck] = useState(false);
    // const [email, setEmail] = useState('');
    // const [currentPassword, setCurrentPassword] = useState('');
    // const [currentPasswordErr, setCurrentPasswordErr] = useState('');
    // const [currentPasswordCheck, setCurrentPasswordCheck] = useState(false);
    // const [newPassword, setNewPassword] = useState('');
    // const [newPasswordErr, setNewPasswordErr] = useState('');
    // const [newPasswordCheck, setNewPasswordCheck] = useState(false);
    // const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    // const [newPasswordConfirmErr, setNewPasswordConfirmErr] = useState('');
    // const [newPasswordConfirmCheck, setNewPasswordConfirmCheck] = useState(false);


    // const [img, setImg] = useState('');
    // const [preview, setPreview] = useState('');
    //
    // const loadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const {files} = e.target;
    //
    //     if (files[0].size > 2 * 1024 * 1024) {
    //         alert('이미지 사이즈가 2mb를 넘습니다.');
    //     } else {
    //         setImg(files[0]);
    //
    //         let reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPreview(reader.result);
    //         }
    //         reader.readAsDataURL(files[0]);
    //     }
    // }
    // const deleteImg=()=>{
    //     setPreview('');
    //     setImg('');
    // }

    return (
        <section>
            <Greeting>
                <span css={css`color:${Color.yellow200}`}>{email}</span> 님,<br css={css`${onlyMobile()}`}/> 스쿨빌런에 오신 것을
                환영합니다.
            </Greeting>
            {/*<ImgBox>*/}
            {/*    <input css={css`display:none;`} type="file" id="id"*/}
            {/*           onChange={(e: React.ChangeEvent<HTMLInputElement>) => loadImg(e)}*/}
            {/*           accept="image/jpg, image/png, image/jpeg"/>*/}
            {/*    {*/}
            {/*        preview.length > 0 ?*/}
            {/*            <div css={css`position:relative; width:450px; text-align: center;`}>*/}
            {/*                <button css={css`position:absolute`} onClick={deleteImg}>X</button>*/}
            {/*                <img css={css`max-width:100%;`} src={preview}/>*/}
            {/*            </div> :*/}
            {/*            <FakeFileInput htmlFor="id">학생증 인증</FakeFileInput>*/}
            {/*    }*/}
            {/*</ImgBox>*/}

            <ProfileBox>
                <ProfileTitle>빌런 닉네임</ProfileTitle>
                <div
                    css={css`display:grid; grid-template-columns: 85% 15%; ${media.sm`grid-template-columns: 80% 20%;`}`}>
                    <div css={css`margin-right:2em;`}>
                        <Input type="text" value={nickname}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeNickname(e)}
                               placeholder="닉네임을 입력해주세요"/>
                        <ErrorMsg visible={nicknameErr.length > 0}>{nicknameErr}</ErrorMsg>
                    </div>
                    <EditButton enabled={nicknameCheck} onClick={editNickname}>변경</EditButton>
                </div>
            </ProfileBox>

            <ProfileBox>
                <ProfileTitle>빌런 비밀번호</ProfileTitle>
                <div css={css`margin-bottom:1em;`}>
                    <Label>현재 비밀번호</Label>
                    <Input type="password" value={currentPassword}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeCurrentPassword(e)}
                           placeholder="현재 비밀번호를 입력해주세요"/>
                    <ErrorMsg visible={currentPasswordErr.length > 0}>{currentPasswordErr}</ErrorMsg>
                </div>
                <div css={css`margin-bottom:1em;`}>
                    <Label>새로운 비밀번호</Label>
                    <Input type="password" value={newPassword}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeNewPassword(e)}
                           placeholder="새로운 비밀번호를 입력해주세요"/>
                    <ErrorMsg visible={newPasswordErr.length > 0}>{newPasswordErr}</ErrorMsg>

                </div>
                <div>
                    <Label>새로운 비밀번호 확인</Label>
                    <Input type="password" value={newPasswordConfirm}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeNewPasswordConfirm(e)}
                           placeholder="새로운 비밀번호를 입력해주세요"/>
                    <ErrorMsg visible={newPasswordConfirmErr.length > 0}>{newPasswordConfirmErr}</ErrorMsg>
                </div>
                <div css={css`text-align:center;`}>
                    <Button enabled={currentPasswordCheck && newPasswordCheck && newPasswordConfirmCheck}
                            onClick={editPassword}>비밀번호 변경</Button>
                </div>
            </ProfileBox>

            <ProfileBox css={css`margin-top:1em; text-align: right;`}>
                <GrayButton onClick={goWithdrawal}>회원탈퇴</GrayButton>
                <GrayButton onClick={goLogout}>로그아웃</GrayButton>
            </ProfileBox>

        </section>
    )
}
export default Profile;
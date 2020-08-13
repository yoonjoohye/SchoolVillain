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
    //background-color:${Color.yellow100};
    ${MarkdownMd('',500)};
    //padding: 1em 0;
    //text-align: center;
    margin-bottom:2em;
`
const ProfileTitle=styled.div`
  ${MarkdownMd('',600)};
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
  border-bottom:1px solid ${Color.gray100};
  &:nth-of-type(1){
    border-top: 1px solid ${Color.gray100};
  }
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
  ${MarkdownMd(Color.white)};
  margin-left:2em;
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
    background-color: ${Color.purple100};
    }
`

const Label=styled.label`
  display:block;
  ${MarkdownBase(Color.gray200,500)};
  margin-bottom:0.5em;
  
`
const GrayButton=styled.button`
  ${MarkdownSm(Color.gray200)};
  background-color:${Color.gray100};
  //border:1px solid ${Color.gray200};
  padding:0.5em 1em;
  margin-left:1em;
  border-radius: 0.3em;
  &:hover{
    background-color:#e1e1e1;
  }
`

const Profile = () => {
    const [nickname, setNickname] = useState('');
    const [nicknameErr, setNicknameErr] = useState('');
    const [nicknameCheck, setNicknameCheck] = useState(false);
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordErr, setCurrentPasswordErr] = useState('');
    const [currentPasswordCheck, setCurrentPasswordCheck] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordErr, setNewPasswordErr] = useState('');
    const [newPasswordCheck, setNewPasswordCheck] = useState(false);
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [newPasswordConfirmErr, setNewPasswordConfirmErr] = useState('');
    const [newPasswordConfirmCheck, setNewPasswordConfirmCheck] = useState(false);


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


    useEffect(() => {
        UserAPI();
    }, []);
    const UserAPI = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/me'
            });
            // console.log(response);
            if (response.status === 200) {
                setNickname(response.data.name || '익명');
                setNicknameCheck(true);
                setEmail(response.data.email);
            }
        } catch (err) {
            console.error(err);
        }
    }
    const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setNickname(value);
        if (value.length > 0) {
            setNicknameErr('');
            setNicknameCheck(true);
        } else {
            setNicknameErr('닉네임을 입력해주세요.');
            setNicknameCheck(false);
        }
    }
    const changeCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setCurrentPassword(value);

        let PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/i;

        if (!(PasswordRegex.test(value))) {
            setCurrentPasswordErr('숫자와 영문자 및 특수문자를 포함한 8~16자이어야 합니다.');
            setCurrentPasswordCheck(false);
        } else {
            setCurrentPasswordErr('');
            setCurrentPasswordCheck(true);
        }
    }
    const changeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setNewPassword(value);

        let PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/i;

        if (!(PasswordRegex.test(value))) {
            setNewPasswordErr('숫자와 영문자 및 특수문자를 포함한 8~16자이어야 합니다.');
            setNewPasswordCheck(false);
        } else {
            setNewPasswordErr('');
            setNewPasswordCheck(true);
        }
    }
    const changeNewPasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setNewPasswordConfirm(value);

        if (value !== newPassword) {
            setNewPasswordConfirmErr('패스워드가 일치하지 않습니다.');
            setNewPasswordConfirmCheck(false);
        } else {
            setNewPasswordConfirmErr('');
            setNewPasswordConfirmCheck(true);
        }
    }

    const editNickname = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/nickname',
                data: {
                    nickname: nickname
                }
            });
            console.log(response);
            // if (response.status === 201) {
            //     location.reload();
            // }
        } catch (err) {
            if (err.response.status === 422) {
                setNicknameErr('이미 존재하는 닉네임입니다.');
                setNicknameCheck(false);
                console.error(err);
            } else {
                console.error(err);
            }
        }
    }
    const editPassword = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/change/pw',
                data: {
                    new_password: newPassword,
                    current_password: currentPassword
                }
            });
            console.log(response);
            // if (response.status === 201) {
            //     location.reload();
            // }
        } catch (err) {
            if (err.response.status === 422) {
                setCurrentPasswordErr('비밀번호가 일치하지 않습니다.');
                setCurrentPasswordCheck(false);
                console.error(err);
            } else {
                console.error(err);
            }
        }
    }

    const goLogout = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/logout'
            });
            console.log(response);
            if (response.status === 204) {
                location.href = '/';
                sessionStorage.removeItem('logged');
            }
        } catch (err) {
            console.log(err);
        }
    }
    const goWithdrawal = async () => {
        location.href='/withdrawal';
    }

    return (
        <section>
            <Greeting>
                <span css={css`color:${Color.yellow200}`}>{email}</span> 님,<br css={css`${onlyMobile()}`}/> 스쿨빌런에 오신 것을 환영합니다.
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
            <form>
                <ProfileBox>
                    <ProfileTitle>빌런 닉네임</ProfileTitle>
                    <div css={css`display:grid; grid-template-columns: 85% 15%; `}>
                        <div>
                            <Input type="text" value={nickname} onChange={changeNickname} placeholder="닉네임을 입력해주세요"/>
                            <ErrorMsg visible={nicknameErr.length > 0}>{nicknameErr}</ErrorMsg>
                        </div>
                        <EditButton enabled={nicknameCheck} onClick={editNickname}>변경</EditButton>
                    </div>
                </ProfileBox>

                <ProfileBox>
                    <ProfileTitle>빌런 비밀번호</ProfileTitle>
                    <div css={css`margin-bottom:1em;`}>
                        <Label>현재 비밀번호</Label>
                        <Input type="password" value={currentPassword} onChange={changeCurrentPassword}
                               placeholder="현재 비밀번호를 입력해주세요"/>
                        <ErrorMsg visible={currentPasswordErr.length > 0}>{currentPasswordErr}</ErrorMsg>
                    </div>
                    <div css={css`margin-bottom:1em;`}>
                        <Label>새로운 비밀번호</Label>
                        <Input type="password" value={newPassword} onChange={changeNewPassword}
                               placeholder="새로운 비밀번호를 입력해주세요"/>
                        <ErrorMsg visible={newPasswordErr.length > 0}>{newPasswordErr}</ErrorMsg>

                    </div>
                    <div>
                        <Label>새로운 비밀번호 확인</Label>
                        <Input type="password" value={newPasswordConfirm} onChange={changeNewPasswordConfirm}
                               placeholder="새로운 비밀번호를 입력해주세요"/>
                        <ErrorMsg visible={newPasswordConfirmErr.length > 0}>{newPasswordConfirmErr}</ErrorMsg>
                    </div>
                    <div css={css`text-align:center;`}>
                        <Button
                            enabled={currentPasswordCheck && newPasswordCheck && newPasswordConfirmCheck}
                            onClick={editPassword}>비밀번호 변경</Button>
                    </div>
                </ProfileBox>
            </form>
            <div css={css`margin-top:1em; text-align: right;`}>
                <GrayButton onClick={goWithdrawal}>회원탈퇴</GrayButton>
                <GrayButton onClick={goLogout}>로그아웃</GrayButton>
            </div>

        </section>
    )
}
export default Profile;
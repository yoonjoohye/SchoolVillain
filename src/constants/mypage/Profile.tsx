import React, {useState} from "react";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import axios from "axios";
import styled from "@emotion/styled";
import {MarkdownBase, MarkdownLg, MarkdownMd, MarkdownSm, MarkdownXl} from "../../../assets/style/Markdown.style";
import {FlexBox} from "../../../assets/style/Layout.style";

const Greeting = styled.div`
    background-color:${Color.yellow100};
    padding: 1em 0;
    text-align: center;
    border-radius: 3em;
    margin-bottom:2em;
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
  ${MarkdownLg(Color.gray200,600)};
  //background-color: ${Color.gray100};
  border:2px dashed ${Color.gray200};
`

const Input = styled.input`
    ${MarkdownBase()};
    width:100%;
    border:0;
    border-bottom:1px solid ${Color.gray100};
    outline:none;
    padding:10px 0 10px 0;
    margin-bottom:10px;
`

interface buttonProps {
    enabled: boolean;
}

const Button = styled.button`
  ${MarkdownMd(Color.white)};
  width:100%;
  height: 45px;
  border-radius: 3px;
  box-shadow: 0 1.5px 2.5px 0 rgba(0, 0, 0, 0.16);
  margin-top:30px;
  ${(props: buttonProps) => props.enabled ?
    `pointer-events:initial;
     background-color:${Color.purple200};
    ` :
    `pointer-events:none;
     background-color:${Color.purple100};
    `
}
  &:hover{
    background-color: ${Color.purple300};
  }
`


const Profile = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const [img, setImg] = useState('');
    const [preview, setPreview] = useState('');

    const loadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;

        if (files[0].size > 2 * 1024 * 1024) {
            alert('이미지 사이즈가 2mb를 넘습니다.');
        } else {
            setImg(files[0]);

            let reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            }
            reader.readAsDataURL(files[0]);
        }
    }
    const deleteImg=()=>{
        setPreview('');
        setImg('');
    }

    const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setNickname(value);
    }
    const changeCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setCurrentPassword(value);
    }
    const changeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setNewPassword(value);
    }
    const changeNewPasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setNewPasswordConfirm(value);
    }

    const changeInfo = async () => {

    }

    const goLogout = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/logout'
            });
            console.log(response);
            if (response.status === 204) {
                location.href='/';
                sessionStorage.removeItem('logged');
            }
        } catch (err) {
            console.log(err);
        }
    }
    const goWithdrawal = async () => {

    }

    return (
        <section>
            <Greeting>
                <span css={css`color:${Color.yellow200}`}>aaa@naver.com</span> 님, 스쿨빌런에 오신 것을 환영합니다.
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
                <div>
                    <label>닉네임</label>
                    <Input type="text" value={nickname} onChange={changeNickname} placeholder="닉네임 입력"
                           autocomplete="off"/>
                </div>
                <div>
                    <label>이메일</label>
                    <Input type="text" value={email} placeholder="계정 입력" disabled/>
                </div>
                <div>
                    <label>현재 비밀번호</label>
                    <Input type="password" value={currentPassword} onChange={changeCurrentPassword}
                           placeholder="현재 비밀번호 입력" autocomplete="off"/>
                </div>
                <div>
                    <label>새로운 비밀번호</label>
                    <Input type="password" value={newPassword} onChange={changeNewPassword} placeholder="새로운 비밀번호 입력"
                           autocomplete="off"/>
                </div>
                <div>
                    <label>새로운 비밀번호 확인</label>
                    <Input type="password" value={newPasswordConfirm} onChange={changeNewPasswordConfirm}
                           placeholder="새로운 비밀번호 입력" autocomplete="off"/>
                </div>
            </form>

            <Button
                enabled={nickname.length > 0 && currentPassword.length > 0 && newPassword.length > 0 && newPasswordConfirm.length > 0}
                onClick={changeInfo}>회원정보수정</Button>


            <div css={css`margin-top:1em; text-align: center; ${MarkdownSm(Color.gray200)}`}>
                <div onClick={goLogout}>로그아웃</div>
                <div onClick={goWithdrawal}>회원탈퇴</div>
            </div>

        </section>
    )
}
export default Profile;
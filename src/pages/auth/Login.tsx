import React, {useRef, useState} from 'react';
import JoinInput from "../../components/input/JoinInput";
import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Box.style";
import {media} from "../../../assets/style/Media.style";
import {MarkdownBase, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import axios from "axios";
import SEO from "../SEO/SEO";

const LoginSection = styled.section`
  padding:0 15%;
  min-height:100vh;
  ${FlexBox()};
  ${media.sm`padding:0 5%`};
`
const LoginContainer = styled.article`
  width:500px;
  ${media.sm`width:100%;`}
`
const LoginTitle = styled.div`
  ${MarkdownBase(Color.purple200, 600)};
`
type ErrorMsgProps = {
    visible: boolean;
}
const ErrorMsg = styled.div<ErrorMsgProps>`
    ${MarkdownSm(Color.red)};
    visibility: ${(props: ErrorMsgProps) => (props.visible ? 'visible' : 'hidden')};
    margin-bottom:10px;
`
type buttonProps = {
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

const Login = ({history}: any) => {
    const [email, setEmail] = useState('');
    const [emailCheck, setEmailCheck] = useState(false);
    const [emailErr, setEmailErr] = useState('');

    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [passwordErr, setPasswordErr] = useState('');


    const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        setEmail(e.target.value);

        if (!(emailRegex.test(e.target.value))) {
            setEmailErr('이메일 형식에 일치하지 않습니다.');
            setEmailCheck(false);
        } else {
            setEmailErr('');
            setEmailCheck(true);
        }
    }
    const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/i;
        setPassword(e.target.value);

        if (!(PasswordRegex.test(e.target.value))) {
            setPasswordErr('숫자와 영문자 및 특수문자를 포함한 8~16자이어야 합니다.');
            setPasswordCheck(false);
        } else {
            setPasswordErr('');
            setPasswordCheck(true);
        }
    }

    //API
    const goLogin = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: 'https://dev.villain.school/api/user/login',
                data: {
                    email: email,
                    password: password
                },
                headers: {
                    Accept: 'application/json',
                    ContentType: 'application/json'
                }
            });
            if (response.status === 200) {
                // console.log(response);
                let token = response.data.token;
                localStorage.setItem('token', token.split('|')[1]);
                window.location.href = '/';
            }
        } catch (err) {
            if (err.response.status === 422) {
                setEmailCheck(false);
                setEmailErr('존재하지 않는 이메일입니다.');
            } else if (err.response.status === 400) {
                setPasswordCheck(false);
                setPasswordErr('패스워드가 일치하지 않습니다.');
            } else {
                setPasswordCheck(false);
                setPasswordErr('다시 입력해주세요.');
            }
        }
    }

    return (
        <>
            <SEO title="로그인 | 스쿨빌런"
                 description="스쿨빌런 로그인 페이지입니다."
                 keywords="로그인 스쿨빌런 로그인 페이지"
            />
            <LoginSection>
                <LoginContainer>
                    <LoginTitle>E-MAIL</LoginTitle>
                    <JoinInput type="text" value={email} onChange={emailChange} placeholder="이메일을 입력해주세요."/>
                    <ErrorMsg visible={emailErr.length > 0}>{emailErr}</ErrorMsg>

                    <LoginTitle>PASSWORD</LoginTitle>
                    <JoinInput type="password" value={password} onChange={passwordChange} placeholder="패스워드를 입력해주세요."/>
                    <ErrorMsg visible={passwordErr.length > 0}>{passwordErr}</ErrorMsg>

                    <Button enabled={emailCheck && passwordCheck} onClick={goLogin}>로그인</Button>
                </LoginContainer>
            </LoginSection>
        </>
    )
}

export default Login;
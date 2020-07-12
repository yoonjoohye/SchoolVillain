import * as React from 'react';
import JoinInput from "../../components/input/JoinInput";
import {useState} from "react";
import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Box.style";
import {media} from "../../../assets/style/Media.style";
import {MarkdownBase, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";

const LoginSection = styled.section`
  padding:0 10%;
  min-height:100vh;
  ${FlexBox('center', 'center')};
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
const ErrorMsg=styled.div<ErrorMsgProps>`
    ${MarkdownSm(Color.red)};
    visibility: ${(props:ErrorMsgProps)=>(props.visible ? 'visible':'hidden')};
    margin-bottom:10px;
`
type buttonProps = {
    enabled: boolean;
}
const Button=styled.button`
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

const Login = () => {
    const [email, setEmail] = useState('');
    const [emailCheck,setEmailCheck]=useState(false);
    const [emailErr,setEmailErr]=useState('');

    const [password, setPassword] = useState('');
    const [passwordCheck,setPasswordCheck]=useState(false);
    const [passwordErr,setPasswordErr]=useState('');


    const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    //API
    const goLogin=()=>{
        console.log('login');
    }

    return (
        <LoginSection>
            <LoginContainer>
                <LoginTitle>E-MAIL</LoginTitle>
                <JoinInput type="text" value={email} onChange={emailChange} placeholder="이메일을 입력해주세요."/>
                <ErrorMsg visible={emailErr.length>0}>{emailErr}</ErrorMsg>

                <LoginTitle>PASSWORD</LoginTitle>
                <JoinInput type="password" value={password} onChange={passwordChange} placeholder="패스워드를 입력해주세요."/>
                <ErrorMsg visible={passwordErr.length>0}>{passwordErr}</ErrorMsg>

                <Button enabled={emailCheck && passwordCheck} onClick={()=>goLogin}>로그인</Button>
            </LoginContainer>
        </LoginSection>
    )
}

export default Login;
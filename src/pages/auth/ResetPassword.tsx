import JoinInput from "../../components/input/JoinInput";
import React, {useState} from "react";
import JoinButton from "../../components/button/JoinButton";
import styled from "@emotion/styled";
import {FlexBox, Section} from "../../../assets/style/Layout.style";
import {media} from "../../../assets/style/Media.style";
import {MarkdownBase, MarkdownMd} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import {ErrorMsg} from "../../../assets/style/Util";
import {css} from "@emotion/core";
import axios from "axios";

const LoginSection = styled.section`
  ${Section};
  ${FlexBox()};
`
const LoginContainer = styled.article`
  width:500px;
  ${media.sm`width:100%;`}
`
const LoginTitle = styled.div`
  ${MarkdownBase(Color.purple200, 600)};
`

interface buttonProps {
    enabled: boolean;
}

const Button = styled.button`
  ${MarkdownMd(Color.white)};
  width:100%;
  height: 45px;
  border-radius: 0.3em;
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

const ResetPassword = () => {
    //비밀번호
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [passwordErr, setPasswordErr] = useState('');

    //비밀번호 확인
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmCheck, setPasswordConfirmCheck] = useState(false);
    const [passwordConfirmErr, setPasswordConfirmErr] = useState('');


    const changePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        let {value}=e.target

        let PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/i;
        setPassword(value);

        if (!(PasswordRegex.test(value))) {
            setPasswordErr('숫자와 영문자 및 특수문자를 포함한 8~16자이어야 합니다.');
            setPasswordCheck(false);
        } else {
            setPasswordErr('');
            setPasswordCheck(true);
        }
    }
    const changePasswordConfirm = (e:React.ChangeEvent<HTMLInputElement>) => {
        let {value}=e.target

        setPasswordConfirm(value);

        if (value !== password) {
            setPasswordConfirmErr('패스워드가 일치하지 않습니다.');
            setPasswordConfirmCheck(false);
        } else {
            setPasswordConfirmErr('');
            setPasswordConfirmCheck(true);
        }
    }

    const resetPassword=async()=>{
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/reset/pw',
                data: {
                    new_password:passwordConfirm
                }
            });
            console.log(response);
            if (response.status === 201) {
            }
        } catch (err) {
            setPasswordConfirmErr('패스워드를 다시 일력해주세요.');
            setPasswordConfirmCheck(false);
            // console.log(err);
        }
    }
    return (
        <LoginSection>
            <LoginContainer>
                <LoginTitle>PASSWORD</LoginTitle>
                <JoinInput type="password" value={password} onChange={changePassword} placeholder="패스워드를 입력해주세요."/>
                <ErrorMsg css={css`margin-bottom:1em;`} visible={passwordErr.length > 0}>{passwordErr}</ErrorMsg>


                <LoginTitle>PASSWORD CHECK</LoginTitle>
                <JoinInput type="password" value={passwordConfirm} onChange={changePasswordConfirm}
                           placeholder="패스워드를 입력해주세요."/>
                <ErrorMsg visible={passwordConfirmErr.length > 0}>{passwordConfirmErr}</ErrorMsg>

                <Button css={css`margin-bottom:1em;`} enabled={passwordCheck && passwordConfirmCheck} onClick={resetPassword}>재설정하기</Button>
            </LoginContainer>
        </LoginSection>
    )
}
export default ResetPassword;
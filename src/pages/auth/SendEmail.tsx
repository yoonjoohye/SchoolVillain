import JoinInput from "../../components/input/JoinInput";
import React, {useState} from "react";
import styled from "@emotion/styled";
import {FlexBox, Section} from "../../../assets/style/Layout.style";
import {media} from "../../../assets/style/Media.style";
import {MarkdownBase, MarkdownLg, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import {ErrorMsg} from "../../../assets/style/Util";
import axios from "axios";
import {css} from "@emotion/core";
import SEO from "../../templates/SEO/SEO";
import Modal from "../../templates/modal/Modal";

const LoginSection = styled.section`
  ${FlexBox('column')};
  min-height:100vh;
`
const LoginContainer = styled.article`
  width:500px;
  ${media.md`width:400px;`}
  ${media.sm`width:90%;`}
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
const Input = styled.input`
    ${MarkdownMd()};
    width:100%;
    border:0;
    border-bottom:1px solid ${Color.purple200};
    outline:none;
    padding:10px 0 10px 0;
    margin-bottom:10px;
`
const SendEmail = () => {
    const [email, setEmail] = useState('');
    const [emailCheck, setEmailCheck] = useState(false);
    const [emailErr, setEmailErr] = useState('');

    //모달
    const [openModal, setOpenModal] = useState(false);

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        let emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        setEmail(value);

        if (!(emailRegex.test(value))) {
            setEmailErr('이메일 형식에 일치하지 않습니다.');
            setEmailCheck(false);
        } else {
            setEmailErr('');
            setEmailCheck(true);
        }
    }

    const onEnter = (e: React.KeyboardEvent) => {
        if(emailCheck){
            if (e.key === 'Enter') {
                sendEmail();
            }
        }
    }

    const sendEmail = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/forgot',
                data: {
                    email: email
                }
            });
            console.log(response);
            if (response.status === 204) {
                setOpenModal(true);
            }
        } catch (err) {
            if (err.response.status === 422) {
                setEmailErr('입력하신 이메일은 스쿨빌런에 가입된 이메일이 아닙니다.');
                setEmailCheck(false);
            } else {
                console.log(err);
            }
        }
    }
    const confirmModal = () => {
        setOpenModal(false);
        location.href='/';
    }

    return (
        <>
            <SEO title="패스워드 재설정 | 스쿨빌런"
                 description="스쿨빌런 패스워드 재설정 페이지입니다."
                 keywords="스쿨빌런 패스워드 재설정 페이지"
            />
            <LoginSection>
                <LoginContainer>
                    <div css={css`${MarkdownLg(Color.purple200,700)}; margin-bottom:3em; text-align:center;`}>패스워드 재설정</div>

                    <LoginTitle>E-MAIL</LoginTitle>
                    <Input type="text" value={email} onChange={changeEmail} placeholder="이메일을 입력해주세요." onKeyPress={(e: React.KeyboardEvent) => onEnter(e)}/>
                    <ErrorMsg visible={emailErr.length > 0}>{emailErr}</ErrorMsg>
                    <Button enabled={emailCheck} onClick={sendEmail}>이메일 전송</Button>
                    <p css={css`${MarkdownSm(Color.gray200)}; text-align:center;  margin-top:2em;`}>* 가입하신 이메일 주소로 비밀번호
                        재설정 링크가 전송됩니다.</p>
                </LoginContainer>
            </LoginSection>

            <Modal openModal={openModal} confirmModal={confirmModal}
                   title="이메일 전송완료"
                   contents="입력하신 이메일로 패스워드 재설정 링크를 전송했습니다.<br/>
                  help@villain.school에서 보낸메일을 확인해주세요."
                   buttonName="확인"/>

        </>
    )
}
export default SendEmail;
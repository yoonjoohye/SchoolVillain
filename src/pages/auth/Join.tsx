import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {FlexBox, Section} from "../../../assets/style/Layout.style";
import {media} from "../../../assets/style/Media.style";
import Agreement from "../../constants/join/Agreement";
import Email from "../../constants/join/Email";
import Password from "../../constants/join/Password";
import PasswordConfirm from "../../constants/join/PasswordConfirm";
import SEO from "../SEO/SEO";
import ServiceRule from "../../constants/join/ServiceRule";
import PrivacyRule from "../../constants/join/PrivacyRule";
import axios from 'axios';

const JoinSection = styled.section`
  ${Section};
  ${FlexBox()};
`
const JoinContainer = styled.article`
  min-width:500px;
  ${media.sm`min-width:100%;`}
`

const Join: React.FC = ({match, history}: any) => {
    let joinComponent;
    //동의
    const [age, setAge] = useState(false);
    const [agree, setAgree] = useState(false);
    const [agreementCheck, setAgreementCheck] = useState(false);
    const [agreementErr, setAgreementErr] = useState('');

    //이메일
    const [email, setEmail] = useState('');
    const [emailCheck, setEmailCheck] = useState(false);
    const [emailErr, setEmailErr] = useState('');

    //비밀번호
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [passwordErr, setPasswordErr] = useState('');

    //비밀번호 확인
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmCheck, setPasswordConfirmCheck] = useState(false);
    const [passwordConfirmErr, setPasswordConfirmErr] = useState('');

    const [page, setPage] = useState(match.params.id);

    useEffect(() => {
        setPage(match.params.id);
    }, [match]);

    // 유효성 검사
    const checkedAgreement = (age: boolean, agree: boolean) => {
        setAge(age);
        setAgree(agree);
        setAgreementCheck(age && agree);
    }
    const changeEmail = (email: string) => {
        let emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        setEmail(email);

        if (!(emailRegex.test(email))) {
            setEmailErr('이메일 형식에 일치하지 않습니다.');
            setEmailCheck(false);
        } else {
            setEmailErr('');
            setEmailCheck(true);
        }
    }
    const changePassword = (password: string) => {
        let PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/i;
        setPassword(password);

        if (!(PasswordRegex.test(password))) {
            setPasswordErr('숫자와 영문자 및 특수문자를 포함한 8~16자이어야 합니다.');
            setPasswordCheck(false);
        } else {
            setPasswordErr('');
            setPasswordCheck(true);
        }
    }
    const changePasswordConfirm = (passwordConfirm: string) => {
        setPasswordConfirm(passwordConfirm);

        if (passwordConfirm !== password) {
            setPasswordConfirmErr('패스워드가 일치하지 않습니다.');
            setPasswordConfirmCheck(false);
        } else {
            setPasswordConfirmErr('');
            setPasswordConfirmCheck(true);
        }
    }


    //api 통신
    const goAgreement = () => {
        history.push('/join/email');
    }
    const goEmail = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: 'https://dev.villain.school/api/user/email/check',
                data: {
                    email: email
                },
                // headers: {
                //     Accept: 'application/json',
                //     ContentType: 'application/json'
                // }
            });
            if (response.status === 200) {
                //console.log(response);
                history.push('/join/password');
            }
        } catch (err) {
            if (err.response.status === 422) {
                setEmailCheck(false);
                setEmailErr('이미 존재하는 이메일입니다.');
            } else {
                setEmailCheck(false);
                setEmailErr('다시 입력해주세요.');
            }
        }
    }
    const goPassword = () => {
        history.push('/join/confirm');
    }
    const goPasswordConfirm = async() => {
        try {
            let csrf = await axios({
                method: 'GET',
                url: 'https://dev.villain.school/sanctum/csrf-cookie'
            });
            if(csrf.status===204) {
                let response = await axios({
                    method: 'POST',
                    url: 'https://dev.villain.school/api/user/register',
                    data: {
                        email: email,
                        password: passwordConfirm
                    }
                });
                if (response.status === 200) {
                    let token = response.data.token;
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    localStorage.setItem('token', token.split('|')[1]);
                    window.location.href = '/';
                }
            }
        } catch (err) {
            if (err.response.status === 422) {
                setEmailCheck(false);
                setEmailErr('이메일을 다시 입력해주세요.');
                history.push('/join/email');
            } else {
                setAgreementCheck(false);
                setAgreementErr('다시 입력해주세요.');
                history.push('/join/agreement');
            }
        }
    }

    if (page === 'agreement') {
        joinComponent = <Agreement goJoin={goAgreement} age={age} agree={agree} checkedAgreement={checkedAgreement} err={agreementErr}
                                   enabled={agreementCheck}/>;
    } else if (page === 'service-rule') {
        joinComponent = <ServiceRule/>;
    } else if (page === 'privacy-rule') {
        joinComponent = <PrivacyRule/>;
    } else if (page === 'email') {
        joinComponent =
            <Email goJoin={goEmail} email={email} changeEmail={changeEmail} err={emailErr} enabled={emailCheck}/>;
    } else if (page === 'password') {
        joinComponent =
            <Password goJoin={goPassword} password={password} changePassword={changePassword} err={passwordErr}
                      enabled={passwordCheck}/>;
    } else if (page === 'confirm') {
        joinComponent = <PasswordConfirm goJoin={goPasswordConfirm} password={passwordConfirm}
                                         changePasswordConfirm={changePasswordConfirm} err={passwordConfirmErr}
                                         enabled={passwordConfirmCheck}/>;
    }

    return (
        <>
            <SEO title="회원가입 | 스쿨빌런"
                 description="스쿨빌런 회원가입 페이지입니다."
                 keywords="회원가입 스쿨빌런 가입페이지"
            />
            <JoinSection>
                <JoinContainer>
                    {joinComponent}
                </JoinContainer>
            </JoinSection>
        </>
    )
}
export default Join;

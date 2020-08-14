import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {FlexBox, Section} from "../../../assets/style/Layout.style";
import {media} from "../../../assets/style/Media.style";
import Agreement from "../../constants/join/Agreement";
import School from "../../constants/join/School";
import Email from "../../constants/join/Email";
import Password from "../../constants/join/Password";
import PasswordConfirm from "../../constants/join/PasswordConfirm";
import SEO from "../SEO/SEO";
import ServiceRule from "../../constants/join/ServiceRule";
import PrivacyRule from "../../constants/join/PrivacyRule";
import axios from 'axios';
import {Color} from "../../../assets/style/Color.style";

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

    //학교
    const [school, setSchool] = useState('');
    const [grade, setGrade] = useState('');
    const [schoolCheck, setSchoolCheck] = useState(false);
    const [schoolErr, setSchoolErr] = useState('');

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
    const selectSchool = (e:React.ChangeEvent<HTMLSelectElement>) => {
        let {value}=e.target;

        setSchool(value);

        if(value!=='' && grade!==''){
            setSchoolCheck(true);
            setSchoolErr('');

        } else{
            setSchoolCheck(false);
            setSchoolErr('학교와 학년을 선택해주세요.');
        }
    }
    const selectGrade = (e:React.ChangeEvent<HTMLSelectElement>) => {
        let {value}=e.target;

        setGrade(value);

        if(value!=='' && school!==''){
            setSchoolCheck(true);
            setSchoolErr('');

        } else{
            setSchoolCheck(false);
            setSchoolErr('학교와 학년을 선택해주세요.');
        }
    }

    const changeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        let {value}=e.target
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



    //api 통신
    const goAgreement = () => {
        history.push('/join/school');
    }
    const goSchool=()=>{
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
    const goPasswordConfirm = async () => {
        try {
            let csrf = await axios({
                method: 'GET',
                url: '/sanctum/csrf-cookie'
            });
            if (csrf.status === 204) {
                let response = await axios({
                    method: 'POST',
                    url: '/register',
                    data: {
                        email: email,
                        password: passwordConfirm,
                        school_type:school,
                        grade:grade
                    }
                });
                console.log(response);
                if (response.status === 200) {
                    sessionStorage.setItem('logged', true);
                    window.location.href = '/';
                }
            }
        } catch (err) {
            console.log(err.response);
            if (err.response.status === 422) {
                if(err.response.data.errors.grade || err.response.data.errors.school_type){
                    setSchoolCheck(false);
                    setSchoolErr('학교와 학년을 다시 선택해주세요.');
                    history.push('/join/school');
                }
                if(err.response.data.erros.email){
                    setEmailCheck(false);
                    setEmailErr('이메일을 다시 입력해주세요.');
                    history.push('/join/email');
                }
            } else {
                setAgreementCheck(false);
                setAgreementErr('다시 입력해주세요.');
                history.push('/join/agreement');
            }
        }
    }

    if (page === 'agreement') {
        joinComponent = <Agreement goJoin={goAgreement} age={age} agree={agree} checkedAgreement={checkedAgreement}
                                   err={agreementErr}
                                   enabled={agreementCheck}/>;
    } else if (page === 'service-rule') {
        joinComponent = <ServiceRule/>;
    } else if (page === 'privacy-rule') {
        joinComponent = <PrivacyRule/>;
    } else if(page==='school'){
        joinComponent = <School goJoin={goSchool} school={school} grade={grade} selectSchool={selectSchool} selectGrade={selectGrade}
            err={schoolErr} enabled={schoolCheck}/>;
    }
    else if (page === 'email') {
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

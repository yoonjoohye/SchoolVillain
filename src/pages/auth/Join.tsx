import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Box.style";
import {media} from "../../../assets/style/Media.style";
import Agreement from "../../constants/join/Agreement";
import Email from "../../constants/join/Email";
import Password from "../../constants/join/Password";
import PasswordConfirm from "../../constants/join/PasswordConfirm";
import SEO from "../../constants/SEO/SEO";

const JoinSection = styled.section`
  padding:0 10%;
  min-height:100vh;
  ${FlexBox()};
  ${media.sm`padding:0 5%`};
`
const JoinContainer = styled.article`
  width:500px;
  ${media.sm`width:100%;`}
`

const Join: React.FC = ({match}: any) => {
    let joinComponent;
    //동의
    const [age,setAge]=useState(false);
    const [agree,setAgree]=useState(false);
    const [agreementCheck, setAgreementCheck]=useState(false);

    //이메일
    const [email,setEmail]=useState('');
    const [emailCheck,setEmailCheck]=useState(false);
    const [emailErr,setEmailErr]=useState('');

    //비밀번호
    const [password,setPassword]=useState('');
    const [passwordCheck,setpPsswordCheck]=useState(false);
    const [passwordErr,setPasswordErr]=useState('');

    //비밀호 확인
    const [passwordConfirm,setPasswordConfirm]=useState('');
    const [passwordConfirmCheck,setpPsswordConfirmCheck]=useState(false);
    const [passwordConfirmErr,setPasswordConfirmErr]=useState('');

    const [page,setPage]=useState(match.params.id);

    useEffect(()=>{
        setPage(match.params.id);
    },[match]);

    // 유효성 검사
    const checkedAgreement=(age:boolean,agree:boolean):void=>{
        setAge(age);
        setAgree(agree);
        setAgreementCheck(age&&agree);
    }

    const changeEmail=(email:string)=>{
        let emailTest = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        setEmail(email);

        //정규식
        if(!(emailTest.test(email))){
            setEmailErr('이메일을 정확히 입력해주세요.');
            setEmailCheck(false);
        } else{
            setEmailErr('');
            setEmailCheck(true);
        }
    }
    const changePassword=(password:string)=>{

    }
    const changePasswordConfirm=(passwordCheck:string)=>{

    }


    //api 통신
    const goAgreement=()=>{
        window.history.pushState('', '', `/join/email`);
    }
    const goEmail=()=>{
        window.history.pushState('', '', `/join/password`);
        //api 통신
    }
    const goPassword=()=>{
        window.history.pushState('', '', `/join/confirm`);
        //api 통신
    }
    const goPasswordConfirm=()=>{
        window.location.href='/';
        //api 통신
    }

    if (page === 'agreement') {
        joinComponent = <Agreement goJoin={goAgreement} checkedAgreement={checkedAgreement} enabled={agreementCheck}/>;
    }
    else if (page === 'email') {
        joinComponent = <Email goJoin={goEmail} changeEmail={changeEmail} err={emailErr} enabled={emailCheck}/>;
    }
    else if (page === 'password') {
        joinComponent = <Password goJoin={goPassword} changePassword={changePassword} err={passwordErr} enabled={passwordCheck}/>;
    } else if(page==='confirm'){
        joinComponent = <PasswordConfirm goJoin={goPasswordConfirm} changePasswordConfirm={changePasswordConfirm} err={passwordConfirmErr} enabled={passwordConfirmCheck}/>;
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

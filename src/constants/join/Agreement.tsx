import React,{useState} from 'react';
import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Box.style";

const AgreeLink = styled.li`
  ${FlexBox()};
`
const AgreementTitle = styled.div`
  width:100%;
  text-align:center;
`
const AgreementIcon = styled.span`
  text-align:right;
  min-width: fit-content;
`

const Agreement:React.FC=()=>{
    const [age, setAge] = useState(false);
    const [agree, setAgree] = useState(false);

    const ageChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(!age);
        console.log(age);
    }
    const agreeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgree(!agree);
        console.log(agree);
    }
    return(
        <>
            <div>
                약관동의
            </div>
            <div>
                <div>
                    <input type="checkbox" id="a" checked={age} onChange={ageChecked}/>
                    <label htmlFor="a">만 14세 이상입니다.</label>
                </div>
                <div>
                    <input type="checkbox" id="b" checked={agree} onChange={agreeChecked}/>
                    <label htmlFor="b">스쿨빌런 이용 약관 전체 동의</label>
                    <AgreeLink>
                        <AgreementTitle>스쿨빌런 이용 약관 1</AgreementTitle>
                        <AgreementIcon> &gt; </AgreementIcon>
                    </AgreeLink>

                    <AgreeLink>
                        <AgreementTitle>스쿨빌런 이용 약관 2</AgreementTitle>
                        <AgreementIcon> &gt; </AgreementIcon>
                    </AgreeLink>

                    <AgreeLink>
                        <AgreementTitle>스쿨빌런 이용 약관 3</AgreementTitle>
                        <AgreementIcon> &gt; </AgreementIcon>
                    </AgreeLink>
                </div>
            </div>
        </>
    )
}
export default Agreement;
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Box.style";
import JoinButton from "../../components/button/JoinButton";
import {MarkdownBase, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";

const JoinTitle = styled.div`
  ${MarkdownMd(Color.purple200, 600)};
`
const AgreementSection = styled.section`
  margin-bottom:30px;
`
type AgreementContainerProps = {
    border?: number;
}
const AgreementContainer = styled.section`
  padding:15px 0 15px 0;
  border-bottom:${(props: AgreementContainerProps) => (props.border || 0)}px solid ${Color.purple200};
`
const AgreementLabel = styled.label`
  cursor: pointer;
  ${FlexBox('space-between', 'center')};
`
const CheckBox = styled.input`
  display: none;
`
type FakeCheckBoxProps = {
    checked: boolean;
}
const FakeCheckBox = styled.div`
  ${MarkdownBase(Color.white)};
  border-radius:50%;
  background-color: ${(props: FakeCheckBoxProps) => (props.checked ? Color.purple200 : Color.purple100)};
  width:40px;
  height:40px;
  text-align: center;
  &::before{
    content: '✔';
    position: relative;
    top: 10px;
  }
`
const AgreementList = styled.div`
  display: flex;
  flex-direction: column;
  width:85%;
`
const AgreementTitle = styled.div`
  ${MarkdownMd()};
  width:85%;

`
const AgreementContent = styled.div`
  ${FlexBox('space-between')};
  ${MarkdownBase(Color.gray200)};
  margin-bottom:10px;
`
interface propsType {
    goJoin: any;
    checkedAgreement:any;
    enabled:boolean;
}

const Agreement: React.FC<propsType> = ({goJoin, checkedAgreement,enabled}) => {
    const [age, setAge] = useState(false);
    const [agree, setAgree] = useState(false);

    useEffect(()=>{
        checkedAgreement(age,agree);
    },[age,agree]);

    const ageChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(!age);
    }
    const agreeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgree(!agree);
    }
    return (
        <>
            <JoinTitle>약관동의</JoinTitle>
                <AgreementContainer border={1}>
                    <AgreementLabel htmlFor="a">
                        <div>
                            <CheckBox type="checkbox" id="a" checked={age} onChange={ageChecked}/>
                            <FakeCheckBox checked={age}/>
                        </div>
                        <AgreementTitle>저는 만 14세 이상입니다.</AgreementTitle>
                    </AgreementLabel>
                </AgreementContainer>

                <AgreementContainer>
                    <AgreementLabel htmlFor="b">
                        <div>
                            <CheckBox type="checkbox" id="b" checked={agree} onChange={agreeChecked}/>
                            <FakeCheckBox checked={agree}/>
                        </div>
                        <AgreementTitle>전체 동의합니다.</AgreementTitle>
                    </AgreementLabel>
                </AgreementContainer>

                <AgreementLabel>
                    <div></div>
                    <AgreementList>
                        <Link to="/service-rule">
                            <AgreementContent>
                                <div>스쿨빌런 이용 약관</div>
                                <div> &gt; </div>
                            </AgreementContent>
                        </Link>

                        <Link to="/privacy-rule">
                            <AgreementContent>
                                <div>스쿨빌런 개인정보 처리 방침</div>
                                <div> &gt; </div>
                            </AgreementContent>
                        </Link>
                    </AgreementList>
                </AgreementLabel>
            <JoinButton goJoin={goJoin} enabled={enabled}/>
        </>
    )
}
export default Agreement;
import styled from "@emotion/styled";
import {MarkdownBase, MarkdownMd} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import React, {useState} from "react";
import {FlexBox, Section} from "../../../assets/style/Layout.style";

const AgreementSection = styled.section`
  ${Section()};
  margin-top:6em;
`
const AgreementContainer = styled.div`
  padding:3em 0;
  border-bottom:1px solid ${Color.gray100};
  &:nth-last-of-type(1){
    border-bottom:0;
  }
`
const AgreementLabel = styled.label`
  cursor: pointer;
  ${FlexBox('', '', 'center')};
`
const AgreementTitle = styled.div`
  ${MarkdownMd()};
  width:85%;
`
const CheckBox = styled.input`
  display: none;
`
const AgreementList = styled.li`
  margin-bottom:3em;
  &:nth-last-of-type(1){
    margin-bottom:0;
  }
  &::before{
    color:${Color.purple200};
    content: '✔';
    margin-right:1em;
  }
`
type FakeCheckBoxProps = {
    checked: boolean;
}
const FakeCheckBox = styled.div`
  ${MarkdownBase(Color.white)};
  border-radius:50%;
  background-color: ${(props: FakeCheckBoxProps) => (props.checked ? Color.purple200 : Color.purple100)};
  width:30px;
  height:30px;
  text-align: center;
  &::before{
    content: '✔';
    position: relative;
    top: 3px;
  }
`

const Button = styled.div`
  
`
const Withdrawal = () => {
    const [agree, setAgree] = useState(false);
    const CheckedAgree = () => {
        setAgree(!agree);
    }
    return (
        <AgreementSection>
            <AgreementContainer>회원탈퇴</AgreementContainer>

            <AgreementContainer>
                <AgreementList>해당 계정은 탈퇴할 경우 복구가 불가능합니다.</AgreementList>
                <AgreementList>회원정보는 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다.</AgreementList>
                <AgreementList>작성한 게시글 및 댓글은 자동으로 삭제되지 않으니, 반드시 탈퇴 전 비공개 또는 삭제하시기 바랍니다.</AgreementList>
                <AgreementList>탈퇴 후 회원정보가 삭제되어 본인 여부를 확인할 수 없으니 게시글을 임의로 삭제해드릴 수 없습니다.</AgreementList>
            </AgreementContainer>

            <AgreementContainer>
                <AgreementLabel htmlFor="b">
                    <div>
                        <CheckBox type="checkbox" id="b" checked={agree} onChange={CheckedAgree}/>
                        <FakeCheckBox checked={agree}/>
                    </div>
                    <AgreementTitle>안내 사항을 모두 확인하였으며, 이에 동의합니다.</AgreementTitle>
                </AgreementLabel>
            </AgreementContainer>

            <AgreementContainer>
                <Button>탈퇴하기</Button>
            </AgreementContainer>
        </AgreementSection>
    )
}
export default Withdrawal;
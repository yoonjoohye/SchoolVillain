import React, {useState} from "react";
import JoinButton from "../../components/button/JoinButton";
import styled from "@emotion/styled";
import {MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";

const JoinTitle = styled.div`
  ${MarkdownMd(Color.purple200, 600)};
`
const JoinInput = styled.input`
    ${MarkdownMd()};
    width:100%;
    border:0;
    border-bottom:1px solid ${Color.purple200};
    outline:none;
    padding:10px 0 10px 0;
    margin-bottom:10px;
`
type ErrorMsgProps = {
    visible: boolean;
}
const ErrorMsg=styled.div<ErrorMsgProps>`
    ${MarkdownSm(Color.red)};
    visibility: ${(props:ErrorMsgProps)=>(props.visible ? 'visible':'hidden')};
`

interface propsType {
    goJoin: any;
}

const PasswordCheck: React.FC<propsType> = ({goJoin}) => {
    const [password, setPassword] = useState('');
    const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    return (
        <>
            <JoinTitle>PASSWORD CHECK</JoinTitle>
            <JoinInput type="password" value={password} onChange={passwordChange} placeholder="패스워드를 입력해주세요."/>
            <ErrorMsg visible={true}>이상한 패스워드!</ErrorMsg>
            <JoinButton goJoin={goJoin} value={password}/>
        </>
    )
}
export default PasswordCheck;
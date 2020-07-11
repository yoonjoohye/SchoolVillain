import React, {useState} from "react";
import JoinButton from "../../components/button/JoinButton";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownSm, MarkdownMd} from "../../../assets/style/Markdown.style";


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
    changeEmail:any;
    err:any;
    enabled:any;
}
const Email: React.FC<propsType> = ({goJoin,changeEmail,err,enabled}) => {
    const [email, setEmail] = useState('');

    const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        changeEmail(e.target.value);
    }
    return (
        <>
            <JoinTitle>E-MAIL</JoinTitle>
            <JoinInput type="text" value={email} onChange={emailChange} placeholder="이메일을 입력해주세요."/>
            <ErrorMsg visible={err.length>0}>{err}</ErrorMsg>
            <JoinButton goJoin={goJoin} enabled={enabled}/>
        </>
    )
}
export default Email;
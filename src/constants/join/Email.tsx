import React, {useState} from "react";
import JoinButton from "../../components/button/JoinButton";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownSm, MarkdownBase} from "../../../assets/style/Markdown.style";
import JoinInput from "../../components/input/JoinInput";


const JoinTitle = styled.div`
   ${MarkdownBase(Color.purple200, 600)};
`
interface ErrorMsgProps {
    visible: boolean;
}
const ErrorMsg=styled.div<ErrorMsgProps>`
    ${MarkdownSm(Color.red)};
    visibility: ${(props:ErrorMsgProps)=>(props.visible ? 'visible':'hidden')};
`

interface propsType {
    goJoin: any;
    email:string;
    changeEmail:any;
    err:string;
    enabled:any;
}
const Email: React.FC<propsType> = ({goJoin,email,changeEmail,err,enabled}) => {
    const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
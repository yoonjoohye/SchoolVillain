import React, {useState} from "react";
import JoinButton from "../../components/button/JoinButton";
import styled from "@emotion/styled";
import {MarkdownBase, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import JoinInput from "../../components/input/JoinInput";

const JoinTitle = styled.div`
    ${MarkdownBase(Color.purple200, 600)};
`
type ErrorMsgProps = {
    visible: boolean;
}
const ErrorMsg=styled.div<ErrorMsgProps>`
    ${MarkdownSm(Color.red)};
    visibility: ${(props:ErrorMsgProps)=>(props.visible ? 'visible':'hidden')};
`
interface propsType{
    goJoin:any;
    password:string;
    changePassword:any;
    err:string;
    enabled:boolean;
}
const Password:React.FC<propsType>=({goJoin,password,changePassword,err,enabled})=>{
    const passwordChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        changePassword(e.target.value);
    }
    return(
        <>
            <JoinTitle>PASSWORD</JoinTitle>
            <JoinInput type="password" value={password} onChange={passwordChange} placeholder="패스워드를 입력해주세요."/>
            <ErrorMsg visible={err.length>0}>{err}</ErrorMsg>
            <JoinButton goJoin={goJoin} enabled={enabled}/>
        </>
    )
}
export default Password;
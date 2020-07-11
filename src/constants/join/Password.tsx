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
interface propsType{
    goJoin:any;
    changePassword:any;
    err:string;
    enabled:boolean;
}
const Password:React.FC<propsType>=({goJoin,changePassword,err,enabled})=>{
    const [password,setPassword]=useState('');

    const passwordChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
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
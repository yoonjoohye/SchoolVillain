import React, {useState} from "react";
import JoinButton from "../../components/button/JoinButton";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownSm, MarkdownBase} from "../../../assets/style/Markdown.style";
import JoinInput from "../../components/input/JoinInput";
import {ErrorMsg} from "../../../assets/style/Util";


const JoinTitle = styled.div`
   ${MarkdownBase(Color.purple200, 600)};
`

interface propsType {
    goJoin: any;
    email:string;
    changeEmail:any;
    err:string;
    enabled:any;
}
const Email: React.FC<propsType> = ({goJoin,email,changeEmail,err,enabled}) => {
    return (
        <>
            <JoinTitle>E-MAIL</JoinTitle>
            <JoinInput type="text" value={email} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>changeEmail(e)} placeholder="이메일을 입력해주세요."/>
            <ErrorMsg visible={err.length>0}>{err}</ErrorMsg>
            <JoinButton goJoin={goJoin} enabled={enabled} name="다음"/>
        </>
    )
}
export default Email;
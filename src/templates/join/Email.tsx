import React, {useState} from "react";
import JoinButton from "../../components/button/JoinButton";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownSm, MarkdownBase} from "../../../assets/style/Markdown.style";
import JoinInput from "../../components/input/JoinInput";
import {ErrorMsg} from "../../../assets/style/Util";
import {css} from "@emotion/core";
import {HalfGrid} from "../../../assets/style/Layout.style";


const JoinTitle = styled.div`
   ${MarkdownBase(Color.purple200, 600)};
`

interface propsType {
    goPrev:any;
    goNext:any
    email:string;
    changeEmail:any;
    err:string;
    enabled:any;
    history:History;
}
const Email: React.FC<propsType> = ({goPrev, goNext,email,changeEmail,err,enabled,history}) => {
    return (
        <>
            <JoinTitle>E-MAIL</JoinTitle>
            <JoinInput type="text" value={email} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>changeEmail(e)} placeholder="이메일을 입력해주세요."/>
            <ErrorMsg visible={err.length>0}>{err}</ErrorMsg>
            <HalfGrid>
                <JoinButton goPage={goPrev} isEmpty={true} enabled={true} name="이전" />
                <JoinButton goPage={goNext} enabled={enabled} name="다음"/>
            </HalfGrid>
        </>
    )
}
export default Email;
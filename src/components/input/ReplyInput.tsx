import React, {useState} from "react";
import styled from "@emotion/styled";
import {MarkdownSm} from "../../../assets/style/Markdown.style";

const Input = styled.textarea`
    ${MarkdownSm()};
    width:100%;
    background-color:transparent;
    border:0;
    resize:none;
    outline:none;
    overflow:visible;
`

interface propsType {
    value: string;
    onChange: any;
    placeholder: string;
}

const ReplyInput: React.FC<propsType> = ({value, onChange, placeholder}) => {
    return (
        <Input rows={1} value={value} onChange={onChange} placeholder={placeholder}></Input>
    )
}
export default ReplyInput;
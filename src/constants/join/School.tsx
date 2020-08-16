import React, {useState} from "react";
import JoinButton from "../../components/button/JoinButton";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownSm, MarkdownBase} from "../../../assets/style/Markdown.style";
import {ErrorMsg} from "../../../assets/style/Util";


const JoinTitle = styled.div`
   ${MarkdownBase(Color.purple200, 600)};
`
const SelectBox = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
  padding:1em 0;
`
const Select = styled.select`
  padding:1em;
  border:1px solid ${Color.gray100};
  color:${Color.gray200};
  border-radius: 0.3em;
  -webkit-appearance: none;  
  -moz-appearance: none; 
  appearance: none; 
  &::-ms-expand { display: none; }
  background: url(${require('../../../assets/img/icon/arrow-bottom.svg')}); 
  background-position: calc( 100% - 1em );
  background-size:5%;
  background-repeat: no-repeat;
  
  &:disabled{
    color:${Color.gray100};
  }

`
const Option = styled.option`
  
  
`

interface propsType {
    goJoin: any;
    school: string;
    grade: string;
    selectSchool: any;
    selectGrade: any;
    err: string;
    enabled: any;
}

const School: React.FC<propsType> = ({goJoin, school, grade, selectSchool, selectGrade, err, enabled}) => {

    return (
        <>
            <JoinTitle>School & Grade</JoinTitle>
            <SelectBox>
                <Select value={school} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectSchool(e)}>
                    <Option value="" selected disabled>학교를 선택해주세요.</Option>
                    <Option value="1">중학교</Option>
                    <Option value="2">고등학교</Option>
                </Select>

                <Select value={grade} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectGrade(e)}>
                    <Option value="" selected disabled>학년을 선택해주세요.</Option>
                    <Option value="1">1학년</Option>
                    <Option value="2">2학년</Option>
                    <Option value="3">3학년</Option>
                </Select>
            </SelectBox>
            <ErrorMsg visible={err.length > 0}>{err}</ErrorMsg>
            <JoinButton goJoin={goJoin} enabled={enabled} name="다음"/>
        </>
    )
}
export default School;
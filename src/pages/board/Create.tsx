import React, {useState} from 'react';
import SEO from "../SEO/SEO";
import Write from "../../constants/board/Write";
import styled from "@emotion/styled";
import {Section} from "../../../assets/style/Layout.style";

const CreateSection=styled.section`
  ${Section};
  margin-top:6em;
`
const Create = () => {

    return (
        <>
            <SEO title="작성페이지 | 스쿨빌런"
                 description="스쿨빌런 게시물 작성 페이지입니다."
                 keywords="스쿨빌런 게시물 작성 페이지"/>
            <CreateSection>
                <Write/>
            </CreateSection>
        </>

    )
}

export default Create;
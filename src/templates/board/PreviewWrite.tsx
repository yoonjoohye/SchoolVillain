import {css} from "@emotion/core";
import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox} from "../../../assets/style/Layout.style";
import Write from "../../pages/board/Write";
import {Cursor, TypingMobile, TypingPc} from "../../../assets/style/Animate.style";
import produce from "immer";
import {media} from "../../../assets/style/Media.style";
import {MarkdownMd} from "../../../assets/style/Markdown.style";

const WriteSection = styled.section`
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  padding:2em;
  border-radius: 0.3em;
  border-left: 10px solid ${Color.purple200};
  ${media.sm`border-left:0; border-top:10px solid ${Color.purple200}; padding:1.8em 5%;`}
`
const WriteContainer = styled.div`
  // ${FlexBox('', 'flex-start', 'center')};
  cursor:text; 
  padding:1em; 
  border-radius: 0.5em; 
  &:hover{background-color:#e1e1e1;} 
  background-color:${Color.gray100};
  color:${Color.gray200};
  // &:hover{
  //   background-color:${Color.purple100};
  // }
`

const WriteTxt=styled.span`
  overflow: hidden; 
  border-right: 2px solid ${Color.gray200};
  white-space: nowrap;
  animation: ${Cursor} .5s step-end infinite, ${TypingPc} 3s steps(20, end) infinite ;
  ${media.sm`
    animation: ${TypingMobile} 3s steps(20, end) infinite,${Cursor} .5s step-end infinite ;
  `}
`
const PreviewWrite = () => {
    const [writeModal, setWriteModal] = useState(false);
    const goWrite = () => {
        if(sessionStorage.getItem('logged')) {
            if (window.screen.width > 480) {
                setWriteModal(true);
            } else {
                window.location.href='/write';
            }
        }else{
            window.location.href='/login';
        }
    }
    const isOpen = (open: boolean) => {
        setWriteModal(open);
    }
    return (
        <>
            {
                writeModal && <Write isOpen={isOpen}/>
            }
            <WriteSection onClick={goWrite}>

                <div css={css`${FlexBox('', 'flex-start', 'center')}; margin-bottom:1em;`}>
                    <img css={css`width:2em; height:2em; margin-right: 0.8em;`} src={require('../../../assets/img/icon/edit.svg')}/>
                    <div css={css`${MarkdownMd(Color.purple200,500)}`}>오늘 무슨 일이 있으셨나요?</div>
                </div>
                <WriteContainer>
                    <WriteTxt>무슨 일이 있었는지 자세하게 알려주세요.</WriteTxt>
                </WriteContainer>
            </WriteSection>

        </>
    )
}

export default PreviewWrite;
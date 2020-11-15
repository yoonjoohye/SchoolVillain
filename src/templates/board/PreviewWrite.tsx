import {css} from "@emotion/core";
import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox, onlyPc} from "../../../assets/style/Layout.style";
import Write from "../../pages/board/Write";
import {Cursor, TypingMobile, TypingPc} from "../../../assets/style/Animate.style";
import {media} from "../../../assets/style/Media.style";
import {MarkdownMd, MarkdownSm, MarkdownXl} from "../../../assets/style/Markdown.style";
import {useDispatch, useSelector} from "react-redux";

const WriteSection = styled.section`
  //box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  padding:2em;
  //border-radius: 0.3em;
  //border:1px solid ${Color.gray100};
  ${media.sm`padding:1.8em 5%;`}
  //&:hover{
  //  background-color:#f5f5f5;
  //}
`
const WriteContainer = styled.div`
  // ${FlexBox('', 'flex-start', 'center')};
  cursor:text; 
  //box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  width:750px;
  ${media.md`width:90%;`};
  border-radius: 0.5em; 
  background-color: ${Color.white};
  //border: 1px solid ${Color.gray100};
  color: ${Color.gray150};
`

const WriteTxt = styled.span`
  overflow: hidden; 
  border-left: 1px solid ${Color.gray200};
  white-space: nowrap;
  animation: ${Cursor} 1s step-end infinite, ${TypingPc} 3s steps(20, end) infinite ;
  ${media.sm`
    animation: ${TypingMobile} 3s steps(20, end) infinite,${Cursor} 1s step-end infinite ;
  `}
`
const PreviewWrite = () => {
    const [writeModal, setWriteModal] = useState(false);

    let logged=useSelector(state=>state.auth.logged);

    const goWrite = () => {
        if (logged) {
            if (window.screen.width > 480) {
                setWriteModal(true);
            } else {
                window.location.href = '/write';
            }
        } else {
            window.location.href = '/login';
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
            <WriteContainer onClick={goWrite}>
                <div css={css`padding:1em;`}>
                <WriteTxt>어떤 일인지 자세하게 알려주세요.</WriteTxt>
                </div>
            </WriteContainer>

        </>
    )
}

export default PreviewWrite;
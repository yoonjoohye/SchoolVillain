import {css} from "@emotion/core";
import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox, onlyPc} from "../../../assets/style/Layout.style";
import Write from "../../pages/board/Write";
import {Cursor, TypingMobile, TypingPc} from "../../../assets/style/Animate.style";
import {media} from "../../../assets/style/Media.style";
import {MarkdownBody, MarkdownMd, MarkdownSm, MarkdownXl} from "../../../assets/style/Markdown.style";
import {useDispatch, useSelector} from "react-redux";
import {IconLg, IconMd} from "../../../assets/style/Icon.style";

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
  cursor:text; 
  width:750px;
  ${media.md`width:90%;`};
  border-radius: 50px; 
  background-color: ${Color.white};
`

const WriteTxt = styled.span`
  ${MarkdownBody('#A9A9A9',400)};
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

    let logged = useSelector(state => state.auth.logged);

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
                <div css={css`padding:10px;`}>
                    <IconLg src={require('../../../assets/img/icon/pencil.svg')}/>
                    <WriteTxt>오늘, 무슨 일이 있으셨나요?</WriteTxt>
                </div>
            </WriteContainer>

        </>
    )
}

export default PreviewWrite;
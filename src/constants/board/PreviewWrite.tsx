import {css} from "@emotion/core";
import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox} from "../../../assets/style/Layout.style";
import Write from "../../pages/board/Write";
import {Cursor, TypingMobile, TypingPc} from "../../../assets/style/Animate.style";
import produce from "immer";
import {media} from "../../../assets/style/Media.style";

const WriteSection = styled.section`
  width:100%;
`
const WriteContainer = styled.div`
  ${FlexBox('', 'flex-start', 'center')};
  box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.15);
  color:${Color.purple200};
  padding:2em;
  cursor:text;
  &:hover{
    background-color:${Color.purple100};
  }
`

const WriteTxt=styled.span`
  overflow: hidden; 
  border-right: 2px solid ${Color.purpl200};
  white-space: nowrap;
  // animation-name:${Cursor},${TypingPc};
  // animation-duration:.5s, 1.5s;
  // transition-timing-function:step-end,  steps(30, end);
  // animation-iteration-count:infinite;
  // animation-delay: 5s;
  animation: ${Cursor} .5s step-end infinite, ${TypingPc} 3s steps(20, end) infinite ;
  ${media.sm`
       // animation:name:${TypingMobile},${Cursor};
    animation: ${TypingMobile} 3s steps(20, end) infinite,${Cursor} .5s step-end infinite ;
  `}
`
const PreviewWrite = () => {
    const [openModal, setOpenModal] = useState(false);

    const goWrite = () => {
        if (screen.width > 480) {
            setOpenModal(true);
        } else {
            location.href = '/write';
        }
    }
    const isOpen = (open: boolean) => {
        setOpenModal(open);
    }

    return (
        <>
            <WriteSection>
                <div onClick={goWrite}>
                    <WriteContainer>
                        <img css={css`width:2em; height:2em; margin-right:10px;`}
                             src={require('../../../assets/img/icon/edit.svg')}/>
                        <WriteTxt>빌런아, 뭔일이야? 말해줘!</WriteTxt>
                    </WriteContainer>
                </div>
            </WriteSection>
            {
                openModal && <Write isOpen={isOpen}/>
            }
        </>
    )
}

export default PreviewWrite;
import {css} from "@emotion/core";
import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox} from "../../../assets/style/Layout.style";
import Write from "../../pages/board/Write";
import {Cursor, TypingMobile, TypingPc} from "../../../assets/style/Animate.style";
import {media} from "../../../assets/style/Media.style";
import {MarkdownMd} from "../../../assets/style/Markdown.style";

const WriteSection = styled.section`
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  padding:2em;
  border-radius: 0.3em;
  border-top: 10px solid ${Color.purple200};
  ${media.sm`padding:1.8em 5%;`}
`
const WriteContainer = styled.div`
  // ${FlexBox('', 'flex-start', 'center')};
  cursor:text; 
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  padding:1em; 
  border-radius: 0.5em; 
  background-color: white;
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
    const goWrite = () => {
        if (sessionStorage.getItem('logged')) {
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
            <WriteSection onClick={goWrite}>

                <div css={css`${FlexBox('', 'flex-start', 'center')}; margin-bottom:1em;`}>
                    <img css={css`width:2em; height:2em; margin-right: 0.8em;`} src={require('../../../assets/img/icon/edit.svg')}/>
                    <div css={css`${MarkdownMd(Color.purple200, 500)}`}>오늘 무슨 일이 있으셨나요?</div>
                </div>
                    <WriteContainer>
                            <WriteTxt>무슨 일이 있었는지 자세하게 알려주세요.</WriteTxt>
                        {/*<div css={css`margin-left:1em;`}>*/}
                        {/*    <button css={css`width:3em; height:3em; padding:0.8em; border-radius: 5em; background-color:${Color.purple200}; ${FlexBox()};`}><img*/}
                        {/*        css={css`width:100%; height:100%;`}*/}
                        {/*        src={require('../../../assets/img/icon/edit_white.svg')}/></button>*/}
                        {/*</div>*/}
                        {/*</div>*/}

                    </WriteContainer>

            </WriteSection>

        </>
    )
}

export default PreviewWrite;
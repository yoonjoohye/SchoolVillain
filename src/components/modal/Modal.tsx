import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Layout.style";
import {MarkdownBase, MarkdownLg, MarkdownMd} from "../../../assets/style/Markdown.style";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import {media} from "../../../assets/style/Media.style";
import React from "react";
import {FadeIn, FadeOut} from "../../../assets/style/Animate.style";


interface sectionProp {
    openModal: boolean;
}

const ModalSection = styled.section<sectionProp>`
  position:fixed;
  z-index:3;
  background-color:rgba(255,255,255,0.13);
  backdrop-filter: blur(4px);
  left:0;
  top:0;
  width:100%;
  height:100%;
  ${FlexBox()};
  ${(props: sectionProp) => props.openModal ?
    css`
          animation: ${FadeIn} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
        ` :
    css`
          animation: ${FadeOut} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
          display:none;
        `
}
`
const ModalBox = styled.div`
  width: 450px;
  border-radius: 0.3em;
  background-color:white;
  box-shadow:0 0 10px rgba(0,0,0,0.18);
  ${media.sm`
    width:320px;
  `}
`

const ModalHeader = styled.header`
  ${MarkdownLg('', 700)};
  text-align:center;
  margin-top:1.5em;
  margin-bottom:1em;
`
const ModalBody = styled.div`
  ${MarkdownBase()};
  margin-bottom:1.5em;
  text-align:center;
`
const ModalFooter = styled.footer`
  padding:1em;
  text-align:center;

`
const Button = styled.button`
  ${MarkdownMd(Color.white)};
  width:100%;
  padding:0.5em;
  border-radius: 0.3em;
  background-color:${Color.purple200}; 
}
  &:hover{
    background-color: ${Color.purple300};
  }
`

interface propsType {
    openModal: boolean;
    confirmModal:any;
    title: string;
    contents: string;
    buttonName: string;
}

const Modal: React.FC<propsType> = ({openModal, confirmModal, title, contents, buttonName}) => {

    return (
        <ModalSection openModal={openModal}>
            <ModalBox>
                <ModalHeader>
                    {title}
                </ModalHeader>
                <ModalBody dangerouslySetInnerHTML={{__html: contents}}/>
                <ModalFooter>
                    <Button onClick={confirmModal}>{buttonName}</Button>
                </ModalFooter>
            </ModalBox>
        </ModalSection>
    );
}

export default Modal;
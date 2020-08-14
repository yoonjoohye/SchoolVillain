import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import React from "react";
import {MarkdownBase, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Tag} from "../../../assets/style/Util";
import {IconSm} from "../../../assets/style/Icon.style";

const ModalSection = styled.section`
  position: fixed;
  z-index:1;
  background-color:rgba(255,255,255,0.13);
  backdrop-filter: blur(4px);
  left:0;
  top:0;
  width:100%;
  height:100%;
  ${FlexBox()};
`
const ModalBox = styled.div`
  width: 500px;
  background-color:white;
  box-shadow:0 10px 10px rgba(0,0,0,0.18);
`
const ModalHeader = styled.div`
  position:relative;
  border-bottom:1px solid ${Color.gray100};
  padding: 0.8em 1em;
   ${MarkdownMd(Color.black, 500)};
   ${FlexBox()};
`
const ModalFooter = styled.div`
  padding:1em;
  border-top:1px solid ${Color.gray100};
`
const ModalBody = styled.div`
  overflow: auto;
  min-height: 350px; 
  max-height:530px;
`

interface buttonProps {
    enabled: boolean;
}

const Button = styled.button`
  ${MarkdownMd(Color.white)};
  width:100%;
  height: 45px;
  border-radius: 0.3em;
  margin-top:30px;
  ${(props: buttonProps) => props.enabled ?
    `pointer-events:initial;
     background-color:${Color.purple200};
    ` :
    `pointer-events:none;
     background-color:${Color.purple100};
    `
}
  &:hover{
    background-color: ${Color.purple300};
  }
`

const TextArea = styled.textarea`
   width:100%;
  border:0;
  ${MarkdownBase()};
  resize: none;
  outline:none;
`

const Input = styled.input`
  width:100%;
  border:0;
  ${MarkdownBase()};
  outline:none;
`
const FileInput = styled.input`
  display:none;
`
const FakeFileInput = styled.label`
  display:inline-block;
  padding:0.5em 0.8em;
  background-color:${Color.yellow100};
  ${MarkdownBase(Color.yellow200)};
  cursor:pointer;
`
const PreviewImg = styled.div`
  width:100%;
  height:150px;
  display:flex;
  position:relative;
  top:0;
`
const Preview = styled.div`
  display:grid; 
  grid-template-columns: repeat(3, 1fr); 
  grid-gap:0.5em; 
  text-align:right;
  margin-top:1em;
`
const DelButton=styled.button`
  background-color:${Color.gray100};
  ${MarkdownSm(Color.gray200)};
  border-radius: 50%;
  width:1.5em;
  height: 1.5em;
  position: absolute;
  z-index: 2;
  margin-top: -10px;
  margin-left: -13px;
`
const CloseButton=styled.button`
  position:absolute; 
  right:1em; 
  width:30px;
  height:30px;
  ${FlexBox()};
  background: ${Color.gray100};
  border-radius: 50%;
  padding:0.6em;
  &:hover{
    background:#e1e1e1;
  }
`

interface propsType {
    isOpen: any;
    name:string;
    title: string;
    changeTitle: any;

    contents: string;
    changeContents: any;

    tag: string;
    tagList: any;
    changeTag: any;
    onEnter: any;
    deleteTag: any;

    loadImg: any;
    deleteImg: any;
    previewList: string[];

    upload: any;
}

const ModalWrite: React.FC<propsType> = ({
                                             isOpen,
                                             name,
                                             title,
                                             changeTitle,
                                             contents,
                                             changeContents,
                                             tag,
                                             tagList,
                                             changeTag,
                                             onEnter,
                                             deleteTag,
                                             loadImg,
                                             deleteImg,
                                             previewList,
                                            upload
                                         }) => {

    return (
        <ModalSection>
            <ModalBox>
                <ModalHeader>
                    <p>게시물 {name}</p>
                    <CloseButton onClick={() => isOpen(false)}><img css={css`width:100%;`} src='../../../assets/img/icon/close.svg'/></CloseButton>
                </ModalHeader>
                <ModalBody>
                    <div css={css`padding:1em; border-bottom:1px solid ${Color.gray100};`}>
                        <Input value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeTitle(e)}
                               placeholder="오늘 무슨일 있었냐?"/>
                    </div>
                    <div css={css`padding:1em; border-bottom:1px solid ${Color.gray100};`}>
                        <TextArea rows={6} value={contents}
                                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => changeContents(e)}
                                  placeholder="내용을 입력해주세요.">

                        </TextArea>
                    </div>
                    <div css={css`padding:1em;`}>
                        <div>
                            <FileInput type="file" id="img"
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => loadImg(e)}
                                       accept="image/jpg, image/png, image/jpeg, image/gif" multiple/>
                            <FakeFileInput htmlFor="img">+ 이미지 업로드</FakeFileInput>
                            <span css={css`${MarkdownSm(Color.gray200)}`}>* 이미지는 최대 6개까지 등록할 수 있습니다.</span>
                        </div>
                        <Preview>
                            {
                                previewList.map((preview: any, index: number) => {
                                    return (
                                        <figure css={css`position:relative;`} key={index}>
                                            <DelButton onClick={() => deleteImg(index)}>X</DelButton>
                                            <PreviewImg>
                                                <img
                                                    css={css`width: 100%; height: 100%;`}
                                                    src={preview}/>
                                            </PreviewImg>
                                        </figure>

                                    )
                                })
                            }
                        </Preview>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div css={css`margin-bottom:1em;`}>
                        <Input type="text" value={tag}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeTag(e)}
                               placeholder="#해시태그를 입력해주세요."
                               onKeyPress={(e: React.KeyboardEvent) => onEnter(e)}/>
                    </div>
                    <div css={css`margin-bottom:1em;`}>
                        {
                            tagList?
                            tagList.map((item:any, index:number) => {
                                return (
                                    <Tag key={index}>
                                        <span css={css`margin-right:0.5em;`}># {item.tag || item}</span>
                                        <span onClick={() => deleteTag(index)}>X</span>
                                    </Tag>
                                )
                            }):null
                        }
                    </div>
                    <Button enabled={title.length > 0 && contents.length > 0} onClick={upload}>등록</Button>
                </ModalFooter>
            </ModalBox>
        </ModalSection>
    )
}
export default ModalWrite;
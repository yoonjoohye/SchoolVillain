import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import React, {useRef, useState} from "react";
import produce from "immer";
import {MarkdownBase, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";

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
  max-height:600px;
`
const Tag = styled.div`
    display:inline-block;
    background-color:${Color.yellow100};
    ${MarkdownSm(Color.yellow200)};
    padding:0.1em 0.5em;
    margin-right:0.5em;
    margin-bottom:0.5em;
`

type buttonProps = {
    enabled: boolean;
}
const Button = styled.button`
  ${MarkdownMd(Color.white)};
  width:100%;
  height: 45px;
  border-radius: 3px;
  box-shadow: 0 1.5px 2.5px 0 rgba(0, 0, 0, 0.16);
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
  background-color:${Color.purple100};
  ${MarkdownBase(Color.purple200)};
  cursor:pointer;
`
const PreviewImg=styled.img`
  clip: rect( 20px, 220px, 220px, 20px );
`
const Modal = ({isOpen}: any) => {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [tag, setTag] = useState('');
    const inputImg = useRef(null);
    const [previewUrl, setPreviewUrl] = useState([]);
    const [tagList, setTagList] = useState([]);

    const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const contentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';

        setContents(e.target.value);
    }

    const tagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    }

    const onEnter = (e: React.KeyboardEvent) => {
        if (tagList.length >= 10) {
            //모달 필요
            alert('최대 10개까지 가능합니다');
            setTag('');
        } else {
            if (e.key === 'Enter') {
                setTagList(produce(draft => {
                    draft.push(tag);
                }));
                setTag('');
            }
        }
    }
    const onTagDelete = (idx: number) => {
        setTagList(produce(draft => {
            draft.splice(idx, 1);
        }));
    }

    const loadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);

        console.log(inputImg.current.files);

        Array.from(e.target.files).map(file => {
            let reader = new FileReader();

            reader.onloadend = () => {
                console.log(reader);

                setPreviewUrl(produce(draft => {
                    draft.push(reader.result);
                }));
            }

            console.log(file);
            reader.readAsDataURL(file);
        });
    }
    const goWrite = () => {

    }

    return (
        <ModalSection>
            <ModalBox>
                <ModalHeader>
                    <p>게시물 작성</p>
                    <span css={css`position:absolute; margin-left:22em; cursor:pointer;`}
                          onClick={() => isOpen(false)}>X</span>
                </ModalHeader>
                <ModalBody>
                    <div css={css`padding:1em; border-bottom:1px solid ${Color.gray100};`}>
                        <Input value={title} onChange={titleChange} placeholder="오늘 무슨일 있었냐?"/>
                    </div>
                    <div css={css`padding:1em; border-bottom:1px solid ${Color.gray100};`}>
                        <TextArea rows={6} value={contents} onChange={contentsChange}
                                  placeholder="내용을 입력해주세요."></TextArea>
                    </div>
                    <div css={css`padding:1em;`}>
                        <div>
                            <FileInput type="file" id="img" ref={inputImg} onChange={loadImg} multiple/>
                            <FakeFileInput htmlFor="img">이미지 업로드</FakeFileInput>
                        </div>

                        {
                            previewUrl.map((preview, index) => {
                                return (
                                    <PreviewImg key={index} src={preview}/>
                                )
                            })
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div css={css`margin-bottom:1em;`}>
                        <Input type="text" value={tag} onChange={tagChange} placeholder="#해시태그를 입력해주세요."
                               onKeyPress={onEnter}/>
                    </div>
                    <div css={css`margin-bottom:1em;`}>
                        {
                            tagList.map((item, index) => {
                                return (
                                    <Tag key={index}>
                                        <span css={css`margin-right:0.5em;`}># {item}</span>
                                        <span onClick={() => onTagDelete(index)}>X</span>
                                    </Tag>
                                )
                            })
                        }
                    </div>
                    <Button enabled={title.length > 0 && contents.length > 0} onClick={goWrite}>등록</Button>
                </ModalFooter>
            </ModalBox>
        </ModalSection>
    )
}
export default Modal;
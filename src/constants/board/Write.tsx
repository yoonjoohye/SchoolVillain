import React, {useRef, useState} from 'react';
import styled from "@emotion/styled";
import produce from "immer";
import {Color} from "../../../assets/style/Color.style";
import {css} from "@emotion/core";
import {MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";

const Tag = styled.div`
    display:inline-block;
    background-color:${Color.yellow100};
    ${MarkdownSm(Color.yellow200)};
    padding:0.1em 0.5em;
    margin-right:0.5em;
    margin-bottom:0.5em;
`

const Button = styled.button`
  ${MarkdownMd(Color.white)};
  width:100%;
  height: 45px;
  border-radius: 3px;
  box-shadow: 0 1.5px 2.5px 0 rgba(0, 0, 0, 0.16);
  margin-top:30px;
  background-color:${Color.purple200};
  outline:none;
}
  &:hover{
    background-color: ${Color.purple300};
  }
`
const TextArea = styled.textarea`
   width:100%;
  border:0;
  ${MarkdownMd()};
  resize: none;
  outline:none;
`

const Input = styled.input`
  width:100%;
  border:0;
  ${MarkdownMd()};
  outline:none;
`
const Write = () => {
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

                // setImg(produce(draft=>{
                //     draft.push(file);
                // }));
                setPreviewUrl(produce(draft=>{
                    draft.push(reader.result);
                }));
                // setImg([...img, file]);
                // setPreviewUrl([...previewUrl, reader.result]);
            }

            console.log(file);
            reader.readAsDataURL(file);
        });
    }

    return (
        <section>
            <div css={css`overflow: auto; height: 365px;`}>
                <div css={css`padding:1em 0; border-bottom:1px solid ${Color.gray100};`}>
                    <Input value={title} onChange={titleChange} placeholder="오늘 무슨일 있었냐?"/>
                </div>
                <div css={css`padding:1em 0; border-bottom:1px solid ${Color.gray100};`}>
                    <TextArea rows={7} value={contents} onChange={contentsChange} placeholder="내용을 입력해주세요."></TextArea>
                </div>
                <div css={css`padding:1em 0;`}>
                    <Input type="file" ref={inputImg} onChange={loadImg} multiple/>
                    {
                        previewUrl.map((url, index) => {
                            return (
                                <img css={css`width:30%;`} key={index} src={url}/>
                            )
                        })
                    }
                </div>
            </div>
            <div css={css``}>
                <div css={css`padding:1em 0; border:1px solid #eeeeee;`}>
                    <Input type="text" value={tag} onChange={tagChange} placeholder="#해시태그를 입력해주세요."
                           onKeyPress={onEnter}/>
                </div>
                <div css={css`height:3em;`}>
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
                <Button>등록</Button>
            </div>
        </section>
    )
}

export default Write;
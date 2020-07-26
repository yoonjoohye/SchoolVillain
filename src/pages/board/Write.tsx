import React, {useState, KeyboardEvent} from 'react';
import styled from "@emotion/styled";
import {Section} from "../../../assets/style/Box.style";
import produce from "immer";
import {Color} from "../../../assets/style/Color.style";
import {css} from "@emotion/core";

const WriteSection = styled.section`
  ${Section};
`
const Tag=styled.div`
    display:inline-block;
    background-color:${Color.yellow100};
    color:${Color.yellow200};
    padding:0.3em 0.5em;
    margin-right:0.5em;
    margin-bottom:0.5em;
`
const Write = () => {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [tag, setTag] = useState('');
    const [tagList, setTagList] = useState([]);

    const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const contentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContents(e.target.value);
    }
    const tagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    }

    const onEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setTagList(produce(draft => {
                draft.push(tag);
            }));
            setTag('');
        }

    }

    return (
        <WriteSection>
            <div>
                <input value={title} onChange={titleChange} placeholder="오늘 무슨일 있었냐?"/>
            </div>
            <div>
                <textarea value={contents} onChange={contentsChange} placeholder="내용을 입력해주세요."></textarea>
            </div>
            <div>
                <input type="text" value={tag} onChange={tagChange} placeholder="해시태그를 입력해주세요." onKeyPress={onEnter}/>
                <div>
                {
                    tagList.map((item, index) => {
                        return (
                            <Tag key={index}>
                                <span css={css`margin-right:0.5em;`}>{item}</span>
                                <span>X</span>
                            </Tag>
                        )
                    })
                }
                </div>
            </div>
        </WriteSection>

    )
}

export default Write;
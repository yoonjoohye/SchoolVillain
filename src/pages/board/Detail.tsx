import React, {useState} from 'react';
import SEO from "../SEO/SEO";
import {jsx,css} from '@emotion/core';
import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Box.style";
import {media} from "../../../assets/style/Media.style";
import {MarkdownBase, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import Reply from "../../constants/board/Reply";

const DetailSection = styled.section`
  padding:60px 0;
  min-height:100vh;
  ${media.sm`padding:60px 0`};
`
const DetailContainer = styled.div`
  padding:10px 5%;
`

interface BoxProps{
    justifyContent?:string;
}
const DetailBox = styled.div<BoxProps>`
  ${(props:BoxProps)=>FlexBox(props.justifyContent||'flex-start')};
  margin-bottom:10px;
`
const Icon = styled.img`
  position: relative;
  vertical-align: text-top;
  width:14px;
  height:14px;
  margin-right:5px;
`

const BoardTitle = styled.div`
  ${MarkdownMd('', 400)};
`

const BoardContent = styled.div`
  ${MarkdownBase()};
  margin-bottom:10px;
`

const Space = styled.span`
  margin-right:10px;
`

const Detail: React.FC = () => {
    const [replyList, setReplyList] = useState([
            {
                name: '윤주혜',
                contents: 'ㄴ아ㅓ림낭러미ㅏㄴ러미ㅏㄴㅇ러;ㅣ마널;ㅏㅁ넝ㄹ;ㅣㅏㅁ널ㅇ',
                date: '2000.12.15',
                reReply: [
                    {
                        no: 0,
                        name: '윤주혜',
                        contents: 'ㄴ아ㅓ림낭러미ㅏㄴ러미ㅏㄴㅇ러;ㅣ마널;ㅏㅁ넝ㄹ;ㅣㅏㅁ널ㅇ',
                        date: '2000.12.15'
                    },
                    {
                        no: 1,
                        name: '윤주혜',
                        contents: 'ㄴ아ㅓ림낭러미ㅏㄴ러미ㅏㄴㅇ러;ㅣ마널;ㅏㅁ넝ㄹ;ㅣㅏㅁ널ㅇ',
                        date: '2000.12.15',
                    },
                    {
                        no: 2,
                        name: '윤주혜',
                        contents: 'ㄴ아ㅓ림낭러미ㅏㄴ러미ㅏㄴㅇ러;ㅣ마널;ㅏㅁ넝ㄹ;ㅣㅏㅁ널ㅇ',
                        date: '2000.12.15',
                    },
                    {
                        no: 3,
                        name: '윤주혜',
                        contents: 'ㄴ아ㅓ림낭러미ㅏㄴ러미ㅏㄴㅇ러;ㅣ마널;ㅏㅁ넝ㄹ;ㅣㅏㅁ널ㅇ',
                        date: '2000.12.15',
                    },
                    {
                        no: 4,
                        name: '윤주혜',
                        contents: 'ㄴ아ㅓ림낭러미ㅏㄴ러미ㅏㄴㅇ러;ㅣ마널;ㅏㅁ넝ㄹ;ㅣㅏㅁ널ㅇ',
                        date: '2000.12.15',
                    },
                    {
                        no: 5,
                        name: '윤주혜',
                        contents: 'ㄴ아ㅓ림낭러미ㅏㄴ러미ㅏㄴㅇ러;ㅣ마널;ㅏㅁ넝ㄹ;ㅣㅏㅁ널ㅇ',
                        date: '2000.12.15',
                    }
                ]
            },
            {
                name: '김영환',
                contents: 'ㄴ아ㅓ림낭러미ㅏㄴ러미ㅏㄴㅇ러;ㅣ마널;ㅏㅁ넝ㄹ;ㅣㅏㅁ널ㅇ',
                date: '2000.11.15',
                reReply: [
                    {
                        no: 0,
                        name: '윤주혜',
                        contents: 'ㄴ아ㅓ림낭러미ㅏㄴ러미ㅏㄴㅇ러;ㅣ마널;ㅏㅁ넝ㄹ;ㅣㅏㅁ널ㅇ',
                        date: '2000.12.15'
                    },
                    {
                        no: 1,
                        name: '윤주혜',
                        contents: 'ㄴ아ㅓ림낭러미ㅏㄴ러미ㅏㄴㅇ러;ㅣ마널;ㅏㅁ넝ㄹ;ㅣㅏㅁ널ㅇ',
                        date: '2000.12.15',
                    }
                ]
            },
            {
                name: '김영환',
                contents: 'ㄴ아ㅓ림낭러미ㅏㄴ러미ㅏㄴㅇ러;ㅣ마널;ㅏㅁ넝ㄹ;ㅣㅏㅁ널ㅇ',
                date: '2000.11.15',
                reReply: []
            }
        ]
    )
    const [reply, setReply] = useState('');
    const [reReply, setReReply] = useState('');
    const [row, setRow] = useState(1);

    const changeReply = (reply: string) => {
        setReply(reply);
    }

    const changeReReply = (reReply: string) => {
        setReReply(reReply);
    }

    const onLike = () => {

    }
    const onReply = () => {

    }
    const onMore = () => {
        console.log('sdfasfs');
    }
    const moreReply = () => {

    }
    const moreReReply = () => {

    }

    return (
        <>
            <SEO title="상세페이지 | 스쿨빌런"
                 description="스쿨빌런 게시물 상세 페이지입니다."
                 keywords="스쿨빌런 게시물 상세 페이지"
            />
            <DetailSection>
                <DetailContainer>
                    <DetailBox justifyContent="space-between">
                        <BoardTitle>타이틀</BoardTitle>
                        <div>. . .</div>
                    </DetailBox>
                    <DetailBox>
                        <span>익명 . 16:24 . <Icon src="../../../assets/img/icon/view.svg"/>1,728</span>
                    </DetailBox>
                    <DetailBox>
                        dksfjslkadfjlksdjfklasjdflaskdjflkasjdf
                    </DetailBox>
                    <DetailBox justifyContent="space-between">
                        <img src="../../../assets/img/index/example.jpg"/>
                        <img src="../../../assets/img/index/example.jpg"/>
                        <img src="../../../assets/img/index/example.jpg"/>
                    </DetailBox>
                    <div>
                        <Space><Icon src="../../../assets/img/icon/like.svg"/> 120명</Space>
                        <span><Icon src="../../../assets/img/icon/comment.svg"/> 30명</span>
                    </div>
                </DetailContainer>
                <Reply replyList={replyList} onLike={onLike} onReply={onReply} onMore={onMore}
                       row={row} reply={reply} changeReply={changeReply}
                       reReply={reReply} changeReReply={changeReReply}
                       moreReply={moreReply} moreReReply={moreReReply()}
                />
            </DetailSection>
        </>
    )
}

export default Detail;
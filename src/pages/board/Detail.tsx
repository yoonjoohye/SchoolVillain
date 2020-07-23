import React, {useCallback, useEffect, useState} from 'react';
import SEO from "../SEO/SEO";
import {jsx, css} from '@emotion/core';
import styled from "@emotion/styled";
import {FlexBox, Section} from "../../../assets/style/Box.style";
import {media} from "../../../assets/style/Media.style";
import {MarkdownBase, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import Reply from "../../constants/board/Reply";
import produce from 'immer';
import axios from "axios";
import Board from "../../constants/board/Board";

const DetailSection = styled.section`
  ${Section()};
`

const Detail: React.FC = ({match}: any) => {
    const [board, setBoard] = useState([]);
    const [replyList, setReplyList] = useState([]);
    const [reply, setReply] = useState('');
    const [reReply, setReReply] = useState('');
    const [openMore, setOpenMore] = useState([]);

    useEffect(() => {
        BoardAPI();
        ReplyAPI();
    }, []);

    const BoardAPI = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: 'https://dev.villain.school/api/board/read',
                headers: {
                    Accept: 'application/json'
                },
                params: {
                    id: match.params.id
                }
            });
            if (response.status === 200) {
                console.log(response);
                setBoard(response.data);
            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                console.log(err);
            }
        }
    }
    const ReplyAPI = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: 'https://dev.villain.school/api/comment/list',
                headers: {
                    Accept: 'application/json'
                },
                params: {
                    board_id: match.params.id,
                    per_page:10,
                    page:1,
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                setReplyList(response.data.data);

                let data: any = [];

                for (let i = 0; i < response.data.data.length; i++) {
                    data.push({reply: false, reReply: []});
                    for (let j = 0; j < response.data.data[i].children.length; j++) {
                        data[i].reReply.push(false);
                    }
                }
                console.log(data);
                setOpenMore(data);
            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                console.log(err);
            }
        }
    }
    // const more = () => {
    //     let data: any = [];
    //
    //     for (let i = 0; i < replyList.length; i++) {
    //         data.push({reply: false, reReply: []});
    //         for (let j = 0; j < replyList[i].children.length; j++) {
    //             data[i].reReply.push(false);
    //         }
    //     }
    //     console.log(data);
    //     setOpenMore(data);
    // }

    const changeReply = (reply: string) => {
        setReply(reply);
    }
    const changeReReply = (reReply: string) => {
        setReReply(reReply);
    }
    const onLike = () => {
        console.log('like');
    }
    const onMore = useCallback((replyIndex: number, reReplyIndex?: number) => {
        let data: any;
        data = produce(openMore, draft => {
            if (reReplyIndex === undefined) {
                draft[replyIndex].reply = !draft[replyIndex].reply;
            }
            if (reReplyIndex !== undefined) {
                draft[replyIndex].reReply[reReplyIndex] = !draft[replyIndex].reReply[reReplyIndex];
            }
        });
        setOpenMore(data);
    }, [openMore]);

    const onDelete = (replyIndex: number, reReplyIndex?: number) => {
        console.log('delete');
    }
    const onReport = (replyIndex: number, reReplyIndex?: number) => {
        console.log('report');
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
                <Board board={board}/>
                <Reply replyList={replyList}
                       onLike={onLike} onMore={onMore} onDelete={onDelete} onReport={onReport}
                       openMore={openMore}
                       reply={reply} changeReply={changeReply}
                       reReply={reReply} changeReReply={changeReReply}
                       moreReply={moreReply} moreReReply={moreReReply()}
                />
            </DetailSection>
        </>
    )
}

export default Detail;
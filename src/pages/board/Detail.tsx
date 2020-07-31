import React, {useCallback, useEffect, useState} from 'react';
import SEO from "../SEO/SEO";
import {jsx, css} from '@emotion/core';
import styled from "@emotion/styled";
import {Section} from "../../../assets/style/Layout.style";
import Reply from "../../constants/board/Reply";
import produce from 'immer';
import axios from "axios";
import Board from "../../constants/board/Board";

const DetailSection = styled.section`
  ${Section()};
`
const Detail: React.FC = ({match}: any) => {
    const [board, setBoard] = useState([]);
    const [boardLikeId, setBoardLikeId] = useState(0);
    const [boardLikeCnt, setBoardLikeCnt] = useState(0);
    const [replyList, setReplyList] = useState([]);
    const [reply, setReply] = useState('');
    const [reReply, setReReply] = useState('');
    // const [openMore, setOpenMore] = useState([]);

    useEffect(() => {
        BoardAPI();
        ReplyAPI();
    }, []);

    const BoardAPI = useCallback(async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/board/read',
                params: {
                    id: match.params.id
                }
            });
            if (response.status === 200) {
                console.log(response);
                setBoard(response.data);
                setBoardLikeCnt(response.data.board_like_count);
                if (response.data.my_like_id) {
                    setBaordLikeId(response.data.my_like_id.id);
                }
            }
        } catch (err) {
           console.log(err);

        }
    }, [])
    const ReplyAPI = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/comment/list',
                params: {
                    board_id: match.params.id,
                    per_page: 10,
                    page: 1,
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                setReplyList(response.data.data);

                // let data: any = [];
                //
                // response.data.data.map((reply: any, replyIndex: number) => {
                //     data.push({reply: false, reReply: []});
                //     reply.children.map((reReply: any, reReplyIndex: number) => {
                //         data[replyIndex].reReply.push(false);
                //     })
                // })
                // setOpenMore(data);
            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                console.log(err);
            }
        }
    }
    const likeBoard = useCallback(async (id: number) => {
        console.log(boardLikeId);
        try {
            if (boardLikeId === 0) {
                let response = await axios({
                    method: 'POST',
                    url: '/api/board/like/create',
                    // headers: {
                    //     Accept: 'application/json',
                    //     Authorization: `Bearer ${localStorage.getItem('token')}`
                    // },
                    data: {
                        id: id
                    }
                });
                if (response.status === 200) {
                    console.log(response.data);
                    setBoardLikeCnt(response.data.count);
                    setBoardLikeId(response.data.id
                    );
                }
            } else {
                let response = await axios({
                    method: 'POST',
                    url: 'https://dev.villain.school/api/board/like/delete',
                    // headers: {
                    //     Accept: 'application/json',
                    //     Authorization: `Bearer ${localStorage.getItem('token')}`
                    // },
                    data: {
                        id: boardLikeId
                    }
                });
                if (response.status === 200) {
                    console.log('좋아요 취소');
                    setBoardLikeCnt(response.data.count);
                    setBoardLikeId(0);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }, [boardLikeId]);
    const moreBoard=()=>{

    }
    const deleteBoard=()=>{

    }
    const editBoard=()=>{

    }

    const changeReply = (reply: string) => {
        setReply(reply);
    }
    const changeReReply = (reReply: string) => {
        setReReply(reReply);
    }

    const likeReply=()=>{

    }
    const deleteReply=()=>{

    }
    const saveReply = async(parentId:number, contents:string) => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/comment/create',
                data: {
                    board_id: match.params.id,
                    parent_id: parentId,
                    contents: contents,
                }
            });
            console.log(response);
            if (response.status === 200) {
            }
        } catch (err) {
            console.log(err);
        }
    }
    const moreReply = () => {

    }
    const moreReReply = () => {

    }
    // const onMore = useCallback((replyIndex: number, reReplyIndex?: number) => {
    //     let data: any;
    //     data = produce(openMore, draft => {
    //         if (reReplyIndex === undefined) {
    //             draft[replyIndex].reply = !draft[replyIndex].reply;
    //         }
    //         if (reReplyIndex !== undefined) {
    //             draft[replyIndex].reReply[reReplyIndex] = !draft[replyIndex].reReply[reReplyIndex];
    //         }
    //     });
    //     setOpenMore(data);
    // }, [openMore]);



    return (
        <>
            <SEO title="상세페이지 | 스쿨빌런"
                 description="스쿨빌런 게시물 상세 페이지입니다."
                 keywords="스쿨빌런 게시물 상세 페이지"
            />
            <DetailSection>
                <Board board={board}
                       likeBoard={likeBoard} boardLikeId={boardLikeId} boardLikeCnt={boardLikeCnt}
                       deleteBoard={deleteBoard} editBoard={editBoard} moreBoard={moreBoard}/>

                <Reply replyList={replyList}
                       likeReply={likeReply} deleteReply={deleteReply}
                       reply={reply} changeReply={changeReply} saveReply={saveReply}
                       reReply={reReply} changeReReply={changeReReply}
                       moreReply={moreReply} moreReReply={moreReReply}
                />
            </DetailSection>
        </>
    )
}

export default Detail;
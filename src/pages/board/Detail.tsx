import React, {useCallback, useEffect, useState} from 'react';
import SEO from "../SEO/SEO";
import {jsx, css} from '@emotion/core';
import styled from "@emotion/styled";
import {Section} from "../../../assets/style/Layout.style";
import Reply from "../../constants/board/Reply";
import axios from "axios";
import Board from "../../constants/board/Board";
import produce from "immer";

const DetailSection = styled.section`
  ${Section()};
  margin-top:6em;
`
const Detail: React.FC = ({match}: any) => {
    const [board, setBoard]:any = useState(null);
    const [boardLikeId, setBoardLikeId] = useState(0);

    const [replyList, setReplyList] = useState([]);
    const [replyLikeId, setReplyLikeId] = useState(0);
    const [reply, setReply] = useState('');
    const [reReply, setReReply] = useState([]);
    const [openReply, setOpenReply] = useState([] as any);

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
                if (response.data.my_like_id) {
                    setBoardLikeId(response.data.my_like_id.id);
                }
            }
        } catch (err) {
            console.log(err);

        }
    }, []);

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

                setReReply(produce(draft=>{
                    response.data.data.map((item:any)=> {
                        draft.push();
                    });
                }));
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
        try {
            if (boardLikeId === 0) {
                let response = await axios({
                    method: 'POST',
                    url: '/api/board/like/create',
                    data: {
                        id: id
                    }
                });
                if (response.status === 200) {
                    // console.log(response.data);
                    setBoard({...board, board_like_count: response.data.count});
                    setBoardLikeId(response.data.id);
                }
            } else {
                let response = await axios({
                    method: 'POST',
                    url: '/api/board/like/delete',
                    data: {
                        id: boardLikeId
                    }
                });
                if (response.status === 200) {
                    console.log('좋아요 취소');
                    setBoard({...board, board_like_count: response.data.count});
                    setBoardLikeId(0);
                }
            }
        } catch (err) {
            if (err.response.status === 401) {
                alert('로그인이 필요합니다.');
            } else {
                console.error(err);
            }
        }
    }, [boardLikeId]);
    const deleteBoard = async (id: number) => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/board/delete',
                params: {
                    id: id
                }
            });
            if (response.status === 204) {
                // console.log(response);
                window.location.href = '/';
            }
        } catch (err) {
            console.log(err);
        }
    }
    const editBoard = () => {

    }
    const moreBoard = () => {

    }


    const changeReply = (reply: string) => {
        setReply(reply);
    }

    const changeReReply = (reReply: any, replyIndex: number) => {
        setReReply(produce(draft => {
            draft[replyIndex] = reReply;
        }));
    }
    const likeReply = async (id: number) => {
        try {
            if (replyLikeId === 0) {
                let response = await axios({
                    method: 'POST',
                    url: '/api/comment/like/create',
                    data: {
                        id: id
                    }
                });
                if (response.status === 200) {
                    console.log(response.data);

                    // setReply(response.data.count);
                    // setReplyLikeId(response.data.id);
                }
            } else {
                let response = await axios({
                    method: 'POST',
                    url: '/api/comment/like/delete',
                    data: {
                        id: replyLikeId
                    }
                });
                if (response.status === 200) {
                    console.log('좋아요 취소');
                    // setReply(response.data.count);
                    // setReplyLikeId(0);
                }
            }
        } catch (err) {
            if (err.response.status === 401) {
                alert('로그인이 필요합니다.');
            } else {
                console.error(err);
            }
        }
    }
    const deleteReply = async (id: number, replyIndex:number|any, reReplyIndex: number|any) => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/comment/delete',
                params: {
                    id: id
                }
            });
            if (response.status === 204) {
                // console.log(response);
                setBoard({...board, comment_count: board.comment_count -= 1});

                if (replyIndex) {
                    setReplyList(produce(draft => {
                        draft[replyIndex].children.splice(reReplyIndex, 1)
                    }));
                } else {
                    setReplyList(
                        replyList.filter(reply => reply.id !== id)
                    );
                }
            }
        } catch (err) {
            console.log(err.response.data);
        }
    }
    const saveReply = async (parentId: number, contents: string, replyIndex?: number|any) => {
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
                setBoard({...board, comment_count: board.comment_count += 1});

                if (parentId) {
                    setReReply(produce(draft => {
                        draft[replyIndex] = '';
                    }))
                    setReplyList(produce(draft => {
                        draft[replyIndex].children.push(response.data);
                    }));
                } else {
                    setReply('');
                    setReplyList(produce(draft => {
                        draft.push(response.data);
                    }));
                }
            }
        } catch (err) {
            if (err.response.status === 401) {
                alert('로그인이 필요합니다.');
            } else if (err.response.status === 422) {
                alert('댓글을 입력해주세요.');
            } else {
                console.error(err);
            }
        }
    }
    const goReReply = useCallback((idx: number) => {
        if (openReply.includes(idx)) {
            setOpenReply(openReply.filter((item: number) => item !== idx))
        } else {
            setOpenReply([idx, ...openReply]);
        }
    }, [openReply]);

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
                <Board board={board}
                       likeBoard={likeBoard} boardLikeId={boardLikeId}
                       deleteBoard={deleteBoard} editBoard={editBoard} moreBoard={moreBoard}/>

                <Reply replyList={replyList}
                       likeReply={likeReply} goReReply={goReReply} deleteReply={deleteReply}
                       openReply={openReply}
                       reply={reply} changeReply={changeReply} saveReply={saveReply}
                       reReply={reReply} changeReReply={changeReReply}
                       moreReply={moreReply} moreReReply={moreReReply}
                />
            </DetailSection>
        </>
    )
}

export default Detail;
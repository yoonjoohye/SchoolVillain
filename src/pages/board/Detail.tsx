import React, {useCallback, useEffect, useState} from 'react';
import SEO from "../SEO/SEO";
import {jsx, css} from '@emotion/core';
import styled from "@emotion/styled";
import {Section} from "../../../assets/style/Layout.style";
import Reply from "../../constants/board/Reply";
import axios from "axios";
import Board from "../../constants/board/Board";
import produce from "immer";
import Edit from "./Edit";

const DetailSection = styled.section`
  ${Section()};
  margin-top:6em;
`
const Detail: React.FC = ({match}: any) => {
    const [board, setBoard]: any = useState(null);
    const [boardLikeId, setBoardLikeId] = useState(0);
    const [replyList, setReplyList] = useState([]);
    const [replyLikeId, setReplyLikeId] = useState([]);
    const [reply, setReply] = useState('');
    const [reReply, setReReply] = useState([]);
    const [openReply, setOpenReply] = useState([] as any);
    const [openModal,setOpenModal]=useState(false);


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
            console.log(response);
            if (response.status === 200) {
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
            // console.log(response.data);
            if (response.status === 200) {
                setReplyList(response.data.data);

                let likeId: any = [];
                response.data.data.map((reply: any, replyIndex: number) => {
                    likeId.push({reply: response.data.data[replyIndex].my_like_id, reReply: []});
                    reply.children.map((reReply: any, reReplyIndex: number) => {
                        likeId[replyIndex].reReply.push(response.data.data[replyIndex].children[reReplyIndex].my_like_id);
                    })
                })
                setReplyLikeId(likeId);
            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                console.log(err);
            }
        }
    }
    const likeBoard =async (id: number) => {
        try {
            if (boardLikeId>0) {
                let response = await axios({
                    method: 'POST',
                    url: '/api/board/like/delete',
                    data: {
                        id: boardLikeId
                    }
                });
                console.log(response);
                if (response.status === 200) {
                    // console.log('좋아요 취소');
                    setBoard(produce(draft=>{
                        draft.board_like_count=response.data.count
                    }));
                    setBoardLikeId(0);
                }
            } else {
                let response = await axios({
                    method: 'POST',
                    url: '/api/board/like/create',
                    data: {
                        id: id
                    }
                });
                if (response.status === 200) {
                    console.log(response.data);
                    setBoard(produce(draft=>{
                        draft.board_like_count=response.data.count
                    }));
                    setBoardLikeId(response.data.id);
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
        if(screen.width>480){
            setOpenModal(true);
        }else{
            location.href='/edit';
        }
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
    const likeReply = async (id: number, replyIndex: number, reReplyIndex: number | any) => {
        // console.log(replyLikeId);
        try {
            if (reReplyIndex !== null) {
                //대댓글
                if (replyLikeId[replyIndex].reReply[reReplyIndex]) {
                    //좋아요 취소
                    let response = await axios({
                        method: 'POST',
                        url: '/api/comment/like/delete',
                        data: {
                            id: replyLikeId[replyIndex].reReply[reReplyIndex].id
                        }
                    });
                    if (response.status === 200) {
                        // console.log('대댓글 좋아요 취소');
                        setReplyList(produce(draft => {
                            draft[replyIndex].children[reReplyIndex].comment_like_count = response.data.count
                            draft[replyIndex].children[reReplyIndex].comment_like = null
                        }));
                        setReplyLikeId(produce(draft => {
                            draft[replyIndex].reReply[reReplyIndex] = null
                        }));
                    }
                } else {
                    //좋아요 등록
                    let response = await axios({
                        method: 'POST',
                        url: '/api/comment/like/create',
                        data: {
                            id: id
                        }
                    });
                    if (response.status === 200) {
                        // console.log(response.data);
                        setReplyList(produce(draft => {
                            draft[replyIndex].children[reReplyIndex].comment_like_count = response.data.count
                            draft[replyIndex].children[reReplyIndex].comment_like = response.data.like
                        }));

                        setReplyLikeId(produce(draft => {
                            draft[replyIndex].reReply[reReplyIndex] = response.data.like
                        }));
                    }
                }
            } else {
                //댓글
                if (replyLikeId[replyIndex].reply) {
                    //좋아요 취소
                    let response = await axios({
                        method: 'POST',
                        url: '/api/comment/like/delete',
                        data: {
                            id: replyLikeId[replyIndex].reply.id
                        }
                    });
                    if (response.status === 200) {
                        // console.log('댓글 좋아요 취소');
                        setReplyList(produce(draft => {
                            draft[replyIndex].comment_like_count = response.data.count
                            draft[replyIndex].comment_like = null

                        }));
                        setReplyLikeId(produce(draft => {
                            draft[replyIndex].reply = null
                        }));
                    }
                } else {
                    //좋아요 등록
                    let response = await axios({
                        method: 'POST',
                        url: '/api/comment/like/create',
                        data: {
                            id: id
                        }
                    });
                    if (response.status === 200) {
                        // console.log(response.data);
                        setReplyList(produce(draft => {
                            draft[replyIndex].comment_like_count = response.data.count
                            draft[replyIndex].comment_like = response.data.like
                        }));
                        setReplyLikeId(produce(draft => {
                            draft[replyIndex].reply = response.data.like
                        }));

                    }
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
    const deleteReply = async (id: number, replyIndex: number, reReplyIndex?: number | any) => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/comment/delete',
                data: {
                    id: id
                }
            });

            // console.log(response);
            if (response.status === 204) {
                setBoard({...board, comment_count: board.comment_count -= 1});

                if (reReplyIndex!==null) {
                    setReplyList(produce(draft => {
                        draft[replyIndex].children.splice(reReplyIndex, 1)
                    }));
                    setReplyLikeId(produce(draft => {
                        draft[replyIndex].reReply.splice(reReplyIndex,1)
                    }));
                } else {
                    setReplyList(
                        replyList.filter((reply:any) => reply.id !== id)
                    );
                    setReplyLikeId(produce(draft => {
                        draft.splice(replyIndex,1)
                    }));
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
    const saveReply = async (parentId: number, contents: string, replyIndex?: number | any) => {
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
            // console.log(response);
            if (response.status === 200) {
                setBoard({...board, comment_count: board.comment_count += 1});

                if (parentId) {
                    setReReply(produce(draft => {
                        draft[replyIndex] = '';
                    }))
                    setReplyList(produce(draft => {
                        if (!draft[replyIndex].children) draft[replyIndex].children = [];
                        draft[replyIndex].children.push(response.data);
                    }));

                    setReplyLikeId(produce(draft => {
                        draft[replyIndex].reReply.push(null)
                    }));

                } else {
                    setReply('');
                    setReplyList(produce(draft => {
                        draft.push(response.data);
                    }));
                    setReplyLikeId(produce(draft => {
                        draft.push({reply: response.data.my_like_id, reReply: []})
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

    const isOpen=(open:boolean)=>{
        setOpenModal(open);
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
                       openReply={openReply} replyLikeId={replyLikeId}
                       reply={reply} changeReply={changeReply} saveReply={saveReply}
                       reReply={reReply} changeReReply={changeReReply}
                       moreReply={moreReply} moreReReply={moreReReply}
                />

                {
                    openModal?
                    <Edit isOpen={isOpen} boardId={match.params.id} />:null
                }
            </DetailSection>
        </>
    )
}

export default Detail;
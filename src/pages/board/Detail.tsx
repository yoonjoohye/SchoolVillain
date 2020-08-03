import React, {useCallback, useEffect, useState} from 'react';
import SEO from "../SEO/SEO";
import {jsx, css} from '@emotion/core';
import styled from "@emotion/styled";
import {Section} from "../../../assets/style/Layout.style";
import Reply from "../../constants/board/Reply";
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
    const [openReply, setOpenReply]=useState([] as any);

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
                // console.log(response);
                setBoard(response.data);
                setBoardLikeCnt(response.data.board_like_count);
                if (response.data.my_like_id) {
                    setBoardLikeId(response.data.my_like_id.id);
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
                // console.log(response.data);
                setReplyList(response.data.data);
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
                    setBoardLikeCnt(response.data.count);
                    setBoardLikeId(response.data.id);
                }
            } else {
                let response = await axios({
                    method: 'POST',
                    url: 'https://dev.villain.school/api/board/like/delete',
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
            if(err.response.status===401){
                alert('로그인이 필요합니다.');
            }else {
                console.error(err);
            }
        }
    }, [boardLikeId]);
    const moreBoard=()=>{

    }
    const deleteBoard=async(id:number)=>{
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
                window.location.href='/';
            }
        } catch (err) {
            console.log(err);
        }
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

    const openReReply=useCallback((idx:number)=>{
        if(openReply.includes(idx)) {
            openReply.splice(openReply.indexOf(idx),1);
            setOpenReply([...openReply]);
        }else {
            setOpenReply([idx, ...openReply]);
        }
    },[openReply]);
    const deleteReply=async(id:number)=>{
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/comment/delete',
                params: {
                    id: id
                }
            });
            if (response.status === 204) {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
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
                       likeReply={likeReply} openReReply={openReReply} deleteReply={deleteReply}
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
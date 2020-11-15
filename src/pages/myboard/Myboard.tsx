import React, {useCallback, useEffect, useState} from 'react';
import PreviewBoard from "../../templates/board/PreviewBoard";
import {css} from "@emotion/core";
import {FlexBox, Section} from "../../../assets/style/Layout.style";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import axios from "axios";
import SEO from "../../templates/SEO/SEO";
import {MarkdownBase, MarkdownMd, MarkdownMdx, MarkdownSm} from "../../../assets/style/Markdown.style";
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch, useSelector} from "react-redux";
import {likeBoardListRequest, postBoardListRequest, replyBoardListRequest} from "../../reducers/board";
import SkeletonPreviewBoard from "../../templates/loading/SkeletonPreviewBoard";

const MypageSection = styled.section`
  ${Section()}; 
   padding-top:6em;

`
const MypageTab = styled.nav`
  ${FlexBox('row', '', 'center')};
  ${MarkdownMdx('#242424', 400)};
  margin-bottom:20px;
`
const Tab = styled.li`
  margin-right:1em;
  cursor:pointer;
  text-align:center;
`
const Myboard = ({history, match}: any) => {
    const dispatch = useDispatch();
    let likeBoardList = useSelector(state => state.board.likeBoardList);
    let likeBoardPage = useSelector(state => state.board.likeBoardPage);
    let postBoardList = useSelector(state => state.board.postBoardList);
    let postBoardPage = useSelector(state => state.board.postBoardPage);
    let replyBoardList = useSelector(state => state.board.replyBoardList);
    let replyBoardPage = useSelector(state => state.board.replyBoardPage);

    const [likeList, setLikeList] = useState(likeBoardList);
    const [boardList, setBoardList] = useState(postBoardList);
    const [replyList, setReplyList] = useState(replyBoardList);

    const [likeHasMore, setLikeHasMore] = useState(false);
    const [boardHasMore, setBoardHasMore] = useState(false);
    const [replyHasMore, setReplyHasMore] = useState(false);

    const [loading, setLoading] = useState({
        like: true,
        board: true,
        reply: true
    });

    const tab = ['작성한 글', '좋아요한 글', '댓글 쓴 글'];
    const [menu, setMenu] = useState(0);

    useEffect(() => {
        if (match.params.name === 'write') {
            setMenu(0);
            if (postBoardPage === 1) {
                MyBoardAPI(postBoardPage);
            }
        }
        if (match.params.name === 'like') {
            setMenu(1);
            if (likeBoardPage === 1) {
                MyLikeAPI(likeBoardPage);
            }
        }
        if (match.params.name === 'reply') {
            setMenu(2);
            if (replyBoardPage === 1) {
                MyReplyAPI(replyBoardPage);
            }

        }
    }, [match.params]);

    const MyLikeAPI = useCallback(async (page: number) => {
        setLoading({...loading, like: true});
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/mypage/like',
                params: {
                    per_page: 12,
                    page: page
                },
                cache: true
            });
            // console.log(response);
            if (response.status === 200) {
                if (page > 1) {
                    response.data.data.map((item: any) => {
                        likeBoardList.push(item);
                    });
                } else {
                    likeBoardList = response.data.data;
                }
                setLikeList(likeBoardList);

                if (response.data.last_page <= page) {
                    setLikeHasMore(false);
                } else {
                    setLikeHasMore(true);
                }
                // setLikePage(page);
                dispatch(likeBoardListRequest(likeBoardList, page));
                setLoading({...loading, like: false});
            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                console.log(err);
            }
            setLoading({...loading, like: false});

        }
    }, []);
    const MyBoardAPI = useCallback(async (page: number) => {
        setLoading({...loading, board: true});

        try {
            let response = await axios({
                method: 'GET',
                url: '/api/mypage/board',
                params: {
                    per_page: 12,
                    page: page
                },
                cache: true
            });
            // console.log(response);
            if (response.status === 200) {
                if (page > 1) {
                    response.data.data.map((item: any) => {
                        postBoardList.push(item);
                    });
                } else {
                    postBoardList = response.data.data;
                }
                setBoardList(postBoardList);

                if (response.data.last_page <= page) {
                    setBoardHasMore(false);
                } else {
                    setBoardHasMore(true);
                }
                // setBoardPage(page);
                dispatch(postBoardListRequest(postBoardList, page));
                setLoading({...loading, board: false});

            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                console.log(err);
            }
            setLoading({...loading, board: false});
        }
    }, []);
    const MyReplyAPI = useCallback(async (page: number) => {
        setLoading({...loading, reply: true});

        try {
            let response = await axios({
                method: 'GET',
                url: '/api/mypage/comment',
                params: {
                    per_page: 8,
                    page: page
                },
                cache: true
            });
            // console.log(response);
            if (response.status === 200) {
                if (page > 1) {
                    response.data.data.map((item: any) => {
                        replyBoardList.push(item);
                    });
                } else {
                    replyBoardList = response.data.data;
                }

                setReplyList(replyBoardList);

                if (response.data.last_page <= page) {
                    setReplyHasMore(false);
                } else {
                    setReplyHasMore(true);
                }

                // setReplyPage(page);

                dispatch(replyBoardListRequest(replyBoardList, page));

                setLoading({...loading, reply: false});
            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                console.log(err);
            }
            setLoading({...loading, reply: false});
        }
    }, [])

    const selectMenu = (idx: number) => {
        if (idx === 0) {
            history.push('/myboard/write');
        }
        if (idx === 1) {
            history.push('/myboard/like');
        }
        if (idx === 2) {
            history.push('/myboard/reply');
        }
    }

    const goDetail = (id: number) => {
        history.push(`/detail/${id}`);
    }

    return (
        <>
            <SEO title="마이페이지 | 스쿨빌런"
                 description="스쿨빌런 마이페이지입니다."
                 keywords="스쿨빌런 마이페이지"/>

            <MypageSection>
                <MypageTab>
                    {
                        tab.map((item: string, index: number) => {
                            return (
                                <Tab key={index}
                                     css={css`${menu === index ? css`border-bottom:2px solid #242424;` : css`border-bottom:0;`}`}
                                     onClick={() => selectMenu(index)}>
                                    {item}
                                </Tab>
                            )
                        })
                    }
                </MypageTab>
                {
                    menu === 0 &&
                    <InfiniteScroll
                        css={css` &.infinite-scroll-component{overflow:revert!important;}`}
                        dataLength={boardList.length}
                        next={() => MyBoardAPI(postBoardPage + 1)}
                        hasMore={boardHasMore}
                        loader={
                            <SkeletonPreviewBoard/>
                        }
                        endMessage={< div
                            css={css`text-align: center; padding:5em; ${MarkdownSm(Color.gray200)}`}>●</div>}>
                        <PreviewBoard
                            loading={loading.board}
                            boardList={boardList}
                            goDetail={goDetail}
                        />
                    </InfiniteScroll>
                }
                {
                    menu === 1 &&
                    <InfiniteScroll
                        css={css` &.infinite-scroll-component{overflow:revert!important;}`}
                        dataLength={likeList.length}
                        next={() => MyLikeAPI(likeBoardPage + 1)}
                        hasMore={likeHasMore}
                        loader={
                            <SkeletonPreviewBoard/>
                        }
                        endMessage={<div
                            css={css`text-align: center; padding:5em; ${MarkdownSm(Color.gray200)}`}>●</div>}>
                        <PreviewBoard
                            loading={loading.like}
                            boardList={likeList}
                            goDetail={goDetail}
                        />
                    </InfiniteScroll>
                }
                {
                    menu === 2 &&
                    <InfiniteScroll
                        css={css` &.infinite-scroll-component{overflow:revert!important;}`}
                        dataLength={replyList.length}
                        next={() => MyReplyAPI(replyBoardPage + 1)}
                        hasMore={replyHasMore}
                        loader={
                            <SkeletonPreviewBoard/>
                        }
                        endMessage={< div
                            css={css`text-align: center; padding:5em; ${MarkdownSm(Color.gray200)}`}>●</div>}>
                        < PreviewBoard
                            loading={loading.reply}
                            boardList={replyList}
                            mypage={true}
                            goDetail={goDetail}
                        />
                    </InfiniteScroll>
                }
            </MypageSection>
        </>
    )
}

export default Myboard;
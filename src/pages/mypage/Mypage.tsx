import * as React from 'react';
import PreviewBoard from "../../constants/board/PreviewBoard";
import {useEffect, useState} from "react";
import {css} from "@emotion/core";
import {FlexBox, Section} from "../../../assets/style/Layout.style";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import Profile from "../../constants/mypage/Profile";
import axios from "axios";
import SEO from "../SEO/SEO";

const MypageSection = styled.section`
  ${Section()}; 
  margin-top:6em;
`
const MypageTab = styled.nav`
  ${FlexBox('row', 'space-between', 'center')};
  margin-bottom:1em;
  border-bottom:1px solid ${Color.gray100};
`
const Tab = styled.li`
  width:25%;
  cursor:pointer;
  padding:1em 0;

  text-align:center;
`
const MypageContents = styled.div`
  padding:1em 0;
`
const Mypage: React.FC = ({history, match}: any) => {
    const [likeList, setLikeList] = useState([]);
    const [boardList, setBoardList] = useState([]);
    const [replyList, setReplyList] = useState([]);

    const tab = ['좋아요', '내가 쓴 글', '내가 쓴 댓글', '내정보'];
    const [menu, setMenu] = useState(0);

    useEffect(() => {
        if (match.params.name === 'like') {
            setMenu(0);
            MyLikeAPI();
        }
        if (match.params.name === 'board') {
            setMenu(1);
            MyBoardAPI();

        }
        if (match.params.name === 'reply') {
            setMenu(2);
            MyReplyAPI();

        }
        if (match.params.name === 'profile') {
            setMenu(3);
            MyProfileAPI();
        }
    }, [match.params]);

    const MyLikeAPI = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/mypage/like',
                params: {
                    per_page: 10,
                    page: 1
                }
            });
            console.log(response);
            if (response.status === 200) {
                setLikeList(response.data.data);
            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                console.log(err);
            }
        }
    }
    const MyBoardAPI = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/mypage/board',
                params: {
                    per_page: 10,
                    page: 1
                }
            });
            console.log(response);
            if (response.status === 200) {
                setBoardList(response.data.data);
            }
        } catch (err) {
            if (err.response.status === 422) {
                console.log(err);
            } else {
                console.log(err);
            }
        }
    }
    const MyReplyAPI = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/mypage/comment',
                params: {
                    per_page: 10,
                    page: 1
                }
            });
            console.log(response);
            if (response.status === 200) {
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
    const MyProfileAPI = async () => {

    }

    const selectMenu = (idx: number) => {
        if (idx === 0) {
            history.push('/mypage/like');
        }
        if (idx === 1) {
            history.push('/mypage/board');
        }
        if (idx === 2) {
            history.push('/mypage/reply');
        }
        if (idx === 3) {
            history.push('/mypage/profile');
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
                                     css={css`${menu === index ? css`border-bottom:3px solid ${Color.purple200}` : css`border-bottom:0;`}`}
                                     onClick={() => selectMenu(index)}>{item}</Tab>
                            )
                        })
                    }
                </MypageTab>
                <MypageContents>
                    {
                        menu === 0 &&
                        <PreviewBoard boardList={likeList} goDetail={goDetail}/>
                    }
                    {
                        menu === 1 &&
                        <PreviewBoard boardList={boardList} goDetail={goDetail}/>
                    }
                    {
                        menu === 2 &&
                        <PreviewBoard boardList={replyList} mypage={true} goDetail={goDetail}/>
                    }
                    {
                        menu === 3 &&
                        <Profile/>
                    }
                </MypageContents>
            </MypageSection>
        </>
    )
}

export default Mypage;
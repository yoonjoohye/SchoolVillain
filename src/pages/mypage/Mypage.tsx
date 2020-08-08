import * as React from 'react';
import PreviewBoard from "../../constants/board/PreviewBoard";
import {useEffect, useState} from "react";
import {css} from "@emotion/core";
import {FlexBox, Section} from "../../../assets/style/Layout.style";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import Profile from "../../constants/mypage/Profile";
import axios from "axios";

const MypageSection = styled.section`
  ${Section()}; 
  margin-top:6em;
`
const MypageTab = styled.nav`
  ${FlexBox('row', 'space-between', 'center')};
  margin-bottom:1em;
  border-bottom:1px solid ${Color.gray100};
`
const Tab=styled.li`
  width:25%;
  cursor:pointer;
  margin:0 1em;
  padding:1em 0;

  text-align:center;
`
const MypageContents = styled.div`
  padding:1em 0;
`
const Mypage: React.FC = ({history}:any) => {
    const [likeList,setLikeList]=useState([]);
    const [boardList,setBoardList]=useState([]);
    const [replyList,setReplyList]=useState([]);

    const tab = ['좋아요', '내가 쓴 글', '내가 쓴 댓글', '내정보'];
    const [menu, setMenu] = useState(0);

    useEffect(()=>{
        if(menu===0){
            MyLikeAPI();
        }
        if(menu===1){
            MyBoardAPI();
        }
        if(menu===2){
            MyReplyAPI();
        }
        if(menu===3){

        }
    },[menu]);

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


    const selectMenu = (idx: number) => {
        setMenu(idx);
    }

    const goDetail=(id:number)=>{
        history.push(`detail/${id}`);
    }
    return (
        <MypageSection>
            <MypageTab>
                {
                    tab.map((item: string, index: number) => {
                        return (
                            <Tab key={index} css={css`${menu===index ? css`border-bottom:3px solid ${Color.purple200}`: css`border-bottom:0;`}`} onClick={() => selectMenu(index)}>{item}</Tab>
                        )
                    })
                }
            </MypageTab>
            <MypageContents>
                {
                    menu === 0 &&
                    (
                        likeList.length>0?
                    <PreviewBoard boardList={likeList} goDetail={goDetail}/>:
                        <div>좋아요를 누른 게시물이 없어요.</div>
                    )
                }
                {
                    menu === 1 &&
                    (
                    boardList.length>0?
                    <PreviewBoard boardList={boardList} goDetail={goDetail}/>:
                        <div>작성한 게시물이 없어요.</div>
                    )
                }
                {
                    menu === 2 &&
                    (
                    replyList.length>0?
                    <PreviewBoard mypage={true} boardList={replyList} goDetail={goDetail}/>:
                        <div>댓글을 단 게시물이 없어요.</div>
                    )
                }
                {
                    menu===3 &&
                    <Profile/>
                }
            </MypageContents>
        </MypageSection>
    )
}

export default Mypage;
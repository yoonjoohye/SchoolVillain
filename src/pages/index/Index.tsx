import * as React from 'react';
import SEO from '../SEO/SEO';
import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import MainBanner from '../../constants/banner/MainBanner';
import PreviewBoard from '../../constants/board/PreviewBoard';
import axios from 'axios';
import SideBanner from "../../constants/banner/SideBanner";
import Profile from "../../constants/mypage/Profile";
import {FlexBox, onlyPc, Section} from "../../../assets/style/Box.style";
import {css} from "@emotion/core";
import {media} from "../../../assets/style/Media.style";

const IndexSection = styled.section`
  ${FlexBox('center','flex-start')};
  ${Section()};
  
  ${media.sm`
    flex-direction:column;
  `}
`
const IndexContainer=styled.div`
  width:30%;
  margin-right:3rem;
`
const Index: React.FC = ({history}: any) => {
    const [boardList, setBoardList] = useState([]);

    useEffect(()=>{
       api();
    },[]);

    const api=async()=>{
        try {
            let response = await axios({
                method: 'GET',
                url: 'https://dev.villain.school/api/board/list',
                headers: {
                    Accept: 'application/json'
                },
                params: {
                    per_page:10,
                    page:1
                }
            });
            if (response.status === 200) {
                console.log(response);
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

    const goDetail = (id: number) => {
        history.push(`/detail/${id}`);
    }

    return (
        <>
            <SEO title="스쿨빌런"
                 description="스쿨빌런 메인 페이지입니다."
                 keywords="스쿨빌런 메인 페이지"
            />
            <IndexSection>
                <IndexContainer css={onlyPc}>
                    <Profile/>
                    <SideBanner/>
                </IndexContainer>
                <div>
                    <MainBanner/>
                    {boardList.map((board, index) => {
                        return (
                            <PreviewBoard key={index} board={board} index={index} goDetail={goDetail}/>
                        )
                    })}
                </div>
            </IndexSection>
        </>
    )
}

export default Index;
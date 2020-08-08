import * as React from 'react';
import SEO from '../SEO/SEO';
import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import MainBanner from '../../constants/banner/MainBanner';
import PreviewBoard from '../../constants/board/PreviewBoard';
import PreviewWrite from '../../constants/board/PreviewWrite';

import axios from 'axios';
import SideBanner from "../../constants/banner/SideBanner";
import {FlexBox, onlyPc, Section} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";
import {media} from "../../../assets/style/Media.style";
import Identification from "../../constants/mypage/Identification";

const IndexSection = styled.section`
  ${Section};
  display: grid;
  grid-template-columns: 68%;
  justify-content: flex-end;
  ${media.sm`
     grid-template-columns: 100%;
  `};
`

const Nav = styled.nav`
  position:fixed;
  left:15%;
  width:21.5%; 
  top: 6em;
`
const Index: React.FC = ({history}: any) => {
    const [boardList, setBoardList] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        BoardAPI();
        UserAPI();
    }, []);

    const BoardAPI = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/board/list',
                params: {
                    per_page: 10,
                    page: 1
                }
            });
            if (response.status === 200) {
                // console.log(response);
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

    const UserAPI = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/me'
            });
            if (response.status === 200) {
                // console.log(response);
                setUser(response.data);
            }
        } catch (err) {
            console.error(err);
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
                <Nav css={onlyPc}>
                    <Identification user={user}/>
                    <SideBanner/>
                </Nav>

                <div css={css` width:100%;`}>
                    <PreviewWrite/>
                    <MainBanner/>
                    <PreviewBoard boardList={boardList} goDetail={goDetail}/>
                </div>
            </IndexSection>
        </>
    )
}

export default Index;
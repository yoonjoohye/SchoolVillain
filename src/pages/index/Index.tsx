import * as React from 'react';
import SEO from '../SEO/SEO';
import {useCallback, useEffect, useState} from 'react';
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
import InfiniteScroll from "react-infinite-scroll-component";
import {MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";

const IndexSection = styled.section`
  ${Section};
  margin-top:6em;
  display: grid;
  grid-template-columns: 35% 65%;
  ${media.sm`
     grid-template-columns: 100%;
  `};
`

const Nav = styled.nav`
  position: -webkit-sticky;
  position: sticky;
  margin-right:1rem;
  top: 6em; 
  height: 90vh; 
  box-sizing: border-box;
`


const Index: React.FC = ({history}: any) => {
    const [boardList, setBoardList] = useState([]);
    const [user, setUser] = useState(null);
    const [boardCount, setBoardCount]=useState(0);
    const [hasMore, setHasMore]=useState(true);

    useEffect(() => {
        BoardAPI(10);
        UserAPI();
    }, []);

    const BoardAPI = useCallback(async (perPage:number) => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/board/list',
                params: {
                    per_page: perPage,
                    page: 1
                }
            });
            if (response.status === 200) {
                // console.log(response);
                setBoardList(response.data.data);
                if(response.data.total<=perPage){
                    setHasMore(false);
                }
                setBoardCount(response.data.data.length);
            }
        } catch (err) {
            // throw err;
        }
    },[]);
    const UserAPI = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/me'
            });
            // console.log(response);
            if (response.status === 200) {
                setUser(response.data);
            }
        } catch (err) {
            // throw err;
        }
    }

    const goDetail = useCallback((id: number) => {
        history.push(`/detail/${id}`);
    },[]);

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
                    <InfiniteScroll
                        css={css` &.infinite-scroll-component{overflow:revert!important;}`}
                        dataLength={boardCount}
                        next={()=>BoardAPI(boardCount+10)}
                        hasMore={hasMore}
                        loader={
                            <div css={css`text-align: center; padding:3em;`}>
                                <img css={css`width:5em;`} src="../../../assets/img/icon/spinner.gif"/>
                            </div>
                        }
                        endMessage={<div css={css`text-align: center; padding:5em; ${MarkdownSm(Color.gray200)}`}>●</div>}>
                        <PreviewBoard boardList={boardList} goDetail={goDetail}/>
                    </InfiniteScroll>
                </div>
            </IndexSection>
        </>
    )
}

export default Index;
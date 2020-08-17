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
import produce from "immer";

const IndexSection = styled.section`
  ${Section};
  margin-top:6em;
  display: grid;
  grid-template-columns: 33% 67%;
  ${media.md`
     grid-template-columns: 100%;
  `};
`

const Nav = styled.nav`
  ${media.md`display:none;`};
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
    const [mainBanner, setMainBanner] = useState(null);
    const [sideBanner, setSideBanner] = useState([]);
    const [boardPage, setBoardPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [loading,setLoading]=useState(false);

    useEffect(() => {
        BoardAPI(boardPage);
        UserAPI();
        BannerAPI();
    }, []);

    const BoardAPI = useCallback(async (page: number) => {
        setLoading(true);
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/board/list',
                params: {
                    per_page: 10,
                    page: page
                }
            });
            if (response.status === 200) {
                // console.log(response.data);
                setBoardList(produce(draft => {
                    response.data.data.map((board: any) => {
                        draft.push(board);
                    });
                }));
                if (response.data.total <= page * 10) {
                    setHasMore(false);
                }
                setBoardPage(page);

                setLoading(false);

            }
        } catch (err) {
            setLoading(false);
        }
    }, []);

    const UserAPI = useCallback(async () => {
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
            // console.log(err);
        }
    },[]);

    const BannerAPI = useCallback(async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/banner'
            });
            // console.log(response);
            if (response.status === 200) {
                setMainBanner(
                    response.data.data.filter((data: any) =>
                        data.location === 'main'
                    )[0]
                );
                setSideBanner(
                    response.data.data.filter((data: any) =>
                        data.location.includes('side')
                    )
                );

            }
        } catch (err) {
            // console.log(err);
        }
    },[]);

    const goDetail = useCallback((id: number) => {
        history.push(`/detail/${id}`);
    }, []);

    return (
        <>
            <SEO title="스쿨빌런"
                 description="스쿨빌런 메인 페이지입니다."
                 keywords="스쿨빌런 메인 페이지"
            />
            <IndexSection>
                <Nav>
                    <Identification user={user}/>
                    <SideBanner banner={sideBanner}/>
                </Nav>

                <div css={css` width:100%;`}>
                    <PreviewWrite/>
                    <MainBanner banner={mainBanner}/>
                    <InfiniteScroll
                        css={css` &.infinite-scroll-component{overflow:revert!important;}`}
                        dataLength={boardList.length}
                        next={() => BoardAPI(boardPage + 1)}
                        hasMore={hasMore}
                        loader={
                            <div css={css`text-align: center; padding:3em;`}>
                                <img css={css`width:5em;`} src={require('../../../assets/img/icon/spinner.gif')}/>
                            </div>
                        }
                        endMessage={<div
                            css={css`text-align: center; padding:5em; ${MarkdownSm(Color.gray200)}`}>●</div>}>
                        <PreviewBoard loading={loading} boardList={boardList} goDetail={goDetail}/>
                    </InfiniteScroll>
                </div>
            </IndexSection>
        </>
    )
}

export default Index;
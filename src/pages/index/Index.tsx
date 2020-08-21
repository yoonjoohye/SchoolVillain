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
  display: grid;
  grid-template-columns: 35% 65%;
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
            <SEO title="스쿨빌런 | 전국 5570개 중고등학교를 대표하는 학생 커뮤니티"
                 description="나의 고민을 함께하스쿨빌런"
                 keywords="익명, 커뮤니티, 배너광고, 아이돌, 덕질, 익명고백, 학교정보, 입시정보, 고등학생, 중학생, 전학, 대나무 숲, 중고등학생을 위한 대나무 숲!, 학교축제, 인맥, 친구, 뒷담화, 학생 대표 커뮤니티
전국 5570개 중고등학교를 대표하는 학생 커뮤니티, school villain, 학교 생활정보, 익명 커뮤니티, 시간표, 대학, 중학교, 고등학교, 고백, 10대, 진로고민, 성적고민, 연애고민, 가정고민, 청소년, 사춘기, 상담"
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
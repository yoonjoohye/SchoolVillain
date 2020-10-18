import React, {useCallback, useEffect, useState} from 'react';
import SEO from '../../templates/SEO/SEO';
import styled from '@emotion/styled';
import MainBanner from '../../templates/banner/MainBanner';
import PreviewBoard from '../../templates/board/PreviewBoard';
import PreviewWrite from '../../templates/board/PreviewWrite';
import axios from 'axios';
import SideBanner from "../../templates/banner/SideBanner";
import {FlexBox, Section} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";
import {media} from "../../../assets/style/Media.style";
import Identification from "../../templates/mypage/Identification";
import InfiniteScroll from "react-infinite-scroll-component";
import {MarkdownBase, MarkdownLg, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import {useDispatch, useSelector} from "react-redux";
import {boardListRequest} from "../../reducers/board";
import SkeletonPreviewBoard from "../../templates/loading/SkeletonPreviewBoard";

const IndexSection = styled.section`
  ${Section};
  margin-top:40px;
`
const IndexContent = styled.section`
  display: grid;
  grid-template-columns: 20% 80%;
  ${media.md`
     grid-template-columns: 100%;
  `};
`

const Nav = styled.nav`
  ${media.md`display:none;`};
  position: -webkit-sticky;
  position: sticky;
  margin-right:40px;
  top: 6em; 
  height: 90vh; 
  box-sizing: border-box;
`


const Index: React.FC = ({history}: any) => {

    const dispatch = useDispatch();

    let list = useSelector(state => state.board.boardList);
    let page = useSelector(state => state.board.boardPage);

    const [boardList, setBoardList] = useState(list);

    const [user, setUser] = useState(null);
    const [mainBanner, setMainBanner] = useState(null);
    const [sideBanner, setSideBanner] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (page === 1) {
            BoardAPI(page);
        }
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
                    per_page: 12,
                    page: page,
                    cache: true
                }
            });
            // console.log(response.data);
            if (response.status === 200) {
                if (page > 1) {
                    response.data.data.map((item: any) => {
                        list.push(item);
                    });
                } else {
                    list = response.data.data;
                }

                setBoardList(list);
                if (response.data.last_page <= page) {
                    setHasMore(false);
                } else {
                    setHasMore(true);

                }

                dispatch(boardListRequest(list, page));
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
                url: '/api/user/me',
                cache: true
            });
            // console.log(response);
            if (response.status === 200) {
                setUser(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const BannerAPI = useCallback(async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/banner',
                cache: true
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
            console.log(err);
        }
    }, []);

    const goDetail = useCallback((id: number) => {
        history.push(`/detail/${id}`);
    }, []);

    return (
        <>
            <SEO title="스쿨빌런 | 전국 5570개 중고등학교를 대표하는 학생 커뮤니티"
                 description="중고등학생 커뮤니티 스쿨빌런입니다."
                 keywords="익명, 커뮤니티, 배너광고, 아이돌, 덕질, 익명고백, 학교정보, 입시정보, 고등학생, 중학생, 전학, 대나무 숲, 중고등학생을 위한 대나무 숲!, 학교축제, 인맥, 친구, 뒷담화, 학생 대표 커뮤니티
전국 5570개 중고등학교를 대표하는 학생 커뮤니티, school villain, 학교 생활정보, 익명 커뮤니티, 시간표, 대학, 중학교, 고등학교, 고백, 10대, 진로고민, 성적고민, 연애고민, 가정고민, 청소년, 사춘기, 상담"
            />
            <div css={css`${FlexBox('','center','flex-end')}; background-color: #dddddd; width:100%; height: 300px;`}>
                <PreviewWrite/>
            </div>
            <IndexSection>
                <IndexContent>
                    <Nav>
                        {
                            user ?
                                <>
                                    <div css={css`margin-bottom:20px;`}>
                                        <div css={css`${MarkdownLg('', 300)}`}>스빌 학생증</div>
                                    </div>
                                    <Identification user={user}/>
                                    <div css={css`margin-top:40px; padding:20px; box-sizing:border-box; width:100%; height: 139px; background-color: #f4f4f4;`}>
                                        <div onClick={()=>{location.href='/mypage/board'}} css={css`${FlexBox('','space-between','center')}; border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:10px;`}>
                                            <div>게시글 수</div>
                                            <div>12 ></div>
                                        </div>
                                        <div css={css`${FlexBox('','space-between','center')}; border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:10px;`}>
                                            <div>좋아 수</div>
                                            <div>12 ></div>
                                        </div>
                                        <div css={css`${FlexBox('','space-between','center')};`}>
                                            <div>게시글 수</div>
                                            <div>12 ></div>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <button
                                        css={css`margin-bottom:10px; width: 100%; height: 48px; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0); background-color: #f4f4f4;`}
                                        onClick={() => {
                                            location.href = '/login'
                                        }}>로그인
                                    </button>
                                    <button
                                        css={css`margin-bottom:10px; width: 100%; height: 48px; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0); background-color: #f4f4f4;`}
                                        onClick={() => {
                                            location.href = '/join/agreement'
                                        }}>스쿨빌런 회원가입
                                    </button>
                                    <div css={css`text-align:right; ${MarkdownSm('', 300)}`}>비밀번호가 생각안나요</div>
                                </>
                        }
                    </Nav>

                    <main css={css` width:100%;`}>
                        <div css={css`${FlexBox('', 'space-between', 'center')}; margin-bottom:20px;`}>
                            <div css={css`${MarkdownLg('', 300)}`}>전체보기</div>
                            <div>
                                <span css={css`${MarkdownBase('', 500)}`}>연애상담</span>
                            </div>
                        </div>
                        <InfiniteScroll
                            css={css` &.infinite-scroll-component{overflow:revert!important;}`}
                            dataLength={boardList.length}
                            next={() => BoardAPI(page + 1)}
                            hasMore={hasMore}
                            loader={
                                <SkeletonPreviewBoard/>
                            }
                            endMessage={<div
                                css={css`text-align: center; padding:5em; ${MarkdownSm(Color.gray200)}`}>●</div>}>
                            <PreviewBoard loading={loading} boardList={boardList} goDetail={goDetail}/>
                        </InfiniteScroll>
                    </main>
                </IndexContent>
            </IndexSection>
        </>
    )
}

export default Index;
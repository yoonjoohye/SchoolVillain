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
import {MarkdownBase, MarkdownLg, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import {useDispatch, useSelector} from "react-redux";
import {boardListRequest} from "../../reducers/board";
import SkeletonPreviewBoard from "../../templates/loading/SkeletonPreviewBoard";
import {IconBase, IconMd, IconMdx} from "../../../assets/style/Icon.style";
import {Link} from "react-router-dom";

const IndexSection = styled.section`
  ${Section};
  padding-top:40px;
`
const IndexContent = styled.section`
  display: grid;
  grid-gap: 2.5em;
  grid-template-columns: 1fr 4fr;
  ${media.md`
     grid-template-columns: 100%;
  `};
`

const Nav = styled.nav`
  ${media.md`display:none;`};
  position: -webkit-sticky;
  position: sticky;
  top: 6em; 
  height: 90vh; 
  box-sizing: border-box;
`


const Index: React.FC = ({history}: any) => {

    const dispatch = useDispatch();

    let token = useSelector(state => state.auth.logged);
    let list = useSelector(state => state.board.boardList);
    let page = useSelector(state => state.board.boardPage);

    const [boardList, setBoardList] = useState(list);

    const [user, setUser] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState({
        board: 0,
        reply: 0,
        like: 0,
    });
    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
        if (page === 1) {
            BoardAPI(page);
        }
        UserAPI();
        CountAPI();
        // BannerAPI();
    }, []);

    const CountAPI = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/mypage/abstractInfo'
            });
            // console.log(response.data);
            if (response.status === 200) {
                setCount({
                    board: response.data.board_count,
                    reply: response.data.comment_count,
                    like: response.data.like_count
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
    const BoardAPI = useCallback(async (page: number) => {
        setLoading(true);
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/board/list',
                params: {
                    per_page: 12,
                    page: page,
                    first_id: 0,
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
            console.log(response);
            if (response.status === 200) {
                setUser(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const [color, setColor] = useState({
        doodle: '',
        counseling: '',
        all: Color.purple300
    });
    const filterBoard = (type?: string) => {
        console.log(type);
        setBoardList(boardList.filter((item: any) => type ? item.type === type : true));
        if (type === 'doodle') {
            setColor({
                doodle: Color.purple300,
                counseling:'',
                all:''
            });
        } else if (type === 'counseling') {
            setColor({
                doodle: '',
                counseling:Color.purple300,
                all:''
            });
        } else {
            setColor({
                doodle: '',
                counseling:'',
                all:Color.purple300
            });
        }
    }

    const goDetail = useCallback((id: number) => {
        history.push(`/detail/${id}`);
    }, []);

    return (
        <div css={css`background-color:#F7F7F7;`}>
            <SEO title="스쿨빌런 | 전국 5570개 중고등학교를 대표하는 학생 커뮤니티"
                 description="중고등학생 커뮤니티 스쿨빌런입니다."
                 keywords="익명, 커뮤니티, 배너광고, 아이돌, 덕질, 익명고백, 학교정보, 입시정보, 고등학생, 중학생, 전학, 대나무 숲, 중고등학생을 위한 대나무 숲!, 학교축제, 인맥, 친구, 뒷담화, 학생 대표 커뮤니티
전국 5570개 중고등학교를 대표하는 학생 커뮤니티, school villain, 학교 생활정보, 익명 커뮤니티, 시간표, 대학, 중학교, 고등학교, 고백, 10대, 진로고민, 성적고민, 연애고민, 가정고민, 청소년, 사춘기, 상담"
            />
            <div
                css={css`background-color: #EEEFF6; width:100%; height: 300px;  ${media.sm`height:200px`}; ${FlexBox('column', 'center', 'center')}; padding-top:4em; `}>
                <PreviewWrite/>
            </div>
            <IndexSection>
                <IndexContent>
                    <Nav>
                        <div css={css`margin-bottom:20px;`}>
                            <div css={css`${MarkdownLg('#5C16B6', 500)}`}>
                                <IconMd css={css`margin-right:10px`}
                                        src={require('../../../assets/img/icon/school.svg')}/>스쿨빌런 학교
                            </div>
                        </div>
                        {
                            user ?
                                <>
                                    <Identification user={user}/>
                                    <div
                                        css={css`margin-top:40px; padding:20px; box-sizing:border-box; width:100%; height: 139px; background: #FFFFFF;
box-shadow: 0px 0px 4px rgba(152, 149, 149, 0.25);`}>
                                        <Link to="/mypage/write"
                                              css={css`${FlexBox('', 'space-between', 'center')}; border-bottom:1px solid #DFDFDF; padding-bottom:10px; margin-bottom:10px;`}>
                                            <div>작성한 글</div>
                                            <div>{count.board} ></div>
                                        </Link>
                                        <Link to="/mypage/like"
                                              css={css`${FlexBox('', 'space-between', 'center')}; border-bottom:1px solid #DFDFDF; padding-bottom:10px; margin-bottom:10px;`}>
                                            <div>좋아요한 글</div>
                                            <div>{count.like} ></div>
                                        </Link>
                                        <Link to="/mypage/reply" css={css`${FlexBox('', 'space-between', 'center')};`}>
                                            <div>댓글쓴 글</div>
                                            <div>{count.reply} ></div>
                                        </Link>
                                    </div>
                                </>
                                :
                                <>
                                    <button
                                        css={css`margin-bottom:10px; width: 100%; height: 50px; ${MarkdownBase(Color.white, 500)}; background-color: #951DE4;`}
                                        onClick={() => {
                                            history.push('/login')
                                        }}>로그인
                                    </button>
                                    <button
                                        css={css`margin-bottom:10px; width: 100%; height: 50px; ${MarkdownBase('#666666', 500)}; background-color: #DFDFDF;`}
                                        onClick={() => {
                                            history.push('/join/agreement')
                                        }}>스쿨빌런 회원가입
                                    </button>
                                    <div css={css`text-align:right; ${MarkdownSm('', 300)}`}>비밀번호가 생각안나요</div>
                                </>
                        }
                    </Nav>

                    <main>
                        <div
                            css={css`${FlexBox('', 'space-between', 'center')};margin-bottom: 20px; ${media.sm`width:90%; margin:auto auto 20px auto; `}`}>
                            <div css={css`${MarkdownLg('#5C16B6', 500)}`}>
                                <IconMd css={css`margin-right:10px`}
                                        src={require('../../../assets/img/icon/chats.svg')}/>커뮤니티
                            </div>
                            <div css={css`${MarkdownMd('', 400)}; cursor:pointer;`}
                                 onClick={() => setOpenDropdown(!openDropdown)}>
                                전체보기<IconMdx css={css`margin-left:10px`}
                                             src={require('../../../assets/img/icon/dropdown.svg')}/>

                                {
                                    openDropdown &&
                                    // <div css={css`position:absolute;`}>
                                    <div
                                        css={css`${MarkdownBase('#A9A9A9', 400)}; position:absolute; box-shadow: 0px 0px 4px rgba(152, 149, 149, 0.25); margin-top:10px; background-color:${Color.white}; padding:20px 30px;`}>
                                        <div css={css`margin-bottom:10px; cursor: pointer; color:${color.all}`}
                                             onClick={()=>filterBoard()}>전체보기
                                        </div>
                                        <div css={css`margin-bottom:10px; cursor: pointer; color:${color.doodle}`}
                                             onClick={() => filterBoard('doodle')}>담벼락
                                        </div>
                                        <div css={css`cursor: pointer; color:${color.counseling}`}
                                             onClick={() => filterBoard('counseling')}>연애상담
                                        </div>
                                    </div>
                                    // </div>
                                }
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
        </div>
    )
}

export default Index;

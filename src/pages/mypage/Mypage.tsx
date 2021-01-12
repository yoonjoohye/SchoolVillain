import React, {useCallback, useEffect, useState} from 'react';
import PreviewBoard from "../../templates/board/PreviewBoard";
import {css} from "@emotion/core";
import {DetailSection, FlexBox, Section} from "../../../assets/style/Layout.style";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import Profile from "../../templates/mypage/Profile";
import axios from "axios";
import SEO from "../../templates/SEO/SEO";
import {Display2, MarkdownBase, MarkdownLgx, MarkdownMdx, MarkdownSm} from "../../../assets/style/Markdown.style";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "../../templates/modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {likeBoardListRequest, postBoardListRequest, replyBoardListRequest} from "../../reducers/board";
import SkeletonPreviewBoard from "../../templates/loading/SkeletonPreviewBoard";
import {authLogoutFailure, authLogoutRequest, authLogoutSuccess} from "../../reducers/auth";
import {removeCookie} from "../../utils/cookie";

const MypageSection = styled.section`
  ${DetailSection()}; 
   padding-top:6em;
`
const MypageTab = styled.nav`
  border-bottom: 1px dashed #DFDFDF;
  padding:10px;
  ${FlexBox('row', 'space-between', 'center')};
  ${MarkdownMdx('#242424', 400)};
  margin-bottom:20px;
`
const MainTab=styled.div`
  ${FlexBox('row', '', 'center')};
`
const SubTab=styled.div`
  ${FlexBox('row', '', 'center')};
`
const Tab = styled.li`
  margin-right:1em;
  cursor:pointer;
  text-align:center;
`

const Mypage = ({history, match}: any) => {
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [nickname, setNickname] = useState('');
    const [nicknameErr, setNicknameErr] = useState('');
    const [nicknameCheck, setNicknameCheck] = useState(false);
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordErr, setCurrentPasswordErr] = useState('');
    const [currentPasswordCheck, setCurrentPasswordCheck] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordErr, setNewPasswordErr] = useState('');
    const [newPasswordCheck, setNewPasswordCheck] = useState(false);
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [newPasswordConfirmErr, setNewPasswordConfirmErr] = useState('');
    const [newPasswordConfirmCheck, setNewPasswordConfirmCheck] = useState(false);

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

    const mainTab = ['내 프로필', '내 활동'];
    const subTab = ['작성한 글', '좋아요한 글', '댓글 쓴 글'];

    const [mainMenu, setMainMenu] = useState(0);
    const [subMenu, setSubMenu] = useState(0);

    const selectMenu = (main: number, sub:number=0) => {
        if (main===1 && sub === 0) {
            history.push('/mypage/write');
        }
        if (main===1 && sub === 1) {
            history.push('/mypage/like');
        }
        if (main===1 && sub === 2) {
            history.push('/mypage/reply');
        }
        if (main===0) {
            history.push('/mypage/profile');
        }
    }

    const MyProfileAPI = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/me'
            });
            // console.log(response);
            if (response.status === 200) {
                setUser(response.data);
                setNickname(response.data.name || '익명');
                setNicknameCheck(true);
                setEmail(response.data.email);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (match.params.name === 'write') {
            setMainMenu(1);
            setSubMenu(0);
            if (postBoardPage === 1) {
                MyBoardAPI(postBoardPage);
            }
        }
        if (match.params.name === 'like') {
            setMainMenu(1);
            setSubMenu(1);
            if (likeBoardPage === 1) {
                MyLikeAPI(likeBoardPage);
            }
        }
        if (match.params.name === 'reply') {
            setMainMenu(1);
            setSubMenu(2);
            if (replyBoardPage === 1) {
                MyReplyAPI(replyBoardPage);
            }
        }
        if (match.params.name === 'profile') {
            setMainMenu(0);
            MyProfileAPI();

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
            console.log(response);
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
            console.log(response);
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
            console.log(response);
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

    const goDetail = (id: number) => {
        history.push(`/detail/${id}`);
    }
    const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setNickname(value);

        if (value.length > 0) {
            setNicknameErr('');
            setNicknameCheck(true);
        } else {
            setNicknameErr('닉네임을 입력해주세요.');
            setNicknameCheck(false);
        }
    }
    const changeCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setCurrentPassword(value);

        let PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/i;

        if (!(PasswordRegex.test(value))) {
            setCurrentPasswordErr('숫자와 영문자 및 특수문자를 포함한 8~16자이어야 합니다.');
            setCurrentPasswordCheck(false);
        } else {
            setCurrentPasswordErr('');
            setCurrentPasswordCheck(true);
        }
    }
    const changeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setNewPassword(value);

        let PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/i;

        if (!(PasswordRegex.test(value))) {
            setNewPasswordErr('숫자와 영문자 및 특수문자를 포함한 8~16자이어야 합니다.');
            setNewPasswordCheck(false);
        } else {
            setNewPasswordErr('');
            setNewPasswordCheck(true);
        }
    }
    const changeNewPasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setNewPasswordConfirm(value);

        if (value !== newPassword) {
            setNewPasswordConfirmErr('패스워드가 일치하지 않습니다.');
            setNewPasswordConfirmCheck(false);
        } else {
            setNewPasswordConfirmErr('');
            setNewPasswordConfirmCheck(true);
        }
    }

    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [buttonName, setButtonName] = useState('');

    const editNickname = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/nickname',
                data: {
                    nickname: nickname
                }
            });
            // console.log(response);
            if (response.status === 201) {
                setOpenModal(true);
                setTitle('닉네임 변경');
                setContents('닉네임 변경이 완료되었습니다.');
                setButtonName('확인');
            }
        } catch (err) {
            if (err.response.status === 422) {
                setNicknameErr('이미 존재하는 닉네임입니다.');
                setNicknameCheck(false);
                console.error(err.response);
            } else {
                console.error(err);
            }
        }
    }

    const editPassword = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/change/pw',
                data: {
                    new_password: newPassword,
                    current_password: currentPassword
                }
            });
            // console.log(response);
            if (response.status === 201) {
                setOpenModal(true);
                setTitle('패스워드 변경');
                setContents('패스워드 변경이 완료되었습니다.');
                setButtonName('확인');
            }
        } catch (err) {
            if (err.response.status === 422) {
                setCurrentPasswordErr('비밀번호가 일치하지 않습니다.');
                setCurrentPasswordCheck(false);
                console.error(err);
            } else {
                console.error(err);
            }
        }
    }

    const goLogout = async () => {
        dispatch(authLogoutRequest());
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/logout'
            });
            // console.log(response);
            if (response.status === 204) {
                removeCookie('user_token');
                dispatch(authLogoutSuccess());
                window.location.href = '/';
            }
        } catch (err) {
            console.log(err);
            dispatch(authLogoutFailure());
        }
    }
    const goWithdrawal = async () => {
        location.href = '/withdrawal';
    }

    const confirmModal = () => {
        setOpenModal(false);
        location.reload();
    }

    return (
        <>
            <SEO title="마이페이지 | 스쿨빌런"
                 description="스쿨빌런 마이페이지입니다."
                 keywords="스쿨빌런 마이페이지"/>

            <Modal openModal={openModal} confirmModal={confirmModal}
                   title={title}
                   contents={contents}
                   buttonName={buttonName}/>

            <MypageSection>
                <MypageTab>
                    <MainTab>
                        {
                            mainTab.map((item: string, index: number) => {
                                return (
                                    <Tab key={index}
                                         css={css`${mainMenu === index ? css`${Display2()}` : css`${Display2('#c1c1c1')}`}`}
                                         onClick={() => selectMenu(index)}>
                                        {item}
                                    </Tab>
                                )
                            })
                        }
                    </MainTab>
                    <SubTab>
                        {
                            mainMenu === 1 &&
                            subTab.map((item: string, index: number) => {
                                return (
                                    <Tab key={index}
                                         css={css`${subMenu === index ? css`${MarkdownMdx('',500)}` : css`${MarkdownMdx('#c1c1c1',500)}`}`}
                                         onClick={() => selectMenu(1, index)}>
                                        {item}
                                    </Tab>
                                )
                            })
                        }
                    </SubTab>
                </MypageTab>
                {
                    mainMenu === 0 &&
                    <Profile user={user} nickname={nickname} nicknameErr={nicknameErr} nicknameCheck={nicknameCheck}
                             changeNickname={changeNickname}
                             email={email}
                             currentPassword={currentPassword} currentPasswordErr={currentPasswordErr}
                             currentPasswordCheck={currentPasswordCheck} changeCurrentPassword={changeCurrentPassword}
                             newPassword={newPassword} newPasswordErr={newPasswordErr}
                             newPasswordCheck={newPasswordCheck} changeNewPassword={changeNewPassword}
                             newPasswordConfirm={newPasswordConfirm} newPasswordConfirmErr={newPasswordConfirmErr}
                             newPasswordConfirmCheck={newPasswordConfirmCheck}
                             changeNewPasswordConfirm={changeNewPasswordConfirm}

                             editNickname={editNickname}
                             editPassword={editPassword}
                             goLogout={goLogout}
                             goWithdrawal={goWithdrawal}
                    />

                }
                {
                    mainMenu === 1 &&
                    <>
                        {
                            subMenu === 0 &&
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
                            subMenu === 1 &&
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
                            subMenu === 2 &&
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
                                <PreviewBoard
                                    loading={loading.reply}
                                    boardList={replyList}
                                    goDetail={goDetail}
                                />
                            </InfiniteScroll>
                        }
                    </>
                }


            </MypageSection>
        </>
    )
}

export default Mypage;

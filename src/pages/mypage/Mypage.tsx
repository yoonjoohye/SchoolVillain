import * as React from 'react';
import PreviewBoard from "../../constants/board/PreviewBoard";
import {useCallback, useEffect, useState} from "react";
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
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/me'
            });
            // console.log(response);
            if (response.status === 200) {
                setNickname(response.data.name || '익명');
                setNicknameCheck(true);
                setEmail(response.data.email);
            }
        } catch (err) {
            console.error(err);
        }
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

    const editNickname = async () => {
        console.log(nickname);
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
                location.reload();
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

    const editPassword =async () => {
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
                location.reload();
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
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/logout'
            });
            console.log(response);
            if (response.status === 204) {
                location.href = '/';
                sessionStorage.removeItem('logged');
            }
        } catch (err) {
            console.log(err);
        }
    }
    const goWithdrawal = async () => {
        location.href='/withdrawal';
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
                        <Profile nickname={nickname} nicknameErr={nicknameErr} nicknameCheck={nicknameCheck} changeNickname={changeNickname}
                                 email={email}
                                 currentPassword={currentPassword} currentPasswordErr={currentPasswordErr} currentPasswordCheck={currentPasswordCheck} changeCurrentPassword={changeCurrentPassword}
                                 newPassword={newPassword} newPasswordErr={newPasswordErr} newPasswordCheck={newPasswordCheck} changeNewPassword={changeNewPassword}
                                 newPasswordConfirm={newPasswordConfirm} newPasswordConfirmErr={newPasswordConfirmErr} newPasswordConfirmCheck={newPasswordConfirmCheck} changeNewPasswordConfirm={changeNewPasswordConfirm}

                                 editNickname={editNickname}
                                 editPassword={editPassword}
                                 goLogout={goLogout}
                                 goWithdrawal={goWithdrawal}
                        />
                    }
                </MypageContents>
            </MypageSection>
        </>
    )
}

export default Mypage;
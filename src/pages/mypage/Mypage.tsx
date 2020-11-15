import React, {useCallback, useEffect, useState} from 'react';
import PreviewBoard from "../../templates/board/PreviewBoard";
import {css} from "@emotion/core";
import {DetailSection, FlexBox, Section} from "../../../assets/style/Layout.style";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import Profile from "../../templates/mypage/Profile";
import axios from "axios";
import SEO from "../../templates/SEO/SEO";
import {MarkdownBase, MarkdownSm} from "../../../assets/style/Markdown.style";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "../../templates/modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {likeBoardListRequest, postBoardListRequest, replyBoardListRequest} from "../../reducers/board";
import SkeletonPreviewBoard from "../../templates/loading/SkeletonPreviewBoard";
import {authLogoutFailure, authLogoutRequest, authLogoutSuccess} from "../../reducers/auth";

const MypageSection = styled.section`
  ${DetailSection()}; 
   padding-top:6em;
`
const Mypage: React.FC = ({history, match}: any) => {
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
    useEffect(()=>{
        MyProfileAPI();
    },[]);

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
                sessionStorage.removeItem('logged');
                window.location.href = '/';
                dispatch(authLogoutSuccess());
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

            </MypageSection>
        </>
    )
}

export default Mypage;
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import styled from "@emotion/styled";
import {css} from "@emotion/core";
import {MarkdownSm} from "../../../assets/style/Markdown.style";
import {FlexBox} from "../../../assets/style/Layout.style";
import {media} from "../../../assets/style/Media.style";
import {Color} from "../../../assets/style/Color.style";
import {useSelector} from "react-redux";
import axios from "axios";
import Notification from "../../pages/notification/Notification";

const HeaderSection = styled.header`
  position: fixed;
  top:0;
  width:100%;
  background-color:${Color.white};
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.16);
  z-index: 3;

`;
const HeaderContainer = styled.section`
  ${FlexBox('', 'space-between', 'center')};
  height:4em;
  width:80%;
  margin:auto;
  ${media.md`width:80%;`};
  ${media.sm`width:90%;`};
`
const HeaderLogo = styled.div`
  height:1em;
`
const HeaderMenu = styled.span`
  text-align:right;
  min-width: fit-content;
`

const Header = () => {
    // const value = useSelector(state => state.auth.logged);
    const [user, setUser] = useState(null);
    const [openNotification, setOpenNotification] = useState(false);
    const NotificationRef = useRef(null);

    useEffect(() => {
        UserAPI();
        window.addEventListener("click", (e: React.MouseEvent) => {
            if (NotificationRef.current && !NotificationRef.current.contains(e.target)) {
                setOpenNotification(false);
            }
        });
        return () => {
            window.removeEventListener("click", (e: React.MouseEvent) => {
                if (NotificationRef.current && !NotificationRef.current.contains(e.target)) {
                    setOpenNotification(false);
                }
            });
        };
    }, [])

    const onNotification=()=>{
        if (window.screen.width > 480) {
            setOpenNotification(!openNotification);
        } else {
            window.location.href='/notification';
        }
    }

    const UserAPI = useCallback(async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/me',
                cache: true
            });
            if (response.status === 200) {
                // console.log(response);
                setUser(response.data);
            }
        } catch (err) {
            // console.log(err);
        }
    }, []);

    return (
        <HeaderSection>
            <HeaderContainer>
                <div css={css`${FlexBox()}`}>
                    <Link to="/">
                        <HeaderLogo>
                            <img css={css`height:100%;`} src={require('../../../assets/img/icon/logo.svg')}/>
                        </HeaderLogo>
                    </Link>
                    {/*<input css={css`margin-left:1em; border-radius: 0.3em; padding:0.5em 1em;`} type="text" placeholder="검색어를 입력해주세요."/>*/}
                </div>
                <HeaderMenu>
                    {
                        user ?
                            <div css={css`${FlexBox()};`} ref={NotificationRef}>
                                <div css={css`margin-right:2em; ${media.sm`margin-right:1em;`}`}>
                                    <img css={css`width:1.8em; cursor:pointer;`}
                                         onClick={onNotification}
                                         src={require('../../../assets/img/icon/notification.svg')}/>
                                </div>
                                {
                                    openNotification && <Notification/>
                                }
                                <Link to="/mypage/profile">
                                    <img css={css`width:1.8em;`} src={require('../../../assets/img/icon/profile.svg')}/>
                                </Link>

                            </div>
                            :
                            <>
                                <button css={css`background:${Color.purple200}; 
                                        ${MarkdownSm(Color.white)}; width:80px; height:30px; border-radius: 0.3em; margin-right:0.5em; `}
                                        onClick={() => location.href = '/login'}>로그인
                                </button>
                                <button css={css`background:${Color.white}; border:1px solid ${Color.purple200};
                                        ${MarkdownSm(Color.purple200)}; width:80px; height:30px; border-radius: 0.3em;`}
                                        onClick={() => location.href = '/join/agreement'}>회원가입
                                </button>
                            </>
                    }
                </HeaderMenu>
            </HeaderContainer>
        </HeaderSection>
    )
}

export default Header;
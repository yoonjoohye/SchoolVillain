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
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.16);
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

const SearchInput = styled.input`
  background-image:url(${require('../../../assets/img/icon/search.svg')});
  background-repeat: no-repeat;
  background-position: calc(100% - 1em);
  background-size: 8%;
  margin-left:1em; 
  width:12em; 
  border-radius: 0.5em;
  border:0; 
  background-color:${Color.gray100}; 
  padding:0.7em 1em;
  transition: width 0.5s;
  &:focus{
    width:14em;
  }
  
`
const Header = () => {
    const value = useSelector(state => state.auth.logged);
    const [user, setUser] = useState(null);
    const [openNotification, setOpenNotification] = useState(false);
    const NotificationRef = useRef(null);

    useEffect(() => {
        // UserAPI();
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

    const onNotification = () => {
        if (window.screen.width > 480) {
            setOpenNotification(!openNotification);
        } else {
            window.location.href = '/notification';
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
            console.log(err);
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
                    <SearchInput type="text" placeholder="스쿨빌런 검색"/>
                </div>
                <HeaderMenu>
                    {
                        user ?
                            <div css={css`${FlexBox()}`} ref={NotificationRef}>
                                <div css={css`margin-right:1em; `}>
                                    <div
                                        css={css`background-color:${Color.purple100}; ${FlexBox()}; width:2.5em; height:2.5em; border-radius: 50%; cursor:pointer; `}
                                        onClick={onNotification}>
                                        <img css={css`width:1.1em;`}
                                             src={require('../../../assets/img/icon/notification.svg')}/>
                                    </div>
                                </div>
                                {
                                    openNotification && <Notification/>
                                }
                                <Link to="/mypage/profile">
                                    <div
                                        css={css`background-color:${Color.purple100}; ${FlexBox()}; width:2.5em; height:2.5em; border-radius: 50%;`}>
                                        <img css={css`width:1em;`}
                                             src={require('../../../assets/img/icon/profile.svg')}/>
                                    </div>
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
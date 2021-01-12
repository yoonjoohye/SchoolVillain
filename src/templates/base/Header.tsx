import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import styled from "@emotion/styled";
import {css} from "@emotion/core";
import {MarkdownBase, MarkdownSm} from "../../../assets/style/Markdown.style";
import {FlexBox, onlyMobile, onlyPc} from "../../../assets/style/Layout.style";
import {media} from "../../../assets/style/Media.style";
import {Color} from "../../../assets/style/Color.style";
import {useDispatch, useSelector} from "react-redux";
import Notification from "../../pages/notification/Notification";
import {searchKeyword} from "../../reducers/search";
import {IconMd} from "../../../assets/style/Icon.style";

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
  width:95%;
  ${media.sm`width:90%`};
  margin:auto;
`
const HeaderLogo = styled.div`
  height:1.2em;
  ${media.md`height:1em`}
`
const HeaderMenu = styled.div`
  ${FlexBox()};
  text-align:center;
  min-width: fit-content;
`

interface searchProps {
    keyword: string;
}

const SearchInput = styled.input`
  background-image:url(${require('../../../assets/img/icon/search.svg')});
  background-repeat: no-repeat;
  background-position: 0;
  background-size: 1.5em;
  margin-right:20px;
  width:1.5em; 
  border:none;
  transition: width 0.5s;
  ${
    (props: searchProps) => props.keyword.length > 0 && css`
    width:300px;
    border-bottom: 1px solid #666666;
    padding:0.5em calc(1.5em + 10px);
    &::placeholder{
      opacity: 1;
    }
  `}; 
  &:focus{
    width:300px;
    border-bottom: 1px solid #666666;
    padding:0.5em calc(1.5em + 10px);
    &::placeholder{
      opacity: 1;
    }
  }
  &::placeholder{
    opacity: 0;
  }  
  
`
const HeaderIcon = styled.figure`
 //background:linear-gradient(0deg,#e7c9ff,#fbf7fd); 
 ${FlexBox('row', 'center', 'center')};
 width:3em; 
 height:3em; 
 cursor:pointer;
 ${media.md`width:2.5em; height:2.5em; `}
`
const Header = ({history}: any) => {
    const dispatch = useDispatch();
    const logged = useSelector(state => state.auth.logged);
    const word = useSelector(state => state.search.keyword);
    const count = useSelector(state => state.notification.count);

    const [openNotification, setOpenNotification] = useState(false);
    const [showCategory, setShowCategory]=useState(false);

    const NotificationRef = useRef(null);
    const [keyword, setKeyword] = useState('');
    const searchRef = useRef(null);
    // const [notificationCount,setNotificationCount]=useState(0);

    useEffect(() => {
        setKeyword(word);
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
    }, [word])

    const goSearch = () => {
        history.push('/search');
    }
    const goNotification = () => {
        if (window.screen.width > 480) {
            setOpenNotification(!openNotification);
        } else {
            history.push('/notification');
        }
    }
    const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setKeyword(value);
    }
    const onSearchEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            window.location.href = `/search?keyword=${keyword}`;
            dispatch(searchKeyword(keyword));
        }
    }

    // const focusSearch = () => {
    //     searchRef.current.onfocus = true;
    //     console.log(searchRef);
    // }
    return (
        <HeaderSection>
            <HeaderContainer>
                <Link to="/">
                    <HeaderLogo>
                        <img css={css`height:100%;`} src={require('../../../assets/img/icon/logo.svg')}/>
                    </HeaderLogo>
                </Link>
                <HeaderMenu css={css`${onlyPc()}`}>
                    {
                        logged ?
                            <>
                                <SearchInput type="text" placeholder="무엇을 찾고 계신가요?" value={keyword} keyword={keyword}
                                             ref={searchRef}
                                             onChange={changeKeyword}
                                             onKeyPress={(e: React.KeyboardEvent) => onSearchEnter(e)}/>
                                <div css={css`margin-right:20px; `}
                                     ref={NotificationRef}>
                                    {
                                        count > 0 &&
                                        <figcaption css={css`position: absolute;
                                                margin-left: 1.8em;
                                                margin-top: 0.3em;
                                                border-radius: 50%;
                                                width: 0.5em;
                                                height: 0.5em;
                                                background-color: ${Color.purple200};`}>
                                        </figcaption>
                                    }
                                    <IconMd onClick={goNotification}
                                            src={require('../../../assets/img/icon/noti.svg')}/>
                                    {
                                        openNotification && <Notification/>
                                    }
                                </div>

                                <Link to="/mypage/profile">
                                    <IconMd
                                        src={require('../../../assets/img/icon/mypage.svg')}/>
                                </Link>
                            </>
                            :
                            <>
                                <SearchInput type="text" placeholder="무엇을 찾고 계신가요?" value={keyword} keyword={keyword}
                                             ref={searchRef}
                                             onChange={changeKeyword}
                                             onKeyPress={(e: React.KeyboardEvent) => onSearchEnter(e)}/>

                                <Link css={css` ${MarkdownBase('#242424')};`}
                                      to="/login">로그인
                                </Link>

                            </>
                    }
                </HeaderMenu>

                <HeaderMenu css={css`${onlyMobile()}`}>
                    {
                        logged ?
                            <>
                                <IconMd src={require('../../../assets/img/icon/hamburger.svg')} onClick={()=>setShowCategory(true)}/>
                                {
                                    showCategory &&
                                    <div css={css`position:absolute; right:5%; top:4.5em; border-radius: 5px; background-color:${Color.white}`}>
                                        <IconMd css={css`padding:1em;`} src={require('../../../assets/img/icon/search.svg')} onClick={()=>window.location.href='/search'}/>
                                        <IconMd css={css`padding:1em;`} src={require('../../../assets/img/icon/noti.svg')} onClick={()=>window.location.href='/notification'}/>
                                        <IconMd css={css`padding:1em;`} src={require('../../../assets/img/icon/mypage.svg')} onClick={()=>window.location.href='/mypage/profile'}/>
                                    </div>
                                }
                            </>
                            :
                            <>
                            <div css={css`margin-right:20px; `}>
                                <Link to="/search">
                                    <IconMd src={require('../../../assets/img/icon/search.svg')}/>
                                </Link>
                            </div>
                                <Link to="/login">
                                    로그인
                                </Link>
                            </>
                    }
                </HeaderMenu>
            </HeaderContainer>
        </HeaderSection>
    )
}

export default Header;
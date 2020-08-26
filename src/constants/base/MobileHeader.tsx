import {css} from "@emotion/core";
import {FlexBox} from "../../../assets/style/Layout.style";
import {Link} from "react-router-dom";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownSm} from "../../../assets/style/Markdown.style";
import * as React from "react";

const MobileHeader=()=>{
    return(
        <HeaderSection>
            <HeaderContainer>
                <div css={css`${FlexBox()}`}>
                    <Link to="/">
                        <HeaderLogo>
                            <img css={css`height:100%;`} src={require('../../../assets/img/icon/logo.svg')}/>
                        </HeaderLogo>
                    </Link>
                    <input css={css`margin-left:1em; border-radius: 0.3em; padding:0.5em 1em;`} type="text" placeholder="검색어를 입력해주세요."/>
                </div>
                <HeaderMenu>

                    {
                        user ?
                            <div css={css`${FlexBox()}`}>
                                <Link to="/mypage/profile"><img css={css`width:2em;`}
                                                                src={require('../../../assets/img/icon/profile.svg')}/></Link>
                                <span>
                                    알림
                                </span>
                            </div>
                            :
                            <>
                                <button css={css`background:${Color.purple200}; 
                                        ${MarkdownSm(Color.white)}; width:80px; height:30px; border-radius: 0.3em; margin-right:0.5em; `}
                                        onClick={()=>location.href='/login'}>로그인</button>
                                <button css={css`background:${Color.white}; border:1px solid ${Color.purple200};
                                        ${MarkdownSm(Color.purple200)}; width:80px; height:30px; border-radius: 0.3em;`}
                                        onClick={()=>location.href='/join/agreement'}>회원가입</button>
                            </>
                    }
                </HeaderMenu>


            </HeaderContainer>
        </HeaderSection>
    )
}
export default MobileHeader;
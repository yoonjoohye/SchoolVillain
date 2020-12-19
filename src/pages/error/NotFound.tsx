import * as React from 'react';
import {FlexBox, Section} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";
import {Display2, MarkdownBase, MarkdownLg, MarkdownMdx} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";

const NotFound = ({ history }) => {
    const goMain=()=>{
        history.push('/');
    }
    const goBack=()=>{
        history.go(-1);
    }
    return (
        <section css={css` ${Section()} ${FlexBox('column','center','center')} `}>
            <div css={css`${Display2('',500)}; margin-bottom:20px;`}>죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.</div>
            <div css={css`${MarkdownBase('#666')}; text-align:center; margin-bottom:50px;`}>
                존재하지 않는 주소를 입력하셨거나,<br/>
                요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
            </div>
            <div>
                <button css={css`margin-right:10px; ${MarkdownMdx(Color.white)}; width: 215px; padding:10px 0; background: #951DE4; border-radius: 5px;`} onClick={goMain}>메인으로</button>
                <button css={css`margin-right:10px; ${MarkdownMdx('#A9A9A9')}; width: 215px; padding:10px 0; background: #DFDFDF; border-radius: 5px;`} onClick={goBack}>이전 페이지</button>
            </div>
        </section>
    )
}

export default NotFound;
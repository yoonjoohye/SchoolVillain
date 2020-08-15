import {Link} from "react-router-dom";
import * as React from "react";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox} from "../../../assets/style/Layout.style";
import {MarkdownBase} from "../../../assets/style/Markdown.style";

interface propsType {
    banner: any;
}

const SideBanner: React.FC<propsType> = ({banner}) => {
    return (
        <section>
            <Link to="/banner/apply">
                <img css={css`width:100%; margin-bottom:0.5em;`} src="../../../assets/img/banner/chanyeol.jpg"/>
            </Link>
            <Link to="/banner/apply">
                <img css={css`width:100%; margin-bottom:0.5em;`} src="../../../assets/img/banner/twice.jpg"/>
            </Link>

            <a href="https://pf.kakao.com/_QxakAK" target="_blank">
                <div
                    css={css`background-color:${Color.kakao}; padding:0.5em 0; ${FlexBox()}; ${MarkdownBase('#3b1c1c', 500)}`}>
                    <img css={css`height:2.5em;`} src="../../../assets/img/icon/kakao.png"/>
                    <span css={css`font-weight:700;`}>스쿨빌런 </span>으로 배너 문의주세요!
                </div>
            </a>
        </section>
    )
}

export default SideBanner;
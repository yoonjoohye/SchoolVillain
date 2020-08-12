import {Link} from "react-router-dom";
import * as React from "react";
import {css} from "@emotion/core";

const SideBanner=()=>{
    return(
        <section>
            <Link to="/banner/apply">
                <img css={css`width:100%; margin-bottom:1em;`} src="../../../assets/img/banner/chanyeol.jpg"/>
                <img css={css`width:100%; margin-bottom:1em;`} src="../../../assets/img/banner/twice.jpg"/>
                <div>나의 최애 배너등록하러가기 →</div>
            </Link>
        </section>
    )
}

export default SideBanner;
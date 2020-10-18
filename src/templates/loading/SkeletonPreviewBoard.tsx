import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import * as React from "react";
import {media} from "../../../assets/style/Media.style";
import {SkeletonColor} from "../../../assets/style/Util";

const SkeletonPreviewBoard = () => {

    return (
        <div css={css`margin-bottom:40px; display:grid; grid-template-columns:1fr 1fr 1fr 1fr; grid-gap:40px;`}>
            {
                [1, 2, 3, 4].map((item: number) => {
                    return (
                        <article css={css`padding:20px; background-color:#fafafa;`}>
                            <div css={css`width:15%; height:1em; margin-bottom:20px; ${SkeletonColor()};`}></div>
                            <div
                                css={css`width:90%; height:2em; ${SkeletonColor()}; margin-bottom:10px;`}></div>
                            <div css={css`width:100%; height:1em; ${SkeletonColor()}; margin-bottom:30px;`}></div>

                            <div css={css`width:100%; height:0.8em; ${SkeletonColor()};`}></div>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default SkeletonPreviewBoard;
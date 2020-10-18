import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import * as React from "react";
import {media} from "../../../assets/style/Media.style";
import {SkeletonColor} from "../../../assets/style/Util";
import {FlexBox} from "../../../assets/style/Layout.style";

const SkeletonPreviewBoard = () => {

    return (
        <div css={css`margin-bottom:40px; display:grid; grid-template-columns:1fr 1fr 1fr 1fr; grid-gap:40px;`}>
            {
                [1, 2, 3, 4].map((item: number) => {
                    return (
                        <article css={css`${FlexBox('column','space-between')}; padding:20px; height:280px; background-color:#fafafa;`}>
                            <div css={css`width:100%;`}>
                                <div css={css`width:30%; height:2em; margin-bottom:20px; ${SkeletonColor()};`}></div>
                                <div
                                    css={css`width:90%; height:2em; ${SkeletonColor()}; margin-bottom:10px;`}></div>
                                <div css={css`width:100%; height:1.5em; ${SkeletonColor()}; margin-bottom:30px;`}></div>
                            </div>
                            <div css={css`width:100%; height:0.8em; ${SkeletonColor()};`}></div>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default SkeletonPreviewBoard;
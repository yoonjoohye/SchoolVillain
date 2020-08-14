import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import * as React from "react";
import {media} from "../../../assets/style/Media.style";

const SkeletonPreviewBoard = () => {
    return (
        <article css={css`min-height:150px;
                      padding:1.8em 5%;
                      background-color:${Color.white};
                      margin-top:1.5em;
                      box-shadow: 0 3px 5px #00000021;`}>
            <div css={css`display:flex; justify-content: space-between; margin-bottom:1em;`}>
                <div css={css`width:75%; margin-right:1em;`}>
                    <div
                        css={css`width:90%; height:2em; background: #eee; margin-bottom:0.5em;`}></div>
                    <div css={css`width:100%; height:1em; background: #eee;`}></div>
                </div>
                <div css={css`width:20%; height:5em; background: #eee; ${media.sm`width:25%; height:4em;`}`}></div>
            </div>

            <div css={css`margin-bottom:1em;`}>
                {[1, 2, 3].map((item,index) => {
                    return (
                        <div key={index} css={css`display:inline-block; width:3em; height:1.5em; background-color:#eee; margin-right:0.5em;`}></div>
                    )
                })}
            </div>

            <div css={css`display:flex; justify-content: space-between; margin-top:1em;`}>
                <div>
                    <div
                        css={css`display:inline-block; width:4em; height:1.2em; background-color:#eee; margin-right:0.5em;`}></div>
                    <div css={css`display:inline-block; width:4em; height:1.2em; background-color:#eee;`}></div>
                </div>
                <div>
                    <div
                        css={css`display:inline-block; width:4em; height:1.2em; background-color:#eee; margin-right:0.5em;`}></div>
                    <div css={css`display:inline-block; width:4em; height:1.2em; background-color:#eee;`}></div>
                </div>
            </div>

        </article>
    )
}

export default SkeletonPreviewBoard;
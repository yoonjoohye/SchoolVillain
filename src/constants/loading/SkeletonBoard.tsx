import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownBase} from "../../../assets/style/Markdown.style";
import {IconSm} from "../../../assets/style/Icon.style";
import React from "react";

const SkeletonBoard = () => {
    return (
        <>
            <div css={css`width:80%; height:2em; background-color:${Color.gray100}; margin-bottom:1em;`}></div>
            <div css={css`margin-bottom:2em;`}>
                <div css={css`width:5em; height:1.2em; background-color:${Color.gray100}; margin-bottom:0.2em;`}></div>
                <div css={css`width:15em; height:1.2em; background-color:${Color.gray100};`}></div>
            </div>

            <div css={css`width:100%; height:10em; background-color:${Color.gray100}; margin-bottom:1em;`}></div>

            <div css={css`margin-bottom:1em`}>
                {

                        [1,2,3].map((tag: any) => {
                            return (
                                <div css={css`display:inline-block; width:3em; height:1em; background-color:${Color.gray100}; margin-right:0.5em;`} key={tag}></div>
                            )
                        })
                }
            </div>

            <div css={css`margin-bottom:1em;`}>
                <div css={css`display:inline-block; width:5em; height:1.2em; background-color:${Color.gray100}; margin-right:0.5em;`}></div>
                <div css={css`display:inline-block; width:5em; height:1.2em; background-color:${Color.gray100};`}></div>
            </div>
        </>
    )
}
export default SkeletonBoard;
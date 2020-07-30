import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownSm} from "../../../assets/style/Markdown.style";
import {Link} from "react-router-dom";
import React from "react";

const SkeletonProfile = () => {
    return (
        <div css={css`
                  display:flex;
                  padding:1em;
                  box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16);
                  margin-bottom:1em;
                  text-align:center;`}>
            <div css={css`background-color:#eee; width:40%; height:4em; margin-right:0.5em;`}></div>
            <div css={css`width:60%;`}>
                <div css={css`background-color:#eee; width:60%; height:1em; margin-bottom:0.5em;`}></div>
                <div css={css`background-color:#eee; width:100%; height:1em; margin-bottom:0.5em;`}></div>
                <div css={css`background-color:#eee;  width:70%; height:1em;`}></div>
            </div>
        </div>
    )
}
export default SkeletonProfile;
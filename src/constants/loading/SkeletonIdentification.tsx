import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownSm} from "../../../assets/style/Markdown.style";
import {Link} from "react-router-dom";
import React from "react";
import {FlexBox} from "../../../assets/style/Layout.style";

const SkeletonIdentification = () => {
    return (
        <div css={css`
                  margin-bottom:1em;
                  height:250px;
                  box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16);
                  text-align:center;`}>
            <div
                css={css`${FlexBox('', 'space-between', 'center')}; background-color:${Color.gray100}; width:100%; height:5em; margin-bottom:0.5em;`}>
            </div>
            <div css={css`padding:1em;`}>
                <div css={css`background-color:${Color.gray100}; width:60%; height:2em; margin-bottom:1em;`}></div>
                <div css={css`background-color:${Color.gray100}; width:70%; height:1em; margin-bottom:0.3em;`}></div>
                <div css={css`background-color:${Color.gray100};  width:70%; height:1em; margin-bottom:1.5em;`}></div>
                <div css={css`background-color:${Color.gray100}; width:100%; height:1em;`}></div>
            </div>
        </div>
    )
}
export default SkeletonIdentification;
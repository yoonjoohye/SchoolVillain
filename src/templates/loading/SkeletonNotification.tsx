import {css} from "@emotion/core";
import React from "react";
import {SkeletonColor} from "../../../assets/style/Util";
import {Grid} from "../../../assets/style/Layout.style";
import {media} from "../../../assets/style/Media.style";

const SkeletonNotification = () => {
    return (
        <>
            {
                [1, 2].map((item, index) => {
                    return (
                        <div key={index} css={css`padding: 20px 0; ${media.sm`padding:1.5em 0;`} ${Grid(15, 85)};`}>
                            <div
                                css={css`text-align:center; ${SkeletonColor()}; width:1.5em; height:1.5em;`}></div>

                            <div css={css`${SkeletonColor()}; height:1.5em; width:100%`}></div>
                        </div>
                    )
                })
            }
        </>
    )
}
export default SkeletonNotification;
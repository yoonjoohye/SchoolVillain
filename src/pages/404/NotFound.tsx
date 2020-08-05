import * as React from 'react';
import {FlexBox, Section} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";

const NotFound = () => {
    return (
        <section css={css` ${Section()} ${FlexBox()} `}>
            <div>NotFound | 404</div>

        </section>
    )
}

export default NotFound;
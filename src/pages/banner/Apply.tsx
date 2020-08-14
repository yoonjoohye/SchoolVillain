import styled from "@emotion/styled";
import {FlexBox, Section} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";
import {media} from "../../../assets/style/Media.style";

const ApplySection=styled.section`
  margin-top:4em;
  ${FlexBox()};
`
const ApplyImg=styled.img`
  display:block;
  ${media.sm`width:100%;`}
`
const Apply=()=>{
    return(
        <ApplySection>
            <ApplyImg src="../../../assets/img/banner/apply.png"/>
            <div css={css`position:fixed; bottom:0; padding:1em 0; ${FlexBox()}; `}>
                <a href="https://pf.kakao.com/_QxakAK" target="_blank">https://pf.kakao.com/_QxakAK</a>
            </div>
        </ApplySection>
    )
}

export default Apply;
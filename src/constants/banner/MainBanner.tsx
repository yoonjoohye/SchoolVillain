import {Link} from "react-router-dom";
import * as React from "react";
import styled from "@emotion/styled";
import {MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";

const BannerSection = styled.section`
  margin-top:1em;
`
const BannerImg = styled.img`
  position: relative;
  vertical-align: middle;
  width:100%;
`
const BannerTag = styled.div`
  ${MarkdownSm(Color.white)};
  background-color:${Color.purple200};
  text-align: center;
  box-shadow: 0 3px 5px #00000021;
`
const MainBanner=()=>{
    return(
        <BannerSection>
            <Link to="/banner">
                <BannerImg src="../../../assets/img/banner/example.jpg"/>
                <BannerTag>나의 최애 배너등록하러가기 →</BannerTag>
            </Link>
        </BannerSection>
    )
}
export default MainBanner;
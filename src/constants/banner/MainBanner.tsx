import {Link} from "react-router-dom";
import * as React from "react";
import styled from "@emotion/styled";
import {MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";

const BannerSection = styled.section`
  margin-top:2em;
  background-image: linear-gradient(to left, #cb61f8, #7c2bdc 50%, #8e6dff);
  padding:1.5em;
  border-radius: 0.3em;
`
const BannerImg = styled.img`
  position: relative;
  vertical-align: middle;
  width:100%;
`
const BannerTag = styled.div`
  //margin-top:1em;
  padding:0.5em;
  ${MarkdownSm(Color.white,500)};
  background-color:rgba(0,0,0,0.18);
  text-align: center;
  box-shadow: 0 3px 5px #00000021;
`
interface propsType {
    banner:any;
}
const MainBanner:React.FC<propsType>=({banner})=>{
    return(
        <BannerSection>
            {

                <Link to="/banner/apply">
                    <BannerImg src="../../../assets/img/banner/example.jpg"/>
                    <BannerTag>나의 배너 등록하러가기</BannerTag>
                </Link>
            }
        </BannerSection>
    )
}
export default MainBanner;
import {Link} from "react-router-dom";
import * as React from "react";
import styled from "@emotion/styled";
import {MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import {memo} from "react";
import {css} from "@emotion/core";
import {media} from "../../../assets/style/Media.style";
import {SkeletonColor} from "../../../assets/style/Util";

const BannerSection = styled.section`
  margin-top:1em;
  margin-bottom:1em;
  border-radius: 0.3em;
`
const BannerImg = styled.img`
  display:block;
  position: relative;
  vertical-align: middle;
  width:100%;
  border-radius: 0.3em;
`
const BannerTag = styled.div`
  padding:0.5em;
  ${MarkdownSm(Color.white, 500)};
  background-color:rgba(0,0,0,0.18);
  text-align: center;
  box-shadow: 0 3px 5px #00000021;
`

interface propsType {
    banner: any;
}

const MainBanner: React.FC<propsType> = ({banner}) => {
    return (
        banner ?
            <BannerSection>
                {
                    banner.banner_count < 0 ?
                        <a href={banner.banner[0].link} target="_blank">
                            <BannerImg src={banner.banner[0].path}/>
                        </a>
                        :
                        <Link to="/banner/apply">
                            <BannerImg src={require('../../../assets/img/banner/main_banner.svg')}/>
                        </Link>
                }
            </BannerSection>
            :
            <div css={css` margin-top:1em; width:100%; height:14em; ${media.sm`height:8em;`} ${SkeletonColor()};`}></div>
    )
}
export default memo(MainBanner);
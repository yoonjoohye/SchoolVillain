import {Link} from "react-router-dom";
import * as React from "react";
import {css} from "@emotion/core";
import {memo} from "react";
import styled from "@emotion/styled";
import {SkeletonColor} from "../../../assets/style/Util";

interface propsType {
    banner: any;
}

const BannerImg = styled.img`
  width:100%; 
  margin-top:1em;
  margin-bottom:1em;
  display:block;
  cursor:pointer;
  border-radius: 0.3em;
`

const SideBanner: React.FC<propsType> = ({banner}) => {
    return (
        <section>
            {
                banner.length>0 ?
                banner.map((item: any, index: number) => {
                    return (
                        item.banner_count > 0 ?
                            <a href={item.banner[0].link} key={index}>
                                <BannerImg src={item.banner[0].path}/>
                            </a> :
                            index === 0 &&
                            <Link to="/banner/apply" key={index}>
                                <BannerImg src={require('../../../assets/img/banner/side_banner.png')}/>
                            </Link>
                    )
                }):
                <div css={css`margin-top:1em; width:100%; height:5em; ${SkeletonColor()};`}></div>
            }
        </section>
    )
}

export default memo(SideBanner);
import React, {useState} from 'react';
import styled from "@emotion/styled";
import {css} from "@emotion/core";
import {MarkdownBase, MarkdownLg, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import SkeletonIdentification from "../loading/SkeletonIdentification";

const IdentificationWrapper = styled.div`
  width:100%;
  background:#fff;
  box-shadow: 0 0 4px rgba(152, 149, 149, 0.25);
  text-align:center;
`
const IdentificationImg = styled.img`
  width:100%;
  height: 150px;
`
const Identification = ({user}: any) => {
    return (
        <>
            {
                user ?
                    <IdentificationWrapper>
                        <div css={css`padding:30px;`}>
                        <IdentificationImg src={require('../../../assets/img/profile.svg')}/>
                        <div css={css`margin-top:10px;`}>
                            <div css={css`${MarkdownMd('', 400)}; margin-right:10px;`}>{user.name || '익명'}</div>
                            <div css={css`${MarkdownBase('#A9A9A9', 400)};`}>뉴비</div>
                        </div>
                        </div>
                    </IdentificationWrapper>
                    :
                    <SkeletonIdentification/>
            }
        </>
    )
}
export default Identification;
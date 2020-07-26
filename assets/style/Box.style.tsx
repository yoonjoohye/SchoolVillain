import {css} from "@emotion/core";
import styled from "@emotion/styled";
import {media} from "./Media.style";

export const FlexBox = (justifyContent: string = 'center', alignItems: string = 'center') => css`
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
`;

export const Section=()=>css` 
  padding:4em 15%;
  min-height:100vh;
  ${media.sm`padding:4em 5%`}
`

export const onlyPc=()=>css`
  display:initial;
  ${media.sm`display:none;`}
`

export const onlyMobile=()=>css`
  display:none;
  ${media.sm`display:initial;`}
`

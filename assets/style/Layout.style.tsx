import {css} from "@emotion/core";
import {media} from "./Media.style";

export const FlexBox = (flexDirection:string='row', justifyContent: string = 'center', alignItems: string = 'center') => css`
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
`;

export const Section=()=>css` 
  padding:0 15%;
  min-height:100vh;
  ${media.md`padding:0 8%;`};
  ${media.sm`padding:0 5%`};
`

export const onlyPc=()=>css`
  display:initial;
  ${media.sm`display:none;`}
`

export const onlyMobile=()=>css`
  display:none;
  ${media.sm`display:initial;`}
`

export const Position=(position:string)=>css`
  position:${position};
`;

export const Margin=(top:number=0, right:number=0, bottom:number=0, left:number=0)=>css`
  margin:${top}em ${right}em ${bottom}em ${left}em;
`;

export const Padding=(top:number=0, right:number=0, bottom:number=0, left:number=0)=>css`
  padding:${top}em ${right}em ${bottom}em ${left}em;
`;

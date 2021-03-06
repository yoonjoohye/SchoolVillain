import styled from "@emotion/styled";
import {media} from "./Media.style";

export const IconSm = styled.img`
  width:15px;
  height:15px;
  ${media.sm`width:12px; height:12xp;`}
`
export const IconBase = styled.img`
  position: relative;
  vertical-align: text-top;
  width:30px;
  height:30px;
`
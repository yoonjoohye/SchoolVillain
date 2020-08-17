
import { keyframes } from '@emotion/core';
import {Color} from "./Color.style";
import {media} from "./Media.style";

export const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const FadeOut=keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const Cursor=keyframes`
    0%{border-right: 2px solid transparent;}
    50%{border-right: 2px solid ${Color.purple200};}
    100%{border-right: 2px solid transparent;}
`;

export const TypingPc=keyframes`
    from { width: 0; }
    to { width: 165px; }
`

export const TypingMobile=keyframes`
    from { width: 0; }
    to { width: 135px; }
`
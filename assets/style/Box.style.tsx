import {css} from "@emotion/core";

export const FlexBox = (justifyContent: string = 'center', alignItems: string = 'center') => css`
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
`;

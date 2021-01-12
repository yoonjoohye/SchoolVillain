import {css} from '@emotion/core';
import {media} from './Media.style';
import {Color} from './Color.style';


export const MarkdownXl = (color: string = Color.black, weight: number = 400) => css`
      font-size: 50px;
      font-weight: ${weight};
      color: ${color};
      ${media.sm`font-size: 28px;`}
`;
export const MarkdownLg = (color: string = Color.black, weight: number = 400) => css`
      font-size: 28px;
      font-weight: ${weight};
      color: ${color};
      ${media.sm`font-size: 22px;`}
`;

export const Display2 = (color: string = Color.black, weight: number = 500) => css`
      font-size: 24px;
      font-weight: ${weight};
      color: ${color};
      ${media.sm`font-size: 22px;`}
`;


export const MarkdownLgx = (color: string = Color.black, weight: number = 400) => css`
      font-size: 22px;
      font-weight: ${weight};
      color: ${color};
      ${media.sm`font-size: 20px;`}
`;

export const MarkdownMd = (color: string = Color.black, weight: number = 400) => css`
      font-size: 20px;
      font-weight: ${weight};
      color: ${color};
      ${media.sm`font-size: 18px;`}
`;
export const MarkdownMdx = (color: string = Color.black, weight: number = 400) => css`
      font-size: 18px;
      font-weight: ${weight};
      color: ${color};
      ${media.sm`font-size: 16px;`}
`;
export const MarkdownBase = (color: string = Color.black, weight: number = 400) => css`
      font-size: 16px;
      font-weight: ${weight};
      color: ${color};
      ${media.sm`font-size: 14px;`}
`;
export const MarkdownBody = (color: string = Color.black, weight: number = 400) => css`
      font-size: 14px;
      font-weight: ${weight};
      color: ${color};
      ${media.sm`font-size: 13px;`}
`;
export const MarkdownSm = (color: string = Color.black, weight: number = 400) => css`
      font-size: 13px;
      font-weight: ${weight};
      color: ${color};
      ${media.sm`font-size: 12px;`}
`;
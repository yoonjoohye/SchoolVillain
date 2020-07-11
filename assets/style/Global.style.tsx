import {Global, css} from '@emotion/core';
import {Color} from './Color.style';
import * as React from "react";
import {media} from './Media.style';

export const GlobalStyle = () => (
    <Global styles={css`
    *{
      margin:0;
      padding:0;
    }
    html {
      width: 100%;
      height: 100%;
    }
    
    body {
      width: 100%;
      font-family: 'NanumSquare', sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      color: ${Color.black};
      ${media.sm`font-size: 14px;`}
    }
    
    textarea {
      font-family: 'NanumSquare', sans-serif;
      font-size: 16px;
      line-height: 1.5;

    }
    
    input {
      font-family: 'NanumSquare', sans-serif;
      font-size: 16px;
      line-height: 1.5;
    }
    button{
      border:0;
      cursor:pointer;
    }
    li {
      margin:0;
      padding: 0;
      list-style: none;
    }
    
    ol, ul {
      margin: 0;
      padding: 0;
    }
    
    a {
      text-decoration: none;
      color: ${Color.black};
    }
    
    @font-face {
     font-family: 'NanumSquare';
     font-weight: 300;
     src: local('NanumSquare'),
          url(require('../font/NanumSquareL.eot')),
          url(require('../font/NanumSquareL.eot?#iefix')) format('embedded-opentype'),
          url(require('../font/NanumSquareL.woff')) format('woff'),
          url(require('../font/NanumSquareL.ttf')) format('truetype');
    }
    
    @font-face {
     font-family: 'NanumSquare';
     font-weight: 400;
     src: local('NanumSquare'),
          url(require('../font/NanumSquareR.eot')),
          url(require('../font/NanumSquareR.eot?#iefix')) format('embedded-opentype'),
          url(require('../font/NanumSquareR.woff')) format('woff'),
          url(require('../font/NanumSquareR.ttf')) format('truetype');
    }
`}></Global>
)
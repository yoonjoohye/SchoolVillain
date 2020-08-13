import React from "react";
import styled from "@emotion/styled";
import {Color} from '../../../assets/style/Color.style';
import {MarkdownMd} from "../../../assets/style/Markdown.style";

interface buttonProps {
    enabled: boolean;
}
const Button = styled.button`
  ${MarkdownMd(Color.white)};
  width:100%;
  height: 45px;
  border-radius: 0.3em;
  box-shadow: 0 1.5px 2.5px 0 rgba(0, 0, 0, 0.16);
  margin-top:30px;
  ${(props: buttonProps) => props.enabled ?
    `pointer-events:initial;
     background-color:${Color.purple200};
    ` :
    `pointer-events:none;
     background-color:${Color.purple100};
    `
    }
  &:hover{
    background-color: ${Color.purple300};
  }
`

interface propsType {
    goJoin: any;
    enabled: boolean;
}

const JoinButton: React.FC<propsType> = ({goJoin, enabled}) => {
    return (
        <Button enabled={enabled} onClick={() => goJoin()}>다음</Button>
    )
}

export default JoinButton;
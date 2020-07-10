import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Box.style";
import {media} from "../../../assets/style/Media.style";
import Agreement from "../../constants/join/Agreement";
import Email from "../../constants/join/Email";
import Password from "../../constants/join/password";

const JoinSection = styled.section`
  padding:0 10%;
  min-height:100vh;
  ${FlexBox()};
`
const JoinContainer = styled.article`
  width:500px;
  ${media.sm`width:100%;`}
`

const Join: React.FC = ({match}: any) => {
    const [page, setPage] = useState(Number(match.params.id));
    let joinComponent;

    const goNext = (pageNo:number) => {
        setPage(pageNo);
        window.history.pushState('','',`/join/${pageNo}`);
    }

    if (page===1){
        joinComponent=<Agreement/>;
    }else if(page===2){
        joinComponent=<Email/>;
    }else if(page===3){
        joinComponent=<Password/>;
    }

    return (
        <JoinSection>
            <JoinContainer>
                {joinComponent}
                <button onClick={()=>goNext(page+1)}>다음</button>
            </JoinContainer>
        </JoinSection>
    )
}
export default Join;

import styled from "@emotion/styled";
import {Section} from "../../../assets/style/Layout.style";

const ApplySection=styled.section`
  ${Section()};
  margin-top:6em;
`
const Apply=()=>{
    return(
        <ApplySection>
            <div>
                신청하기
            </div>
            <div>
                <a href="https://pf.kakao.com/_QxakAK" target="_blank">https://pf.kakao.com/_QxakAK</a>
            </div>
        </ApplySection>
    )
}

export default Apply;
import React from 'react';
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {Link} from "react-router-dom";

const ProfileSection = styled.section`
  padding:3em;
  border-radius: 3em;
  box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.16);
`

interface btnProps {
    color: string;
}

const AuthBtn = styled.div`
  background-color:${(props: btnProps) => props.color};
  text-align:center;

`
const Profile = () => {
    return (
        <ProfileSection>
            <div>아직 스쿨빌런에 가입을 하지 않으셨나요?</div>
            <AuthBtn color={Color.purple100}>
                <Link to="/login">로그인</Link>
            </AuthBtn>
            <AuthBtn color={Color.yellow100}>
                <Link to="/join">회원가입</Link>
            </AuthBtn>
        </ProfileSection>
    )
}
export default Profile;
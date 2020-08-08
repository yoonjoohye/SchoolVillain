import {useState} from "react";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";

const Profile=()=>{

    const [previewImg,setPreviewImg]=useState('');

    const loadImg=(e:React.ChangeEvent<HTMLInputElement>)=>{

    }

    return(
        <section>
            <div>
                <span css={css`color:${Color.purple200}`}>aaa@naver.com</span> 님, 스쿨빌런에 오신 것을 환영합니다.
            </div>
            <div>
                학생증
                <input type="file" id="id" onChange={loadImg}/>
                <label htmlFor="id">학생증 추가</label>
                <img src={previewImg}/>
            </div>
            <div>
                <div>
                    <label>닉네임</label>
                    <input type="text" placeholder="닉네임 입력"/>
                </div>
                <div>
                    <label>스쿨빌런 계정</label>
                    <input type="text" placeholder="계정 입력" disabled/>
                </div>
                <div>
                    <label>현재 비밀번호</label>
                    <input type="password" placeholder="현재 비밀번호 입력"/>
                </div>
                <div>
                    <label>새로운 비밀번호</label>
                    <input type="password" placeholder="새로운 비밀번호 입력"/>
                </div>
                <div>
                    <label>새로운 비밀번호 확인</label>
                    <input type="password" placeholder="새로운 비밀번호 입력"/>
                </div>
            </div>
            <div>
                <button>회원정보수정</button>
            </div>
            <div>
                <button>로그아웃</button>
            </div>
            <div>
                <button>회원탈퇴</button>
            </div>
        </section>
    )
}
export default Profile;
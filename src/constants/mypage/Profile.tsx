import {useState} from "react";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import axios from "axios";
import styled from "@emotion/styled";
import {MarkdownBase, MarkdownMd} from "../../../assets/style/Markdown.style";

const Input = styled.input`
    ${MarkdownBase()};
    width:100%;
    border:0;
    border-bottom:1px solid ${Color.gray100};
    outline:none;
    padding:10px 0 10px 0;
    margin-bottom:10px;
`


const Profile=()=>{

    const [img, setImg]=useState(null);
    const [preview,setPreview]=useState(null);

    const loadImg=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {files} = e.target;

        console.log(files[0]);

        //사이즈 유효성
        if (files[0].size > 2 * 1024 * 1024) {
            alert('이미지 사이즈가 2mb를 넘습니다.');
        } else {
            setImg(files[0]);

            //이미지 url 정보 담기
            let reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            }
            reader.readAsDataURL(files[0]);
        }
    }
    const goLogout=async()=>{
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/logout'
            });
            console.log(response);
            if (response.status === 204) {
                sessionStorage.removeItem('logged');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <section>
            <div>
                <span css={css`color:${Color.purple200}`}>aaa@naver.com</span> 님, 스쿨빌런에 오신 것을 환영합니다.
            </div>
            <div>
                학생증
                <input type="file" id="id" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>loadImg(e)} accept="image/jpg, image/png, image/jpeg"/>
                <label htmlFor="id">학생증 추가</label>
                <img src={preview}/>
            </div>

            <div>
                <div>
                    <label>닉네임</label>
                    <Input type="text" placeholder="닉네임 입력"/>
                </div>
                <div>
                    <label>스쿨빌런 계정</label>
                    <Input type="text" placeholder="계정 입력" disabled/>
                </div>
                <div>
                    <label>현재 비밀번호</label>
                    <Input type="password" placeholder="현재 비밀번호 입력"/>
                </div>
                <div>
                    <label>새로운 비밀번호</label>
                    <Input type="password" placeholder="새로운 비밀번호 입력"/>
                </div>
                <div>
                    <label>새로운 비밀번호 확인</label>
                    <Input type="password" placeholder="새로운 비밀번호 입력"/>
                </div>
            </div>

            <div>
                <button>회원정보수정</button>
            </div>

            <div>
                <button onClick={goLogout}>로그아웃</button>
                <button>회원탈퇴</button>
            </div>
        </section>
    )
}
export default Profile;
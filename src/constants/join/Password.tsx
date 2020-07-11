import React, {useState} from "react";

const Password:React.FC=()=>{
    const [password,setPassword]=useState('');

    const passwordChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
    }
    return(
        <>
            <div>
                패스워드
            </div>
            <div>
                <input type="password" value={password} onChange={passwordChange} placeholder="패스워드를 입력해주세요."/>
            </div>
        </>
    )
}
export default Password;
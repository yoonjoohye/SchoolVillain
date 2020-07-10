import React, {useState} from "react";

const Email:React.FC=()=>{
    const [email,setEmail]=useState('');

    const emailChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
       setEmail(e.target.value);
    }
    return(
        <>
            <div>
                이메일
            </div>
            <div>
                <input type="text" value={email} onChange={emailChange} placeholder="이메일을 입력해주세요."/>
            </div>
        </>
    )
}
export default Email;
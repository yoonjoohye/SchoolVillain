import {css} from "@emotion/core";
import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox} from "../../../assets/style/Layout.style";
import Write from "../../pages/board/Write";

const WriteSection = styled.section`
  width:100%;
`
const WriteContainer = styled.div`
  ${FlexBox('','flex-start','center')};
  box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.15);
  color:${Color.purple200};
  padding:2em;
  cursor:pointer;
  &:hover{
    background-color:${Color.purple100};
  }
`

const PreviewWrite = () => {
    const [openModal,setOpenModal]=useState(false);

    const goWrite=()=>{
        if(screen.width>480){
            setOpenModal(true);
        }else{
            location.href='/write';
        }
    }
    const isOpen=(open:boolean)=>{
        setOpenModal(open);
    }

    return (
        <>
            <WriteSection>
                <div onClick={goWrite}>
                    <WriteContainer>
                        <img css={css`width:2em; height:2em; margin-right:10px;`} src={require('../../../assets/img/icon/edit.svg')}/>
                        빌런아, 오늘 있었던 일 뭐야?
                    </WriteContainer>
                </div>
            </WriteSection>
            {
                openModal ?
                <Write isOpen={isOpen}/>:null
            }
        </>
    )
}

export default PreviewWrite;
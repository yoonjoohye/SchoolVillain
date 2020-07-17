import * as React from 'react';
import SEO from "../SEO/SEO";
import {useState} from "react";
import styled from "@emotion/styled";
import Banner from "../../constants/banner/Banner";
import Board from "../../constants/board/Board";

const IndexSection = styled.section`
  padding:60px 0;
  min-height:100vh;
  background-color:#eeeeee;
`

const Index: React.FC = ({history}: any) => {
    const [list, setList] = useState([
        {
            title: '우리학교 이거 말이 된다고 생각함?',
            contents: '우리학교 이거 말이 된다고 생각함??????? ㄹㅇ 답없음.아니, 내말 한번 들어봐봐. 수학여행가기로 했단말임? 근데 갑자기 코로나 어쩌고 하면서 제주도도 아니고 부산을 처 간다는게 말이나 되냐고;; 진짜 ㅈㄴ 개빡쳐 ㅅㅂ',
            tag: ['학교', '비리', '화남'],
            like: 1,
            comment: 13,
            date: '어제',
            view: 3242,
            thumbnail: ''
        },
        {
            title: '전지현 존나 예쁨',
            contents: '있자나 그거 그거ㅡ거ㅡ거 어쩌구저쩌구',
            tag: ['연예인', '최애', '존예'],
            like: 3,
            comment: 1,
            date: '오늘',
            view: 31,
            thumbnail: ''
        }]);

    const goDetail = (index: number) => {
        history.push(`/detail/${index}`);
    }

    return (
        <>
            <SEO title="스쿨빌런"
                 description="스쿨빌런 메인 페이지입니다."
                 keywords="스쿨빌런 메인 페이지"
            />
            <IndexSection>
                <Banner/>
                {list.map((data, index) => {
                    return (
                        <Board key={index} data={data} index={index} goDetail={goDetail}/>
                    )
                })}
            </IndexSection>
        </>
    )
}

export default Index;
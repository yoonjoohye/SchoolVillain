import * as React from 'react';
import SEO from "../../constants/SEO/SEO";
import {useState} from "react";
import styled from "@emotion/styled";
import {media} from "../../../assets/style/Media.style";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownBase, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {FlexBox} from "../../../assets/style/Box.style";
import {Link} from "react-router-dom";

const IndexSection = styled.section`
  padding:60px 0;
  min-height:100vh;
  background-color:#eeeeee;
`

const CardSection = styled.section`
  cursor:pointer;
  min-height:150px;
  padding:30px 5% 20px 5%;
  background-color:${Color.white};
  margin-bottom:10px;
  box-shadow: 0 3px 5px #00000021;
`

const CardContainer = styled.div`
  ${FlexBox('space-between', 'center')};
  ${MarkdownSm(Color.gray200)};
`
const CardTitle = styled.div`
  ${MarkdownBase()};
`
const CardContents = styled.div`
  ${MarkdownBase('', 300)};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  width: 100%;
  height: 60px;
`
const CardTag = styled.span`
  ${MarkdownSm(Color.purple200)};
  background-color:${Color.purple100};
  padding:3px 10px;
  border-radius: 5px;
  margin-right:3px;
`
const SpaceSpan = styled.span`
  margin-right:20px;
`
const CardBox = styled.div`
  display:flex;
  border-bottom:1px solid ${Color.purple100};
  padding:20px 0 20px 0;
  margin-bottom:20px;
`
const ImgContainer = styled.div`
  width:25%;
`
const ContentContainer = styled.div`
  width:75%;
  margin-right:10px;
`
const Img = styled.img`
  position: relative;
  vertical-align: middle;
  width:100%;
`
const Icon = styled.img`
  position: relative;
  vertical-align: text-top;
  width:14px;
  height:14px;
  margin-right:5px;
`

const BannerImg=styled.img`
  position: relative;
  vertical-align: middle;
  width:100%;
`
const BannerTag=styled.div`
  ${MarkdownSm(Color.white)};
  background-color:${Color.purple200};
  text-align: center;
`
const BannerSection=styled.section`
  padding:25px 0;
`
const Index: React.FC = ({history}:any) => {
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

    const goDetail=(index:number)=>{
        history.push(`/detail/${index}`);
    }

    return (
        <>
            <SEO title="스쿨빌런"
                 description="스쿨빌런 메인 페이지입니다."
                 keywords="스쿨빌런 메인 페이지"
            />
            <IndexSection>
                <BannerSection>
                    <Link to="/banner">
                        <BannerImg src="../../../assets/img/banner/example.jpg"/>
                        <BannerTag>나의 최애 배너등록하러가기 →</BannerTag>
                    </Link>
                </BannerSection>
                {list.map((data, index) => {
                    return (
                        <CardSection key={index} onClick={()=>goDetail(index)}>
                            {data.tag.map((item, index) => {
                                return (
                                    <CardTag key={index}>#{item}</CardTag>
                                )
                            })}
                            <CardBox>
                                <ContentContainer>
                                    <CardTitle>{data.title}</CardTitle>
                                    <CardContents>{data.contents}</CardContents>
                                </ContentContainer>
                                <ImgContainer>
                                    <Img src="../../../assets/img/index/example.jpg"/>
                                </ImgContainer>
                            </CardBox>

                            <CardContainer>
                                <div>
                                    <SpaceSpan><Icon src="../../../assets/img/icon/like.svg"/> {data.like}</SpaceSpan>
                                    <SpaceSpan><Icon src="../../../assets/img/icon/comment.svg"/> {data.comment}</SpaceSpan>
                                    <span><Icon src="../../../assets/img/icon/view.svg"/>{data.view}</span>
                                </div>
                                <div>
                                    <span>{data.date}</span>
                                </div>
                            </CardContainer>
                        </CardSection>
                    )
                })}
            </IndexSection>
        </>
    )
}

export default Index;
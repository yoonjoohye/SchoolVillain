import * as React from "react";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox} from "../../../assets/style/Box.style";
import {MarkdownBase, MarkdownSm} from "../../../assets/style/Markdown.style";

const CardSection = styled.section`
  cursor:pointer;
  min-height:150px;
  padding:30px 5%;
  background-color:${Color.white};
  margin-bottom:10px;
  box-shadow: 0 3px 5px #00000021;
`
const CardContainer = styled.div`
  ${FlexBox('space-between', 'center')};
  ${MarkdownSm(Color.gray200)};
  margin-top:15px;
`
const CardBox = styled.div`
  display:flex;
  padding:0 0 15px 0;
  margin-bottom:15px;
`
const CardTitle = styled.div`
  ${MarkdownBase()};
`
const CardContents = styled.div`
  ${MarkdownBase('', 300)};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
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
interface propsType {
    data:any;
    index:number;
    goDetail:any;
}

const Board:React.FC<propsType>=({data,index,goDetail})=> {
    return(
        <CardSection onClick={() => goDetail(index)}>
            <CardBox>
                <ContentContainer>
                    <CardTitle>{data.title}</CardTitle>
                    <CardContents>{data.contents}</CardContents>
                </ContentContainer>
                <ImgContainer>
                    <Img src="../../../assets/img/index/example.jpg"/>
                </ImgContainer>
            </CardBox>

            {data.tag.map((item:any, index:number) => {
                return (
                    <CardTag key={index}>#{item}</CardTag>
                )
            })}

            <CardContainer>
                <div>
                    <SpaceSpan><Icon src="../../../assets/img/icon/view.svg"/>{data.view}</SpaceSpan>
                    <span>{data.date}</span>
                </div>
                <div>
                    <SpaceSpan><Icon src="../../../assets/img/icon/like.svg"/> {data.like}</SpaceSpan>
                    <span><Icon src="../../../assets/img/icon/comment.svg"/> {data.comment}</span>
                </div>
            </CardContainer>
        </CardSection>
    )
}
export default  Board;
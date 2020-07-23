import * as React from "react";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox} from "../../../assets/style/Box.style";
import {MarkdownBase, MarkdownSm} from "../../../assets/style/Markdown.style";
import {css} from "@emotion/core";

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
   ${FlexBox('space-between', 'center')};
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
const HashTag = styled.span`
  ${MarkdownSm(Color.yellow200)};
  background-color:${Color.yellow100};
  padding:3px 10px;
  border-radius: 5px;
  margin-right:3px;
`
const ImgContainer = styled.div`
  //width:25%;
`
const ContentContainer = styled.div`
  //width:75%;
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
    board:any;
    index:number;
    goDetail:any;
}

const PreviewBoard:React.FC<propsType>=({board,index,goDetail})=> {
    return(
        <CardSection onClick={() => goDetail(board.id)}>
            <CardBox>
                <ContentContainer>
                    <CardTitle>{board.title}</CardTitle>
                    <CardContents>{board.contents}</CardContents>
                </ContentContainer>
                {
                    board.thumbnail!==null?
                    <ImgContainer>
                        <Img src={board.thumbnail}/>
                    </ImgContainer>
                        :null
                }
            </CardBox>

            {board.hash_tags.map((tag:any) => {
                return (
                    <HashTag key={tag.id}>#{tag.tag}</HashTag>
                )
            })}

            <CardContainer>
                <div>
                    <span css={css`margin-right:10px;`}><Icon src="../../../assets/img/icon/view.svg"/>{board.board_view_log_count}</span>
                    <span>{board.create_time_ago}</span>
                </div>
                <div>
                    <span css={css`margin-right:10px;`}><Icon src="../../../assets/img/icon/like.svg"/> {board.board_like_count}</span>
                    <span><Icon src="../../../assets/img/icon/comment.svg"/> {board.comment_count}</span>
                </div>
            </CardContainer>
        </CardSection>
    )
}
export default  PreviewBoard;
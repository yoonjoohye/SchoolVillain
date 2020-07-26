import React from "react";
import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Box.style";
import {MarkdownBase, MarkdownMd} from "../../../assets/style/Markdown.style";
import {css} from "@emotion/core";

const DetailContainer = styled.div`
  padding:10px 5%;
`
interface BoxProps {
    justifyContent?: string;
}
const DetailBox = styled.div<BoxProps>`
  ${(props: BoxProps) => FlexBox(props.justifyContent || 'flex-start')};
  margin-bottom:10px;
`
const Icon = styled.img`
  position: relative;
  vertical-align: text-top;
  width:14px;
  height:14px;
  margin-right:5px;
`

const BoardTitle = styled.div`
  ${MarkdownMd()};
`

interface propsType{
    board:any;
    onLike:any;
    like:boolean;
}
const Board:React.FC<propsType>=({board,onLike,like})=>{
    return(
        <DetailContainer>
            <DetailBox justifyContent="space-between">
                <BoardTitle>{board.title}</BoardTitle>
                <div>. . .</div>
            </DetailBox>
            <DetailBox>
                <span>익명 . {board.create_time_ago} . <Icon src="../../../assets/img/icon/view.svg"/>{board.board_view_log_count}</span>
            </DetailBox>
            <DetailBox>
                {board.contents}
            </DetailBox>
            <DetailBox justifyContent="space-between">
                {
                    board.board_image ?
                        board.board_image.map((item: any) => {
                            return (
                                <img key={item.id} src={item.path}/>
                            )
                        }) : null
                }
            </DetailBox>
            <div>
                <span css={css`margin-right:10px;`} onClick={()=>onLike(board.id)}>
                    <Icon src="../../../assets/img/icon/like.svg"/>
                    {like ?
                       <>{board.board_like_count + 1}</> : <>{board.board_like_count}</>
                    }</span>
                <span><Icon src="../../../assets/img/icon/comment.svg"/> {board.comment_count}</span>
            </div>
        </DetailContainer>
    )
}
export default Board;
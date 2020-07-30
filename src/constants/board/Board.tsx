import React from "react";
import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import {IconSm} from "../../../assets/style/Icon.style";
import {MarkdownSm} from "../../../assets/style/Markdown.style";

const BoardContainer = styled.div`
  margin-top:6em;
`

interface BoxProps {
    justifyContent?: string;
}

const BoardBox = styled.div<BoxProps>`
  ${(props: BoxProps) => FlexBox(props.justifyContent || 'flex-start')};
`
const Tag = styled.span`
  ${MarkdownSm(Color.yellow200)};
  background-color:${Color.yellow100};
  padding:0.5em 1em;
  border-radius: 5px;
  margin-right:0.5em;
`

interface propsType {
    board: any;
    onLike: any;
    likeId: number;
    likeCnt: number;
}

const Board: React.FC<propsType> = ({board, onLike, likeId, likeCnt}) => {
    return (
        <BoardContainer>
            <BoardBox justifyContent="space-between" css={css`margin-bottom:0.5em`}>
                <div>{board.title}</div>
                <div>. . .</div>
            </BoardBox>
            <div css={css`margin-bottom:1em`}>
                <span>익명 . {board.create_time_ago} . <IconSm
                    src="../../../assets/img/icon/view.svg"/>{board.board_view_log_count}</span>
            </div>
            <div css={css`margin-bottom:1em`}>
                {board.contents}
            </div>
            <BoardBox justifyContent="space-between" css={css`margin-bottom:1em`}>
                {
                    board.board_image ?
                        board.board_image.map((item: any) => {
                            return (
                                <img key={item.id} src={item.path}/>
                            )
                        }) : null
                }
            </BoardBox>
            <BoardBox css={css`margin-bottom:1em`}>
                {
                    board.hash_tags ?
                        board.hash_tags.map((tag: any) => {
                            return (
                                <Tag key={tag.id}>#{tag.tag}</Tag>
                            )
                        }) : null
                }
            </BoardBox>
            <div css={css`margin-bottom:1em;`}>
                <span css={css`margin-right:0.5em;`} onClick={() => onLike(board.id)}>
                    <IconSm src="../../../assets/img/icon/like.svg"/>
                    <span css={likeId>0 ? css`color:red;` : css`color:${Color.gray200}`}>
                        {likeCnt}
                    </span>
                </span>
                <span><IconSm src="../../../assets/img/icon/comment.svg"/> {board.comment_count}</span>
            </div>
        </BoardContainer>
    )
}
export default Board;
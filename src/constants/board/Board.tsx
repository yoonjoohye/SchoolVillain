import React from "react";
import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import {IconSm} from "../../../assets/style/Icon.style";
import {MarkdownBase, MarkdownLg, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";

const BoardContainer = styled.div`
  margin-top:6em;
`
const BoardTitle=styled.div`
  ${MarkdownLg(Color.black, 600)};
  word-break:break-word;
`
const BoardContents=styled.div`
  ${MarkdownBase(Color.black,400)};
  word-break:break-word;
  margin-bottom:1em;
`
interface BoxProps {
    justifyContent?: string;
}

const BoardBox = styled.div<BoxProps>`
  ${(props: BoxProps) => FlexBox('',props.justifyContent || 'flex-start','')};
`
const Tag = styled.span`
  ${MarkdownSm(Color.yellow200)};
  background-color:${Color.yellow100};
  padding:0.2em 0.8em;
  border-radius: 5px;
  margin-right:0.5em;
  margin-bottom:0.5em;
`

interface propsType {
    board: any;
    likeBoard: any;
    boardLikeId: number;
    boardLikeCnt: number;
    editBoard: any;
    deleteBoard: any;
    moreBoard: any;
}

const Board: React.FC<propsType> = ({board, likeBoard, boardLikeId, boardLikeCnt, moreBoard, editBoard, deleteBoard}) => {
    return (
        <BoardContainer>
            <BoardBox justifyContent="space-between" css={css`margin-bottom:0.5em`}>
                <BoardTitle>{board.title}</BoardTitle>
                {
                    board.is_mine ?
                        <div css={css`width:100%; max-width: fit-content;`}>
                            <div onClick={moreBoard}>. . .</div>
                            <div css={css`border-radius:50%; border-top-right-radius: 0;     
                            padding: 1em;
                            background-color: antiquewhite;
                            position: absolute;
                            top: 8em;
                            right: 15%;`}>
                                <div css={css`cursor:pointer;`} onClick={()=>deleteBoard(board.id)}>삭제하기</div>
                                <div onClick={editBoard}>수정하기</div>
                            </div>
                        </div> : null
                }
            </BoardBox>
            <div css={css`margin-bottom:1em; border-bottom:1px solid ${Color.gray100}; ${MarkdownBase(Color.gray200)};`}>
                <div>익명 </div>
                <div css={css`margin-bottom:1em;`}>{board.create_time_ago} . <IconSm src="../../../assets/img/icon/view.svg"/>{board.board_view_log_count}</div>
            </div>
            <BoardContents dangerouslySetInnerHTML={ {__html: board.contents} }></BoardContents>
            <div css={css`margin-bottom:1em; text-align:center;`}>
                {
                    board.board_image ?
                        board.board_image.map((item: any) => {
                            return (
                                <figure key={item.id}>
                                    <img css={css`max-width: 85%;`} src={item.path}/>
                                </figure>
                            )
                        }) : null
                }
            </div>
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
                <span css={css`margin-right:0.5em;`} onClick={() => likeBoard(board.id)}>
                    <IconSm src="../../../assets/img/icon/like.svg"/>
                    <span css={boardLikeId > 0 ? css`color:red;` : css`color:${Color.gray200}`}>
                        {boardLikeCnt}
                    </span>
                </span>
                <span>
                    <IconSm src="../../../assets/img/icon/comment.svg"/>
                    <span>{board.comment_count}</span>
                </span>
            </div>
        </BoardContainer>
    )
}
export default Board;
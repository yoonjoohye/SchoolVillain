import React from "react";
import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import {IconSm} from "../../../assets/style/Icon.style";
import {MarkdownBase, MarkdownLg, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import produce from "immer";
import SkeletonBoard from "../loading/SkeletonBoard";

const BoardTitle = styled.div`
  ${MarkdownLg(Color.black, 600)};
  word-break:break-word;
`
const BoardContents = styled.div`
  ${MarkdownBase(Color.black, 400)};
  word-break:break-word;
  margin-bottom:1em;
  line-height:1.7em;
  min-height: 5em;
}
`
// const SpeechBubble = styled.span`
//   position: absolute;
//   margin-top: 25px;
//   margin-left: -60px;
//   background: ${Color.white};
//   border: 1px solid ${Color.gray100};
//   border-radius: 0.3rem;
//   ${MarkdownSm(Color.gray200)}
//   &:after,
//   &:before {
//     bottom: 100%;
//     border: solid ${Color.gray100};
//     content: ' ';
//     height: 0;
//     width: 0;
//     position: absolute;
//   }
//   &:before {
//     left: 38%;
//     border-color: transparent;
//     border-bottom-color: ${Color.gray100};
//     border-width: 9px;
//     margin-left: 0;
//   }
//   &:after {
//     left: 41%;
//     border-color: transparent;
//     border-bottom-color: ${Color.white};
//     border-width: 7px;
//     margin-left: 0;
//   }
// `;
// const SpeechBubbleContent = styled.div`
//   text-align: center;
//   word-break: keep-all;
//   padding: 0.5rem 1.5rem;
//   &:nth-of-type(1){
//     border-bottom: 1px solid ${Color.gray100};
//   }
// `;
interface BoxProps {
    justifyContent?: string;
}

const BoardBox = styled.div<BoxProps>`
  ${(props: BoxProps) => FlexBox('', props.justifyContent || 'flex-start', '')};
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
    editBoard: any;
    deleteBoard: any;
    moreBoard: any;
}

const Board: React.FC<propsType> = ({board, likeBoard, boardLikeId, moreBoard, editBoard, deleteBoard}) => {
    return (
        board ?
            <>
                <div css={css`margin-bottom:1em;`}>
                    <BoardTitle>{board.title}</BoardTitle>
                </div>
                <BoardBox justifyContent="space-between"
                          css={css`margin-bottom:1em; border-bottom:1px solid ${Color.gray100}; ${MarkdownBase(Color.gray200)};`}>
                    <div>
                        <div>익명</div>
                        <div css={css`margin-bottom:1em;`}>
                            <span>{board.create_time_ago}</span>
                            <span css={css`padding:0 0.5em;`}>|</span>
                            <span>
                                <IconSm
                                    src="../../../assets/img/icon/view.svg"/>{board.board_view_log_count}</span>
                        </div>
                    </div>
                    <>
                        {
                            board.is_mine ?
                                <div css={css`width:100%; max-width: fit-content;`}>
                                    <div onClick={moreBoard}>. . .</div>
                                    <div css={css`border-radius:50%; border-top-left-radius: 0;     
                            padding: 1em;
                            background-color: ${Color.yellow100};
                            position: absolute;`}>
                                        <div css={css`cursor:pointer;`} onClick={() => deleteBoard(board.id)}>삭제하기</div>
                                        <div onClick={editBoard}>수정하기</div>
                                    </div>
                                </div> : null
                        }
                    </>
                </BoardBox>
                <BoardContents dangerouslySetInnerHTML={{__html: board.contents}}></BoardContents>
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
                        {board.board_like_count}
                    </span>
                </span>
                    <span>
                    <IconSm src="../../../assets/img/icon/comment.svg"/>
                    <span css={css`color:${Color.gray200}`}>{board.comment_count}</span>
                </span>
                </div>
            </>
            :
            <>
                <SkeletonBoard/>
            </>

    )
}
export default Board;
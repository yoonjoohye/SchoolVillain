import * as React from "react";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox} from "../../../assets/style/Layout.style";
import {MarkdownBase, MarkdownLg, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {css} from "@emotion/core";
import SkeletonPreviewBoard from "../loading/SkeletonPreviewBoard";
import {IconSm} from "../../../assets/style/Icon.style";
import {media} from "../../../assets/style/Media.style";
import {Tag} from "../../../assets/style/Util";

const BoardSection = styled.section`
  cursor:pointer;
  padding:30px 5%;
  background-color:${Color.white};
  margin-top:1em;
  box-shadow: 0 3px 5px #00000021;
`
const BoardBox = styled.div`
  ${FlexBox('','space-between', 'center')};
  ${MarkdownBase(Color.gray200)};
`
const BoardTitle = styled.div`
  ${MarkdownMd(Color.black,700)};
  margin-bottom:0.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
`
const BoardContents = styled.div`
  ${MarkdownBase(Color.black, 400)};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  height:auto;
`
const Img = styled.img`
  position: relative;
  vertical-align: middle;
  width: 25%;
`
interface propsType {
    boardList: any;
    goDetail: any;
}

const PreviewBoard: React.FC<propsType> = ({boardList, goDetail}) => {
    return (
        boardList ?
            boardList.map((board: any, index: number) => {
                return (
                    <BoardSection key={board.id} onClick={() => goDetail(board.id)}>
                        <BoardBox css={css`margin-bottom:1em;`}>
                            <div css={css`margin-right:0.5em;`}>
                                <BoardTitle>{board.title}</BoardTitle>
                                <BoardContents>{board.contents}</BoardContents>
                            </div>
                            {
                                board.thumbnail !== null ?
                                    <Img src={board.thumbnail}/> : null
                            }
                        </BoardBox>

                        {
                            board.hash_tags?
                            board.hash_tags.map((tag: any, tagIndex: number) => {
                                return (
                                    <React.Fragment key={tag.id}>
                                        {
                                            tagIndex < 3 ?
                                                <Tag># {tag.tag}</Tag>
                                                :
                                                null
                                        }
                                    </React.Fragment>
                                )
                            }):null
                        }

                        <BoardBox css={css`margin-top:1em; padding-top: 1em; border-top: 1px solid ${Color.gray100};`}>
                            <div>
                                <span css={css`margin-right:10px;`}>
                                    <IconSm src="../../../assets/img/icon/view.svg"/>{board.board_view_log_count}
                                </span>
                                <span>{board.create_time_ago}</span>
                            </div>
                            <div>
                                <span css={css`margin-right:10px;`}>
                                    <IconSm src="../../../assets/img/icon/like.svg"/> {board.board_like_count}
                                </span>
                                <span><IconSm src="../../../assets/img/icon/comment.svg"/> {board.comment_count}</span>
                            </div>
                        </BoardBox>
                    </BoardSection>
                )
            }) :
            [1, 2, 3].map((item, index) => {
                return (
                    <SkeletonPreviewBoard key={index}/>
                )
            })
    )
}
export default PreviewBoard;
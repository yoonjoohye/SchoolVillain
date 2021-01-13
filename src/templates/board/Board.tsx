import React, {useState} from "react";
import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import {IconMd, IconSm} from "../../../assets/style/Icon.style";
import {
    MarkdownBase,
    MarkdownBody,
    MarkdownLg,
    MarkdownMd,
    MarkdownSm,
    MarkdownXl
} from "../../../assets/style/Markdown.style";
import produce from "immer";
import SkeletonBoard from "../loading/SkeletonBoard";
import {Tag} from "../../../assets/style/Util";
import {media} from "../../../assets/style/Media.style";

const BoardTitle = styled.div`
  ${MarkdownLg(Color.black, 500)};
  word-break:break-word;
`
interface ContentsProps{
    isImage:boolean;
}
const BoardContents = styled.div<ContentsProps>`
  ${MarkdownBase(Color.black, 400)};
  word-break:break-word;
  margin-bottom:1em;
  line-height:1.7em;
  ${(props:ContentsProps)=>props.isImage || css`
      min-height: 12em;
  `}
}
`
const SpeechBubble = styled.div`
  position: absolute;
  right:5%;
  background: ${Color.white};
  box-shadow: 0 0 10px rgba(0,0,0,0.12);
  border-radius: 0.3rem;
  ${MarkdownSm(Color.gray200)}
  ${media.sm`
    right:5%;
  `}
`;
const SpeechBubbleContent = styled.div`
  text-align: center;
  word-break: keep-all;
  padding: 0.8rem 2.5rem;
  cursor:pointer;
  &:nth-of-type(1){
    border-bottom: 1px solid ${Color.gray100};
  }
  &:hover{
    background-color:#fcfcfc;
  }
`;

interface BoxProps {
    justifyContent?: string;
    alignItems?: string;
}

const BoardBox = styled.div<BoxProps>`
  ${(props: BoxProps) => FlexBox('', props.justifyContent || 'flex-start', props.alignItems || 'center')};
`

interface propsType {
    board: any;
    likeBoard: any;
    boardLikeId: number;
    editBoard: any;
    deleteBoard: any;
}

const Board: React.FC<propsType> = ({board, likeBoard, boardLikeId, editBoard, deleteBoard}) => {
    const [openModifyBox, setOpenModifyBox] = useState(false);

    const textToTag = (str: string) => {
        let newLineRegex = /\n/g;
        let urlRegex = /(https?:\/\/.*?)([.!?;,])?(\n|\s+|"|$)/g;
        str = str.replace(urlRegex, `<a href="$1" style="color:${Color.blue200};" target="_blank" >$1</a>`).replace(newLineRegex, '<br />')
        return str;
    }


    return (
        board ?
            <>
                <div css={css`margin-bottom:40px`}>
                    <BoardTitle>{board.title}</BoardTitle>
                </div>
                <div>{board.user.name ? board.user.name : '익명'}</div>

                <BoardBox justifyContent="space-between" alignItems="flex-end"
                          css={css`margin-bottom:1em; padding-bottom:20px; border-bottom:1px dashed #DFDFDF;`}>
                    <div css={css`${MarkdownBody('#A9A9A9', 400)}`}>{board.create_time_ago}</div>

                    <div css={css`${MarkdownBody('#A9A9A9', 400)} ${FlexBox('', 'center', 'center')};`}>
                        조회 {board.board_view_log_count}
                    </div>
                    {/*<>*/}
                    {/*    {*/}
                    {/*        board.is_mine ?*/}
                    {/*            <div css={css`position:relative;`}>*/}
                    {/*                <div><IconMd css={css`margin:0; cursor: pointer;`}*/}
                    {/*                             src={require('../../../assets/img/icon/more.svg')} alt="스쿨빌런 더보기 이미지" onClick={() => {*/}
                    {/*                    setOpenModifyBox(!openModifyBox)*/}
                    {/*                }}/></div>*/}
                    {/*                {openModifyBox &&*/}
                    {/*               */}
                    {/*                }*/}
                    {/*            </div> : null*/}
                    {/*    }*/}
                    {/*</>*/}
                </BoardBox>
                <BoardContents isImage={board.board_image.length>0 && true} dangerouslySetInnerHTML={{__html: textToTag(board.contents)}}></BoardContents>
                <div css={css`margin-bottom:2em; text-align:center;`}>
                    {
                        board.board_image ?
                            board.board_image.map((item: any) => {
                                return (
                                    <figure key={item.id}>
                                        <img css={css`max-width: 60%; ${media.sm`max-width:90%;`}`}
                                             src={`${item.path}?q=60`} alt={`스쿨빌런 ${board.title} 이미지`}/>
                                    </figure>
                                )
                            }) : null
                    }
                </div>
                {/*<BoardBox css={css`margin-bottom:2em`}>*/}
                {/*    {*/}
                {/*        board.hash_tags ?*/}
                {/*            board.hash_tags.map((tag: any) => {*/}
                {/*                return (*/}
                {/*                    <Tag key={tag.id}># {tag.tag}</Tag>*/}
                {/*                )*/}
                {/*            }) : null*/}
                {/*    }*/}
                {/*</BoardBox>*/}

                <div css={css`${FlexBox('', 'space-between', 'center')}; padding:20px 0; border-top:1px dashed #DFDFDF;`}>
                    <div css={css`${FlexBox()};`}>
                        <div css={css`margin-right:1em; cursor:pointer;`} onClick={() => likeBoard(board.id)}>
                            {boardLikeId > 0 ?
                                <IconMd css={css`margin-right:0.3em;`}
                                        src={require('../../../assets/img/icon/like_purple.svg')} alt="스쿨빌런 좋아요 이미지"/>
                                :
                                <IconMd css={css`margin-right:0.3em;`}
                                        src={require('../../../assets/img/icon/like.svg')} alt="스쿨빌런 좋아요 이미지"/>

                            }
                            <span css={css`color:${Color.gray300}`}>
                                {board.board_like_count}
                            </span>
                        </div>
                        <div>
                            <IconMd css={css`margin-right:0.3em;`} src={require('../../../assets/img/icon/comment.svg')}
                                    alt="스쿨빌런 댓글 이미지"/>
                            <span css={css`color:${Color.gray300}`}>{board.comment_count}</span>
                        </div>
                    </div>
                    {
                        board.is_mine &&
                        <div>
                            <span css={css`${MarkdownBody(Color.gray300, 400)}; margin-right:1em;`}
                                  onClick={() => deleteBoard(board.id)}>삭제하기</span>
                            <span css={css`${MarkdownBody(Color.gray300, 400)};`} onClick={() => editBoard()}>수정하기</span>
                        </div>
                    }
                </div>


            </>
            :
            <>
                <SkeletonBoard/>
            </>

    )
}
export default Board;
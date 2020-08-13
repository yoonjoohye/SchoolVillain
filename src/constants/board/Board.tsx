import React, {useState} from "react";
import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import {IconSm} from "../../../assets/style/Icon.style";
import {MarkdownBase, MarkdownLg, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import produce from "immer";
import SkeletonBoard from "../loading/SkeletonBoard";
import {Tag, url} from "../../../assets/style/Util";
import {media} from "../../../assets/style/Media.style";

const BoardTitle = styled.div`
  ${MarkdownLg(Color.black, 700)};
  word-break:break-word;
`
const BoardContents = styled.div`
  ${MarkdownMd(Color.black, 400)};
  word-break:break-word;
  margin-bottom:1em;
  line-height:1.7em;
  min-height: 5em;
}
`
const SpeechBubble = styled.div`
  position: absolute;
  margin-top: 120px;
  width:10%;
  background: ${Color.white};
  box-shadow: 0 0 10px rgba(0,0,0,0.12);
  border-radius: 0.3rem;
  ${MarkdownSm(Color.gray200)}
  ${media.sm`
    right:5%;
    width:25%;
  `}
`;
const SpeechBubbleContent = styled.div`
  text-align: center;
  word-break: keep-all;
  padding: 1rem 1.5rem;
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
        let newLineRegex=/\n/g;
        let urlRegex = /(https?:\/\/.*?)([.!?;,])?(\s+|"|$)/g;
        str=str.replace(urlRegex, `<a href="$1" style="color:${Color.blue200};" target="_blank" >$1</a>`).replace(newLineRegex, '<br />')

        return str;
    }


    return (
        board ?
            <>
                <div css={css`margin-bottom:1em;`}>
                    <BoardTitle>{board.title}</BoardTitle>
                </div>
                <BoardBox justifyContent="space-between" alignItems="flex-end"
                          css={css`margin-bottom:1em; padding-bottom:1em; border-bottom:1px solid ${Color.gray100}; ${MarkdownBase(Color.gray200)};`}>
                    <div>
                        <div>익명</div>
                        <div>
                            <span>{board.create_time_ago}</span>
                            <span css={css`padding:0 0.5em;`}>|</span>
                            <span>
                                <IconSm
                                    src={require('../../../assets/img/icon/view.svg')}/>{board.board_view_log_count}</span>
                        </div>
                    </div>
                    <>
                        {
                            board.is_mine ?
                                <div css={css`${FlexBox('column', 'center', 'center')};`}>
                                    <div><IconSm css={css`margin:0; cursor: pointer;`}
                                                 src={require('../../../assets/img/icon/more.svg')} onClick={() => {
                                        setOpenModifyBox(!openModifyBox)
                                    }}/></div>
                                    {openModifyBox &&
                                    <SpeechBubble>
                                        <SpeechBubbleContent
                                            onClick={() => deleteBoard(board.id)}>삭제하기</SpeechBubbleContent>
                                        <SpeechBubbleContent onClick={() => editBoard()}>수정하기</SpeechBubbleContent>
                                    </SpeechBubble>
                                    }
                                </div> : null
                        }
                    </>
                </BoardBox>
                <BoardContents dangerouslySetInnerHTML={{__html: textToTag(board.contents)}}></BoardContents>
                <div css={css`margin-bottom:1em; text-align:center;`}>
                    {
                        board.board_image ?
                            board.board_image.map((item: any) => {
                                return (
                                    <figure key={item.id}>
                                        <img css={css`max-width: 60%;`} src={`${item.path}?q=60`}/>
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
                                    <Tag key={tag.id}># {tag.tag}</Tag>
                                )
                            }) : null
                    }
                </BoardBox>
                <div css={css`margin-bottom:1em;`}>
                <span css={css`margin-right:1em;`} onClick={() => likeBoard(board.id)}>
                    <IconSm src={require('../../../assets/img/icon/like.svg')}/>
                    <span css={boardLikeId > 0 ? css`color:red;` : css`color:${Color.gray200}`}>
                        {board.board_like_count}
                    </span>
                </span>
                    <span>
                    <IconSm src={require('../../../assets/img/icon/comment.svg')}/>
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
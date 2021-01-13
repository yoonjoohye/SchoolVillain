import * as React from "react";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox} from "../../../assets/style/Layout.style";
import {
    MarkdownBase,
    MarkdownBody,
    MarkdownLg,
    MarkdownMd,
    MarkdownMdx,
    MarkdownSm
} from "../../../assets/style/Markdown.style";
import {css} from "@emotion/core";
import SkeletonPreviewBoard from "../loading/SkeletonPreviewBoard";
import {IconMd, IconSm} from "../../../assets/style/Icon.style";
import {media} from "../../../assets/style/Media.style";
import {Hightlight, Tag} from "../../../assets/style/Util";
import {useState} from "react";
import Write from "../../pages/board/Write";

const BoardWrapper = styled.div`
 margin-bottom:40px;
 display:grid; 
 grid-template-columns:1fr 1fr 1fr 1fr; 
 grid-gap:40px; 
 ${media.lg`grid-template-columns: 1fr 1fr 1fr 1fr; grid-gap:20px`};
 ${media.sm`grid-template-columns: 1fr; grid-gap:20px`};
`
const BoardSection = styled.article`
   cursor:pointer;
   background: #FFFFFF;
    box-shadow: 0 0 4px rgba(152, 149, 149, 0.25);
   ${FlexBox('column', 'space-between', 'flex-start')};
   height:280px;
`
const BoardTitle = styled.div`
    ${MarkdownMdx(Color.black, 500)};
    margin-bottom:10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
`

interface IProps {
    line: number;
}

const BoardContents = styled.div`
  ${MarkdownBody(Color.black, 400)};
  line-height: 1.8;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:${(props: IProps) => props.line};
  -webkit-box-orient: vertical;
  word-break: break-word;
`
const Img = styled.img`
   width: 100%;
   filter: brightness(45%);
`
const ReplyName = styled.div`
  ${MarkdownSm('', 500)};
  margin-bottom:0.5em;
`
const ReplyContent = styled.p`
  word-break:break-all;
  display:inline-block;
  ${MarkdownBase()};
  background-color:${Color.gray100};
  padding: 0.8em 1em;
  border-radius:10px;
  margin-bottom:0.5em;
`
const Button = styled.button`
  ${MarkdownBase(Color.white)};
  width:20em;
  height: 40px;
  border-radius: 0.3em;
  text-align:center;
  background-color:${Color.purple200};
  &:hover{
    background-color:${Color.purple300};
  }
`

interface propsType {
    loading?: boolean;
    boardList: any;
    goDetail: any;
    mypage?: boolean;
}

const PreviewBoard: React.FC<propsType> = ({loading, boardList, goDetail, mypage}) => {
    const textToTag = (str: string) => {
        let newLineRegex = /\n/g;
        str = str.replace(newLineRegex, '<br />');

        return str;
    }
    const [openModal, setOpenModal] = useState(false);

    const goWrite = () => {
        if (screen.width > 480) {
            setOpenModal(true);
        } else {
            location.href = '/write';
        }
    }
    const isOpen = (open: boolean) => {
        setOpenModal(open);
    }

    // console.log(boardList);
    return (
        <>
            {
                loading ||
                boardList.length > 0 && boardList ?
                    <BoardWrapper>
                        {
                            boardList.map((board: any, index: number) => {
                                return (
                                    <BoardSection key={index} onClick={() => goDetail(board.id)}>
                                        <div css={css`width: 100%;`}>
                                            <>
                                                <div
                                                    css={css`display:inline-block; position:${board.thumbnail && 'absolute'}; ${MarkdownSm(Color.gray250, 300)};margin:20px 0 0 20px; z-index: 2;`}>
                                                    {board.type === 'doodle' ? '담벼락' : '연애상담'}
                                                </div>
                                                {
                                                    board.thumbnail &&
                                                    <Img src={window.screen.width > 480 ? `${board.thumbnail}?s=180x70&t=crop&q=60`: `${board.thumbnail}?s=300x90&t=crop&q=60`}  />
                                                }
                                            </>

                                            <div css={css`padding:20px;`}>
                                                <BoardTitle dangerouslySetInnerHTML={{__html: textToTag(board.title)}}/>
                                                <BoardContents line={board.thumbnail ? 2 : 3}
                                                               dangerouslySetInnerHTML={{__html: textToTag(board.contents)}}/>
                                            </div>
                                        </div>

                                        <div
                                            css={css`width: 100%; box-sizing: border-box; border-top: 1px dashed #DFDFDF; padding:20px; ${FlexBox('row', 'space-between', 'center')}; ${MarkdownSm('', 300)}`}>
                                            <div>{board.user.name || '익명'}</div>
                                            <div css={css`${FlexBox()};`}>
                                                <div css={css`margin-right:1em; ${FlexBox()};`}>
                                                    <IconMd css={css`margin-right:0.3em;`}
                                                            src={require('../../../assets/img/icon/like.svg')}/>
                                                    <div>{board.board_like_count}</div>
                                                </div>
                                                <div css={css`${FlexBox()};`}>
                                                    <IconMd css={css`margin-right:0.3em; `}
                                                            src={require('../../../assets/img/icon/comment.svg')}/>
                                                    <div>{board.comment_count}</div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*{*/}
                                        {/*    mypage &&*/}
                                        {/*    <div*/}
                                        {/*        css={css`margin-top:1em; padding-top: 1em; border-top: 1px solid ${Color.gray100};`}>*/}

                                        {/*        {*/}
                                        {/*            board.comment.map((reply: any, index: number) => (*/}
                                        {/*                index === 1 &&*/}
                                        {/*                <div key={index} css={css`margin-top:0.5em;`}>*/}
                                        {/*                    <ReplyName>*/}
                                        {/*                        {reply.user.name ? reply.user.name : '익명'} <span*/}
                                        {/*                        css={css`${MarkdownSm(Color.gray200)}`}>{reply.create_time_ago}</span>*/}
                                        {/*                    </ReplyName>*/}
                                        {/*                    <ReplyContent*/}
                                        {/*                        dangerouslySetInnerHTML={{__html: textToTag(reply.contents)}}/>*/}
                                        {/*                </div>*/}
                                        {/*            ))*/}
                                        {/*        }*/}
                                        {/*    </div>*/}
                                        {/*}*/}
                                    </BoardSection>
                                )
                            })
                        }
                    </BoardWrapper>
                    :
                    <div css={css`height:50vh; ${FlexBox('column')}; ${MarkdownBase('#A9A9A9', 400)}`}>
                        <div>해당 게시글이 존재하지 않아요.</div>
                        <div css={css`margin-bottom:1em;`}>글을 작성하여, <span css={css`color:#951DE4`}>당신의 인싸력</span>을
                            보여주세요.
                        </div>
                        <Button onClick={goWrite}>인싸글 도전하기</Button>
                    </div>
            }
            {
                openModal && <Write isOpen={isOpen}/>
            }
        </>
    )
}
export default PreviewBoard;

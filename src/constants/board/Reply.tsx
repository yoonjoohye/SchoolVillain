import React, {memo, useState} from "react";
import styled from "@emotion/styled";
import {MarkdownBase, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox} from "../../../assets/style/Layout.style";
import ReplyInput from "../../components/input/ReplyInput";
import {css} from "@emotion/core";

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
const ReplyBox = styled.div`
  ${MarkdownSm(Color.gray200)};
`
const ReplyFormBox = styled.div`
  padding:2em 0;
  border-top:1px solid ${Color.gray100};
`
const ReplyForm = styled.div`
  ${FlexBox('', 'space-between', 'center')};
    border:1px solid ${Color.gray100};
    padding: 1.5em;
`
const ReplyBtn = styled.button`
  ${MarkdownBase(Color.purple200)};
  min-width: fit-content;
`
const MoreReply = styled.div`
  ${MarkdownSm(Color.purple200)};
  margin-top:10px;
`

const LikeBadge=styled.span`
    position: absolute; 
    background: white;
    margin-top: 2em;
    margin-left:-1em;
    border-radius: 5em;
    ${MarkdownSm(Color.gray200, 500)};
    padding: 0.1em 0.8em;
    box-shadow: 0 0 8px #00000014;
`
const LikeIcon=styled.img`
    width:1em; 
    height:1em; 
    position: relative;
    margin-right: 0.3em;
    vertical-align: text-top;
`
interface btnProps{
    click:boolean;
}
const LikeButton=styled.span<btnProps>`
  cursor:pointer; 
  margin-right:0.5em;
  ${(props:btnProps)=>props.click?
    css`color:${Color.purple200}`:css`color:${Color.gray200}`
}
  
`
interface propsType {
    replyList: any;
    replyTotal: number;

    likeReply: any;
    replyLikeId: any;
    deleteReply: any;

    goReReply: any;
    openReply: number[];

    reply: string;
    changeReply: any;
    saveReply: any;

    reReply: any;
    changeReReply: any;

    moreReply: any;
    moreReReply: any;
}

const Reply: React.FC<propsType> = ({replyList, replyTotal, likeReply, replyLikeId, deleteReply, goReReply, openReply, reply, changeReply, saveReply, reReply, changeReReply, moreReply, moreReReply}) => {

    const replyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
        changeReply(e.target.value);
    }

    const reReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>, replyIndex: number) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';

        changeReReply(e.target.value, replyIndex);
    }
    const textToTag = (str: string) => {
        let newLineRegex = /\n/g;
        let urlRegex = /(https?:\/\/.*?)([.!?;,])?(\s+|"|$)/g;
        str = str.replace(urlRegex, `<a href="$1" style="color:${Color.blue200};" target="_blank" >$1</a>`).replace(newLineRegex, '<br />')

        return str;
    }

    return (
        <div css={css`margin-bottom:6em;`}>
            <ReplyFormBox>
                <ReplyForm>
                    <ReplyInput value={reply} onChange={replyChange} placeholder="댓글을 입력해주세요."/>
                    <ReplyBtn onClick={() => saveReply(null, reply, null)}>등록</ReplyBtn>
                </ReplyForm>
            </ReplyFormBox>
            {
                replyList.length > 0 ?
                    replyList.map((reply: any, replyIndex: number) => {
                        return (
                            <div css={css`margin-bottom:1em;`} key={replyIndex}>
                                <ReplyName>
                                    {reply.user ? reply.user.name : '익명'} <span
                                    css={css`${MarkdownSm(Color.gray200)}`}>{reply.create_time_ago}</span>
                                </ReplyName>
                                <ReplyContent dangerouslySetInnerHTML={{__html: textToTag(reply.contents)}}/>
                                {
                                    reply.comment_like_count > 0 &&
                                    <LikeBadge>
                                        <LikeIcon css={css``} src='../../../assets/img/icon/like_purple.svg'/>
                                        {reply.comment_like_count}
                                    </LikeBadge>
                                }
                                <ReplyBox>
                                <LikeButton click={replyLikeId[replyIndex] && replyLikeId[replyIndex].reply!==null?true:false} onClick={() => likeReply(reply.id, replyIndex, null)}>좋아요</LikeButton>
                                    <span css={css`cursor:pointer; margin-right:0.5em;`}
                                          onClick={() => goReReply(replyIndex)}>답글달기</span>
                                    {
                                        reply.is_mine ?
                                            <span css={css`cursor:pointer;`}
                                                  onClick={() => deleteReply(reply.id, replyIndex, null)}>삭제하기</span> : null
                                    }
                                </ReplyBox>

                                {
                                    reply.children && reply.children.length > 0 &&
                                    <div css={css`padding-left:5%;`}>
                                        {
                                            reply.children.map((reReply: any, reReplyIndex: number) => {
                                                return (
                                                    <div css={css`margin-top:0.8em;`} key={reReplyIndex}>
                                                        <ReplyName>
                                                            {'익명'} <span
                                                            css={css`${MarkdownSm(Color.gray200)}`}>{reReply.create_time_ago}</span>
                                                        </ReplyName>
                                                        <ReplyContent dangerouslySetInnerHTML={{__html: textToTag(reReply.contents)}}/>
                                                        {
                                                            reReply.comment_like_count > 0 &&
                                                            <LikeBadge>
                                                                <LikeIcon css={css``} src='../../../assets/img/icon/like_purple.svg'/>
                                                                {reReply.comment_like_count}
                                                            </LikeBadge>
                                                        }

                                                        <ReplyBox>
                                                            <LikeButton click={replyLikeId[replyIndex] && replyLikeId[replyIndex].reReply[reReplyIndex]!==null?true:false}
                                                                  onClick={() => likeReply(reReply.id, replyIndex, reReplyIndex)}>좋아요</LikeButton>
                                                            <span css={css`cursor:pointer; margin-right:0.5em;`}
                                                                  onClick={() => goReReply(replyIndex)}>답글달기</span>
                                                            {
                                                                reReply.is_mine ?
                                                                    <span css={css`cursor:pointer;`}
                                                                          onClick={() => deleteReply(reReply.id, replyIndex, reReplyIndex)}>삭제하기</span> : null
                                                            }
                                                        </ReplyBox>
                                                    </div>
                                                )
                                            })
                                        }
                                        {

                                            reply.children_count > reply.children.length &&
                                            <MoreReply css={css`cursor:pointer;`}
                                                       onClick={() => moreReReply(reply.id, replyIndex)}>댓글
                                                더보기...</MoreReply>
                                        }
                                    </div>
                                }
                                {
                                    openReply.includes(replyIndex) ?
                                        <div css={css`padding-left:5%;`}>
                                            <ReplyForm css={css`margin-top:0.8em;`}>
                                                <ReplyInput value={reReply[replyIndex]}
                                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => reReplyChange(e, replyIndex)}
                                                            placeholder="댓글을 입력해주세요."/>
                                                <ReplyBtn
                                                    onClick={() => saveReply(reply.id, reReply[replyIndex], replyIndex)}>등록</ReplyBtn>
                                            </ReplyForm>
                                        </div> : null

                                }
                            </div>
                        )
                    })
                    :
                    <div css={css` ${FlexBox('column', 'center', 'center')}; width:100%; height:300px;`}>
                        <p>존재하는 댓글이 없어요.</p>
                        <p>댓글을 남겨 첫번째 빌런이 되세요.</p>
                    </div>
            }
            {
                replyTotal > replyList.length ?
                    <div css={css`margin-top:1em;`}>
                        <MoreReply css={css`cursor:pointer;`} onClick={moreReply}>댓글 더보기...</MoreReply>
                    </div> : null
            }
        </div>
    )
}

export default memo(Reply);

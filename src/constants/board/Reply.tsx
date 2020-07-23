import React, {useState} from "react";
import styled from "@emotion/styled";
import {MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox} from "../../../assets/style/Box.style";
import ReplyInput from "../../components/input/ReplyInput";
import {css} from "@emotion/core";
import {Link} from "react-router-dom";

const ReplyFormBox = styled.div`
  padding:10px 5%;
  border-top:1px solid #eeeeee;
  border-bottom:1px solid #eeeeee;
`
const ReplyName = styled.div`
  ${MarkdownSm('', 500)};
    margin-bottom:5px;
`
const ReplyContainer = styled.div`
  padding:10px 5%;
`
const ReplyContent = styled.p`
  display:inline-block;
  background-color:#eeeeee;
  padding: 10px 15px;
  border-radius:15px;
  margin-bottom:5px;
  ${MarkdownSm()};
`
const Gray = styled.span`
  ${MarkdownSm(Color.gray200)};
`
const Space = styled.span`
  margin-right:10px;
`

const ReplyBox = styled.div`
  ${MarkdownSm(Color.gray200)};
`
const ReReplyContainer = styled.div`
  padding-left:10%;
  margin-top:10px;
`
const ReReplyBox = styled.div`
  margin-top:10px;
`
const ReplyForm = styled.div`
  ${FlexBox('space-between', 'center')};
    background-color:#eeeeee;
    border-radius: 15px;
    padding: 10px 15px;
`
const ReplyBtn = styled.button`
  ${MarkdownSm(Color.purple200)};
  min-width: fit-content;
`
const MoreReply = styled.div`
  ${MarkdownSm(Color.purple200)};
  margin-top:10px;
`
const SpeechBubble = styled.span`
  position: absolute;
  margin-top: 25px;
  margin-left: -60px;
  background: ${Color.white};
  border: 1px solid ${Color.gray100};
  border-radius: 0.3rem;
  ${MarkdownSm(Color.gray200)}
  &:after,
  &:before {
    bottom: 100%;
    border: solid ${Color.gray100};
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
  }
  &:before {
    left: 38%;
    border-color: transparent;
    border-bottom-color: ${Color.gray100};
    border-width: 9px;
    margin-left: 0;
  }
  &:after {
    left: 41%;
    border-color: transparent;
    border-bottom-color: ${Color.white};
    border-width: 7px;
    margin-left: 0;
  }
`;
const SpeechBubbleContent = styled.div`
  text-align: center;
  word-break: keep-all;
  padding: 0.5rem 1.5rem;
  &:nth-of-type(1){
    border-bottom: 1px solid ${Color.gray100};
  }
`;

interface propsType {
    replyList: any;
    onLike: any;
    onMore: any;
    onDelete: any;
    onReport: any;

    openMore: any;

    reply: string;
    changeReply: any;

    reReply: string;
    changeReReply: any;

    moreReply: any;
    moreReReply: any;
}

const Reply: React.FC<propsType> = ({replyList, onLike, onMore, onDelete, onReport, openMore, reply, changeReply, reReply, changeReReply, moreReply, moreReReply}) => {

    const replyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';

        changeReply(e.target.value);
    }

    const reReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';

        changeReReply(e.target.value);
    }

    return (
        <>
            <ReplyFormBox>
                <ReplyForm>
                    <ReplyInput value={reply} onChange={replyChange}
                                placeholder="댓글을 입력해주세요."/>
                    <ReplyBtn>등록</ReplyBtn>
                </ReplyForm>
            </ReplyFormBox>

            {
                replyList.map((reply: any, replyIndex: number) => {
                    return (
                        <ReplyContainer key={replyIndex}>
                            <ReplyName>{reply.user.name || '익명'} <Gray>{reply.created_at}</Gray></ReplyName>
                            <ReplyContent>{reply.contents}</ReplyContent>
                            <ReplyBox>
                                <Space css={css`cursor:pointer;`} onClick={() => onLike}>좋아요</Space>
                                <span css={css`cursor:pointer;`} onClick={() => onMore(replyIndex)}>더보기</span>

                                {
                                    openMore.length > 0 ?
                                        openMore[replyIndex].reply ?
                                            <SpeechBubble>
                                                <SpeechBubbleContent css={css`cursor:pointer;`}
                                                                     onClick={() => onDelete(replyIndex)}>삭제하기</SpeechBubbleContent>
                                                <SpeechBubbleContent css={css`cursor:pointer;`}
                                                                     onClick={() => onReport(replyIndex)}>신고하기</SpeechBubbleContent>
                                            </SpeechBubble> : null
                                        : null
                                }
                            </ReplyBox>

                            {
                                reply.children.length > 0 ?
                                    <ReReplyContainer>
                                        {
                                            reply.children.map((reReply: any, reReplyIndex: number) => {
                                                return (
                                                    <ReReplyBox key={reReplyIndex}>
                                                        <ReplyName>{reReply.user.name || '익명'} <Gray>{reReply.created_at}</Gray></ReplyName>
                                                        <ReplyContent>{reReply.contents}</ReplyContent>
                                                        <ReplyBox>
                                                            <span css={css`cursor:pointer; margin-right:10px;`}
                                                                  onClick={() => onLike}>좋아요</span>
                                                            <span css={css`cursor:pointer;`}
                                                                  onClick={() => onMore(replyIndex, reReplyIndex)}>더보기</span>
                                                            {
                                                                openMore.length > 0 ?
                                                                    openMore[replyIndex].reReply[reReplyIndex] ?
                                                                        <SpeechBubble>
                                                                            <SpeechBubbleContent
                                                                                onClick={() => onDelete(replyIndex, reReplyIndex)}>삭제하기</SpeechBubbleContent>
                                                                            <SpeechBubbleContent
                                                                                onClick={() => onReport(replyIndex, reReplyIndex)}>신고하기</SpeechBubbleContent>
                                                                        </SpeechBubble> : null
                                                                    : null
                                                            }
                                                        </ReplyBox>
                                                    </ReReplyBox>
                                                )
                                            })
                                        }
                                        {
                                            reply.children.length > 5 ?
                                                <MoreReply css={css`cursor:pointer;`} onClick={() => moreReReply}>댓글
                                                    더보기...</MoreReply> : null
                                        }
                                        <ReReplyBox>
                                            <ReplyForm>
                                                <ReplyInput value={reReply} onChange={reReplyChange}
                                                            placeholder="댓글을 입력해주세요."/>
                                                <ReplyBtn>등록</ReplyBtn>
                                            </ReplyForm>
                                        </ReReplyBox>
                                    </ReReplyContainer>
                                    : null
                            }
                        </ReplyContainer>
                    )
                })
            }
            {
                replyList.length > 5 ?
                    <ReplyContainer>
                        <MoreReply css={css`cursor:pointer;`} onClick={() => moreReply}>댓글 더보기...</MoreReply>
                    </ReplyContainer> : null
            }
        </>
    )
}

export default Reply;
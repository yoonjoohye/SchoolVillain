import React from "react";
import styled from "@emotion/styled";
import {MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import {FlexBox} from "../../../assets/style/Box.style";
import ReplyInput from "../../components/input/ReplyInput";

const ReplyFormBox=styled.div`
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
  border-bottom:1px solid #eeeeee;
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

interface propsType {
    replyList: any;
    onLike: any;
    onReply: any;
    onMore: any;
    row: number;
    reply: string;
    changeReply: any;

    reReply: string;
    changeReReply: any;

    moreReply: any;
    moreReReply: any;
}

const Reply: React.FC<propsType> = ({replyList, onLike, onReply, onMore, row, reply, changeReply, reReply, changeReReply, moreReply, moreReReply}) => {
    const replyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        changeReply(e.target.value);
    }

    const reReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        changeReReply(e.target.value);
    }

    return (
        <>
            <ReplyFormBox>
                <ReplyForm>
                    <ReplyInput row={row} value={reply} onChange={replyChange}
                                placeholder="댓글을 입력해주세요."/>
                    <ReplyBtn>등록</ReplyBtn>
                </ReplyForm>
            </ReplyFormBox>

            {
                replyList.map((data: any, ListIndex: number) => {
                    return (
                        <ReplyContainer key={ListIndex}>
                            <ReplyName>{data.name} <Gray>{data.date}</Gray></ReplyName>
                            <ReplyContent>{data.contents}</ReplyContent>
                            <ReplyBox>
                                <Space onClick={() => onLike}>좋아요</Space>
                                <Space onClick={() => onReply}>댓글달기</Space>
                                <span onClick={() => onMore}>더보기</span>
                            </ReplyBox>
                            {
                                data.reReply.length > 0 ?
                                    <ReReplyContainer>
                                        {
                                            data.reReply.map((item: any, reReplyIndex: number) => {
                                                return (
                                                    <ReReplyBox key={reReplyIndex}>
                                                        <ReplyName>{item.name} <Gray>{item.date}</Gray></ReplyName>
                                                        <ReplyContent>{item.contents}</ReplyContent>
                                                        <ReplyBox>
                                                            <Space onClick={onLike}>좋아요</Space>
                                                            <span onClick={onMore}>더보기</span>
                                                        </ReplyBox>
                                                    </ReReplyBox>
                                                )
                                            })
                                        }
                                        <ReReplyBox>
                                            <ReplyForm>
                                                <ReplyInput row={row} value={reReply} onChange={reReplyChange}
                                                            placeholder="댓글을 입력해주세요."/>
                                                <ReplyBtn>등록</ReplyBtn>
                                            </ReplyForm>
                                        </ReReplyBox>
                                        {
                                            data.reReply.length > 5 ?
                                                <MoreReply onClick={() => moreReReply}>댓글 더보기...</MoreReply> : null
                                        }
                                    </ReReplyContainer>
                                    : null
                            }
                        </ReplyContainer>
                    )
                })
            }
            <MoreReply onClick={() => moreReply}>댓글 더보기...</MoreReply>
        </>
    )
}

export default Reply;

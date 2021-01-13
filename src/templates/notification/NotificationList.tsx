import React from 'react'
import {css} from "@emotion/core";
import {Grid} from "../../../assets/style/Layout.style";
import {MarkdownBase, MarkdownBody, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import styled from "@emotion/styled";
import {media} from "../../../assets/style/Media.style";
import {IconMd} from "../../../assets/style/Icon.style";

const NotiList = styled.li`
  padding:20px 0; 
  cursor:pointer;
  ${Grid(15, 85)}; 
  align-items: center;
  ${MarkdownSm()}
  ${media.sm`padding:1.5em 0;`}
  border-bottom:1px dashed ${Color.gray100}; 
  
  &:nth-last-child(1){
    border:none;
  }
`

interface notiTypeProps {
    isRead: string | any;
}

const NotiType = styled.div<notiTypeProps>`
  margin-right:0.8em; 
  text-align:center; 
  padding:0.3em;  
  border-radius:0.5em;
  ${(props: notiTypeProps) => props.isRead ?
    css`${MarkdownSm(Color.purple100)}; border:1px solid ${Color.purple100};` :
    css`${MarkdownSm(Color.purple200)}; border:1px solid ${Color.purple200};`
};
`

interface propsType {
    notificationList: any;
    readOne: any;
}

const NotificationList: React.FC<propsType> = ({notificationList, readOne}) => {
    // let list = useSelector(state => state.notification.list);
    return (
        <>
            {
                notificationList.length > 0 && notificationList ?
                    notificationList.map((item: any, index: number) => {
                        return (
                            <NotiList key={`noti-${index}`}
                                      css={css`${item.read_at ? `color:${Color.gray200}` : ''}`}
                                      onClick={() => readOne(item.id, index)}>
                                <div>
                                    {item.notice_type.description === '좋아요' &&
                                    <IconMd src={require('../../../assets/img/icon/like.svg')}/>}
                                    {(item.notice_type.description === '댓글' || item.notice_type.description === '대댓글') &&
                                    <IconMd src={require('../../../assets/img/icon/comment.svg')}/>}
                                </div>
                                <div css={css`${MarkdownBody('#666666', 400)};`}>{item.contents}</div>
                            </NotiList>
                        )
                    })
                    :
                    <div css={css`text-align:center; padding:5em; ${MarkdownBase(Color.gray200)}`}>
                        알림이 존재하지 않습니다.
                    </div>

            }
        </>
    )
}
export default NotificationList;
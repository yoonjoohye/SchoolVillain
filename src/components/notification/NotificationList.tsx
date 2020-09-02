import React from 'react'
import {css} from "@emotion/core";
import {Grid} from "../../../assets/style/Layout.style";
import {MarkdownBase, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import styled from "@emotion/styled";

const NotiList = styled.li`
  padding:1.5em; 
  cursor:pointer; 
  ${Grid(25, 75)}; 
  ${MarkdownSm()}
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
                                      css={css`${item.read_at ? `` : `background-color:${Color.purple100}`}`}
                                      onClick={() => readOne(item.id, index)}>
                                <div>
                                    <div
                                        css={css`margin-right:0.8em; text-align:center; padding:0.3em; ${MarkdownSm(Color.purple200)}; border:1px solid ${Color.purple200}; border-radius:0.5em;`}>{item.notice_type.description}</div>
                                </div>
                                <div>
                                    <p css={css`margin-bottom:0.3em;`}>{item.contents}</p>
                                    <span css={css`${MarkdownSm(Color.gray200)}`}>{item.create_time_ago}</span>
                                </div>

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
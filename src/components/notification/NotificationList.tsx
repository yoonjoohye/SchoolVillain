import React from 'react'
import {css} from "@emotion/core";
import {Grid} from "../../../assets/style/Layout.style";
import {MarkdownBase, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import {useSelector} from "react-redux";
import styled from "@emotion/styled";

const NotiList=styled.li`
  padding:1.5em; 
  cursor:pointer; 
  ${Grid(25, 75)}; 
  ${MarkdownSm()}
`

interface propsType {
    readOne: any;
}

const NotificationList: React.FC<propsType> = ({readOne}) => {
    let list = useSelector(state => state.notification.list);
    return(
        <>
        {
            list.map((item: any, index: number) => {
                return (
                    <NotiList key={`noti-${index}`} css={css`${item.read_at?``:`background-color:${Color.purple100}`}`}
                        onClick={() => readOne(item.id,item.link)}>
                        <div>
                            <div css={css`margin-right:0.8em; text-align:center; padding:0.3em; ${MarkdownSm(Color.purple200)}; border:1px solid ${Color.purple200}; border-radius:0.5em;`}>{item.notice_type.description}</div>
                        </div>
                        <div>
                            <p css={css`margin-bottom:0.3em;`}>{item.contents}</p>
                            <span css={css`${MarkdownSm(Color.gray200)}`}>{item.create_time_ago}</span>
                        </div>

                    </NotiList>
                )
            })
        }
        </>
    )
}
export default NotificationList;
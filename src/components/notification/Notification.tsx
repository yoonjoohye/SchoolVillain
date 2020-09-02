import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {notificationFailure, notificationRequest, notificationSuccess} from "../../reducers/notification";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {css} from "@emotion/core";
import InfiniteScroll from 'react-infinite-scroller';
import NotificationList from "./NotificationList";
import {FlexBox} from "../../../assets/style/Layout.style";
import SkeletonNotification from "../../templates/loading/SkeletonNotification";

const NotiSection = styled.section`
  position:fixed;
  overflow: scroll;
  top:4em;
  width: 350px;
  right:1%;
  height: 80vh;
  background-color:${Color.white};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border-radius: 0.3em;
  text-align:left;
`
const Notification = ({history}:any) => {
    const dispatch = useDispatch();
    let list = useSelector(state => state.notification.list);
    let page = useSelector(state => state.notification.page);

    const [notificationList, setNotificationList] = useState(list);
    const [notificationPage, setNotificationPage] = useState(page);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (page === 1) {
            NotificationAPI(page);
        }
    }, []);

    const NotificationAPI = useCallback(async (page: number) => {
        // dispatch(notificationRequest());
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/notice',
                params: {
                    per_page: 10,
                    page: page
                },
                cache:true
            });
            console.log(response.data);
            if (response.status === 200) {
                if (page > 1) {
                    response.data.data.map((item: any) => {
                        list.push(item);
                    });
                } else {
                    list = response.data.data;
                }
                setNotificationList(list);


                if (response.data.total <= page * 10) {
                    setHasMore(false);
                }

                setNotificationPage(page);
                dispatch(notificationSuccess(list, page));
            }
        } catch (err) {
            // dispatch(notificationFailure());
        }
    },[]);

    const readAll = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/notice/read/all'
            });
            console.log(response.data);
            if (response.status === 200) {

            }
        } catch (err) {
            console.log(err);
        }
    }
    const readOne = async (id: number,link:string) => {
        console.log(`id값 : ${id}`);
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/notice/read',
                data: {
                    id: id
                },
            });
            console.log(response.data);
            if (response.status === 200) {
                location.href=link;
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <NotiSection>
            <div css={css`padding:1.5em; ${FlexBox('','space-between','')}`}>
                <div css={css` ${MarkdownMd('', 600)}`}>빌런 알림</div>
                <div css={css`text-align:right;`}>
                    <button css={css`padding:0.3em 0.5em; border-radius:0.3em; background-color:${Color.purple100}; ${MarkdownSm(Color.purple200)}`} onClick={readAll}>모두 확인</button>
                </div>
            </div>
            <InfiniteScroll
                pageStart={0}
                loadMore={()=>NotificationAPI(page+1)}
                hasMore={hasMore}
                useWindow={false}
                threshold={5}
                useCapture={false}
                loader={<SkeletonNotification key={0}/>}>
                <NotificationList readOne={readOne}/>
            </InfiniteScroll>
        </NotiSection>
    )
}

export default Notification;

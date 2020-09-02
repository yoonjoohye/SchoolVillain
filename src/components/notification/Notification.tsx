import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {notificationRequest, readNotification} from "../../reducers/notification";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {css} from "@emotion/core";
import InfiniteScroll from 'react-infinite-scroll-component';
import NotificationList from "./NotificationList";
import {FlexBox} from "../../../assets/style/Layout.style";
import SkeletonNotification from "../../templates/loading/SkeletonNotification";
import { useHistory } from "react-router-dom";
import produce from "immer";

const NotiSection = styled.section`
  position:fixed;
  overflow: hidden;
  top:4em;
  width: 350px;
  right:1%;
  background-color:${Color.white};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border-radius: 0.3em;
  text-align:left;
`
interface propsType{
    history?:History;
}
const Notification:React.FC<propsType> = () => {
    let history=useHistory();
    const dispatch = useDispatch();
    let list = useSelector(state => state.notification.list);
    let page = useSelector(state => state.notification.page);
    const [notificationList, setNotificationList] = useState(list);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        if (page === 1) {
            NotificationAPI(page);
        }
    }, []);

    const NotificationAPI = useCallback(async (page: number) => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/notice',
                params: {
                    per_page: 10,
                    page: page
                }
            });
            // console.log(response.data);
            if (response.status === 200) {
                if (page > 1) {
                    response.data.data.map((item: any) => {
                        list.push(item);
                    });
                } else {
                    list = response.data.data;
                }
                setNotificationList(list);

                if (response.data.last_page <= page) {
                    setHasMore(false);
                }else{
                    setHasMore(true);
                }

                dispatch(notificationRequest(list, page));
            }
        } catch (err) {
            console.log(err);
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
    const readOne = async (id: number,index:number) => {
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
                setNotificationList(produce(draft=>{
                    draft[index]=response.data;
                }));
                // list[index]=response.data;
                // dispatch(readNotification(list));
                location.href=response.data.link;
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
            <div id="notification" css={css`max-height:80vh; overflow:auto`}>
                <InfiniteScroll
                    css={css` &.infinite-scroll-component{overflow:revert!important;}`}
                    dataLength={notificationList.length}
                    next={() => NotificationAPI(page + 1)}
                    hasMore={hasMore}
                    loader={
                        <SkeletonNotification/>
                    }
                    scrollableTarget="notification">
                    <NotificationList notificationList={notificationList} readOne={readOne}/>
                </InfiniteScroll>
            </div>
        </NotiSection>
    )
}

export default Notification;

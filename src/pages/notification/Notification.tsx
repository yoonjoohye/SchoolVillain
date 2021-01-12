import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {notificationRequest, readNotification, readNotificationCount} from "../../reducers/notification";
import styled from "@emotion/styled";
import {Color} from "../../../assets/style/Color.style";
import {MarkdownLg, MarkdownLgx, MarkdownMd, MarkdownSm} from "../../../assets/style/Markdown.style";
import {css} from "@emotion/core";
import InfiniteScroll from 'react-infinite-scroll-component';
import NotificationList from "../../templates/notification/NotificationList";
import {FlexBox, NotificationSection, onlyPc, Section} from "../../../assets/style/Layout.style";
import SkeletonNotification from "../../templates/loading/SkeletonNotification";
import produce from "immer";
import SEO from "../../templates/SEO/SEO";

const NotiSection = styled.section`
  position:fixed;
  overflow: hidden;
  top:4em;
  padding:20px;
  width: 400px;
  right:1%;
  background-color:${Color.white};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border-radius: 0.3em;
  text-align:left;
`

interface propsType {
    history?: History;
}

const Notification: React.FC<propsType> = ({history}) => {
    const dispatch = useDispatch();

    let list = useSelector(state => state.notification.list);
    let page = useSelector(state => state.notification.page);
    let count = useSelector(state => state.notification.count);

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
                } else {
                    setHasMore(true);
                }

                dispatch(notificationRequest(list, page));
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const readAll = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/notice/read/all'
            });
            // console.log(response.data);
            if (response.status === 201) {
                setNotificationList(produce(draft => {
                    notificationList.map((item: any, index: number) => {
                        draft[index].read_at = 'date';
                    });
                }));
                dispatch(readNotificationCount(0));
            }
        } catch (err) {
            console.log(err);
        }
    }
    const readOne = async (id: number, index: number) => {
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
                setNotificationList(produce(draft => {
                    draft[index] = response.data;
                }));
                location.href = response.data.link;
                dispatch(readNotificationCount(count - 1));
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <SEO title="알림페이지 | 스쿨빌런"
                 description="스쿨빌런 알림 페이지입니다."
                 keywords="스쿨빌런 알림 페이지"/>
            {
                window.screen.width > 480 ?
                    <NotiSection>
                        <div css={css` ${FlexBox('', 'space-between', '')}`}>
                            <div css={css` ${MarkdownLgx('', 500)}`}>알람</div>
                            <div css={css`text-align:right;`}>
                                <button onClick={readAll}>
                                    <img src={require('../../../assets/img/icon/cancel.svg')}/>
                                </button>
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
                    :
                    <section css={css`${NotificationSection()}; padding-top:6em; padding-bottom:4em;`}>
                        <div css={css`margin-bottom:1.5em; ${FlexBox('', 'space-between', '')}`}>
                            <div css={css`${MarkdownLgx('', 500)}`}>알람</div>
                            <div css={css`text-align:right;`}>
                                <button onClick={readAll}>
                                    <img src={require('../../../assets/img/icon/cancel.svg')}/>
                                </button>
                            </div>
                        </div>
                        <InfiniteScroll
                            css={css` &.infinite-scroll-component{overflow:revert!important;}`}
                            dataLength={notificationList.length}
                            next={() => NotificationAPI(page + 1)}
                            hasMore={hasMore}
                            loader={
                                <SkeletonNotification/>
                            }>
                            <NotificationList notificationList={notificationList} readOne={readOne}/>
                        </InfiniteScroll>
                    </section>
            }
        </>
    )
}

export default Notification;

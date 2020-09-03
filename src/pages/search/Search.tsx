import PreviewBoard from "../../templates/board/PreviewBoard";
import {css} from "@emotion/core";
import {Section} from "../../../assets/style/Layout.style";
import axios from "axios";
import SkeletonPreviewBoard from "../../templates/loading/SkeletonPreviewBoard";
import {MarkdownSm} from "../../../assets/style/Markdown.style";
import {Color} from "../../../assets/style/Color.style";
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchBoardListRequest} from "../../reducers/search";

const Search=({history}:any)=>{
    const dispatch = useDispatch();
    console.log(location.search);
    let keyword=useSelector(state=>state.search.keyword);
    let list = useSelector(state => state.search.boardList);
    let page=useSelector(state=>state.search.boardPage);

    const [boardList,setBoardList]=useState(list);
    const [hasMore,setHasMore]=useState(false);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        if(page===1) {
            SearchAPI(page);
        }
    }, []);

    const SearchAPI=useCallback(async (page:number)=>{
        setLoading(true);
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/board/search',
                params:{
                    per_page:10,
                    page:page,
                    keyword:keyword
                },
                cache: true
            });
            console.log(response);
            if (response.status === 200) {
                if(page>1) {
                    response.data.data.map((item: any) => {
                        list.push(item);
                    });
                }else{
                    list=response.data.data;
                }
                setBoardList(list);
                if (response.data.last_page <= page) {
                    setHasMore(false);
                }else{
                    setHasMore(true);
                }
                dispatch(searchBoardListRequest(list,page));
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    },[]);

    const goDetail = useCallback((id: number) => {
        history.push(`/detail/${id}`);
    }, []);

    return(
        <section css={css`${Section()};`}>
            <div>{keyword} 검색결과</div>
            <InfiniteScroll
                css={css` &.infinite-scroll-component{overflow:revert!important;}`}
                dataLength={boardList.length}
                next={() => SearchAPI(page + 1)}
                hasMore={hasMore}
                loader={
                    <SkeletonPreviewBoard/>
                }
                endMessage={<div
                    css={css`text-align: center; padding:5em; ${MarkdownSm(Color.gray200)}`}>●</div>}>
                <PreviewBoard loading={loading} boardList={boardList} goDetail={goDetail}/>
            </InfiniteScroll>
        </section>
    )
}
export default Search;
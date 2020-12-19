import {css} from "@emotion/core";
import {onlyMobile, onlyPc, Section} from "../../../assets/style/Layout.style";
import {Color} from "../../../assets/style/Color.style";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchBoardListRequest, searchKeyword} from "../../reducers/search";
import styled from "@emotion/styled";
import {MarkdownLg, MarkdownMd, MarkdownMdx, MarkdownSm} from "../../../assets/style/Markdown.style";
import Result from "./Result";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonPreviewBoard from "../../templates/loading/SkeletonPreviewBoard";
import PreviewBoard from "../../templates/board/PreviewBoard";
import axios from "axios";
import {media} from "../../../assets/style/Media.style";

const SearchInput = styled.input`
  background-image:url(${require('../../../assets/img/icon/search.svg')});
  background-repeat: no-repeat;
  background-position: calc(100%);
  background-size: 20px;
  width:100%; 
  border:0; 
  padding:0.5em 0;
  border-bottom:1px solid #242424;
  ${MarkdownMdx()};
  ${onlyMobile()};
`
const Search = ({history}) => {
    const dispatch = useDispatch();
    const word = useSelector(state => state.search.keyword);
    const [keyword, setKeyword] = useState(word);

    let list = useSelector(state => state.search.boardList);
    let page=useSelector(state=>state.search.boardPage);

    const [boardList,setBoardList]=useState(list);
    const [hasMore,setHasMore]=useState(false);
    const [loading,setLoading]=useState(true);



    useEffect(() => {
        if(page===1) {
            SearchAPI(page);
        }
    },[word]);

    // useEffect(() => {
    //     if(page===1) {
    //         SearchAPI(page);
    //     }
    // }, [keyword]);

    const SearchAPI=async (page:number)=>{
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
            // console.log(response);
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
    }

    const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setKeyword(value);
    }
    const onSearchEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            dispatch(searchKeyword(keyword));
        }
    }
    const goDetail = useCallback((id: number) => {
        history.push(`/detail/${id}`);
    }, []);

    return (
        <section css={css`${Section()}; padding-top:6em;`}>
            <div css={css`${media.sm`padding:20px`}`}>
                <SearchInput type="text" value={keyword} placeholder="스쿨빌런 검색" onChange={changeKeyword}
                             onKeyPress={(e: React.KeyboardEvent) => onSearchEnter(e)}/>

                <div css={css`${MarkdownMd(Color.black,500)}; margin-bottom:20px; ${media.sm`margin:0; margin-top:20px;`}`}>'{keyword}' 검색결과</div>
            </div>
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
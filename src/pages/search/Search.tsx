import {css} from "@emotion/core";
import {onlyPc, Section} from "../../../assets/style/Layout.style";
import {Color} from "../../../assets/style/Color.style";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchKeyword} from "../../reducers/search";
import styled from "@emotion/styled";
import {MarkdownLg, MarkdownMd} from "../../../assets/style/Markdown.style";
import Result from "./Result";

const SearchInput = styled.input`
  background-image:url(${require('../../../assets/img/icon/search_purple.svg')});
  background-repeat: no-repeat;
  background-position: calc(100%);
  background-size: 20px;
  width:100%; 
  border:0; 
  padding:0.5em 0;
  border-bottom:1px solid ${Color.purple200};
  ${MarkdownLg()};
`
const Search = () => {
    const dispatch = useDispatch();
    const word = useSelector(state => state.search.keyword);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        setKeyword(word);
        return()=>{
            setKeyword(word);
        }
    },[word]);

    const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = e.target;
        setKeyword(value);
    }
    const onSearchEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            dispatch(searchKeyword(keyword));
        }
    }

    return (
        <section css={css`${Section()};`}>
            <SearchInput type="text" value={keyword} placeholder="스쿨빌런 검색" onChange={changeKeyword}
                         onKeyPress={(e: React.KeyboardEvent) => onSearchEnter(e)}/>
            <Result/>
        </section>
    )
}
export default Search;
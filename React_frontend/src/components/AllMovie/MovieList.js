import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALLMOVIE_REQUEST, MOVIE_SEARCH_REQUEST } from "../../reducer/movie";
import Movie from "./Movie";
import Loading from "../Common_components/Loading";
import styled from "styled-components";
import { Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
const { Search } = Input;
const MovieList = () => {
  const dispatch = useDispatch();

  const [Limit, setLimit] = useState(8); //더보기 리미트
  const L = 8;

  const { allMovie, movie_search_loading } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch({
      type: ALLMOVIE_REQUEST,
    });
  }, []);
  const onSearch = useCallback((value) => {
    dispatch({
      type: MOVIE_SEARCH_REQUEST,
      data: value,
    });
    setLimit(L);
  }, []);

  const onMoreClick = useCallback(() => {
    setLimit(Limit + 8);
    console.log("리미트" + Limit);
  }, [Limit]);

  return (
    <Container>
      <InnerWraps>
        <div className="titleMenu">
          <h1>전체영화</h1>
        </div>
        <div className="search">
          <p style={{ fontWeight: "1000" }}>
            {`${allMovie.slice(0, Limit).length}개의 영화가 검색되었습니다.`}
          </p>
          <div className="search_button">
            <Search
              placeholder="영화명 검색"
              allowClear
              onSearch={onSearch}
              style={{
                width: 200,
                height: 50,
              }}
            />
          </div>
        </div>

        {movie_search_loading ? (
          <Loading />
        ) : (
          <div className="movie-list">
            <UL>
              {allMovie.slice(0, Limit).map((movie) => (
                <Movie movie={movie} key={movie.id} />
              ))}
            </UL>
          </div>
        )}

        {Limit >= allMovie.length ? (
          ""
        ) : (
          <More onClick={onMoreClick}>
            더보기 <DownOutlined />
          </More>
        )}
      </InnerWraps>
    </Container>
  );
};
const Container = styled.div`
  padding: 0;
  width: 1250px;
  margin-left: 170px;
  box-sizing: border-box;
  margin-bottom: 0;
`;

const InnerWraps = styled.div`
  width: 100%;

  .titleMenu {
    position: relative;
    top: 20px;
  }
  .search {
    display: inline-box;
    width: 93%;
    border-bottom: 3px solid #241d1e;
    padding-bottom: 15px;
    .search_button {
      position: absolute;
      right: 190px;
      padding-top: 15px;
    }
  }
`;

const UL = styled.ul`
  align-items: center;
  list-style-type: none;
  width: 100%;
  padding-left: 0px;
  height: 100%;

  &:after {
    content: "";
    clear: both;
    display: block;
  }
`;

const More = styled.button`
  width: 1170px;
  height: 40px;
  background-color: transparent;
  border: 1px solid gainsboro;
  color: #666;
  cursor: pointer;
  font-size: 1em;
  line-height: 1.15;
  &:hover {
    border: 1px solid black;
  }
`;
export default MovieList;

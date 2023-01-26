import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALLMOVIE_REQUEST, MOVIE_SEARCH_REQUEST } from "../../reducer/ticket";
import Movie from "./Movie";
import styled from "styled-components";
import { Input } from "antd";
const { Search } = Input;
const MovieList = () => {
  const dispatch = useDispatch();
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
    console.log(value);
  }, []);

  const { allMovie } = useSelector((state) => state.ticket);
  return (
    <Container>
      <Content>
        <InnerWraps>
          <div className="titleMenu">
            <h1>전체영화</h1>
          </div>
          <div className="search">
            <p style={{ fontWeight: "1000" }}>
              {`${allMovie.length}개의 영화가 검색되었습니다.`}
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

          <div className="movie-list">
            <UL>
              {allMovie.map((movie) => (
                <Movie movie={movie} key={movie.id} />
              ))}
            </UL>
          </div>
        </InnerWraps>
      </Content>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  padding: 0;
  width: 1250px;
  height: 2000px;
  margin-left: 170px;
  box-sizing: border-box;
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
`;
const InnerWraps = styled.div`
  position: absolute;
  width: 100%;
  .titleMenu {
    position: relative;
    top: 20px;
  }
  .search {
    display: inline-box;
    .search_button {
      position: absolute;
      right: 85px;
      padding-top: 15px;
    }
  }
`;

const UL = styled.ul`
  align-items: center;
  list-style-type: none;
  width: 100%;
  padding-left: 0px;

  &:after {
    content: "";
    clear: both;
    display: block;
  }
`;
export default MovieList;

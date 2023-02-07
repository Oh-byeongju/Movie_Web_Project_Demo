import React, { useCallback, useEffect, useState, useRef } from "react";
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

  // UL의 높이를 구하기 위한 useRef
  const UL_Ref = useRef();
  const [Height, setHeight] = useState(962.4);

  const [Limit, setLimit] = useState(8); //더보기 리미트
  const L = 8;

  const { allMovie, movie_search_loading } = useSelector(
    (state) => state.movie
  );

  // 로그인 리덕스 상태
  const { LOGIN_data } = useSelector((state) => state.R_user_login);

  // 로그인 상태에 따라 전체 검색이 다름(좋아요 표시 때문)
  useEffect(() => {
    dispatch({
      type: ALLMOVIE_REQUEST,
      data: LOGIN_data.uid
    });
  }, [LOGIN_data.uid, dispatch]);

  // 검색 버튼 누를때 실행되는 함수
  const onSearch = useCallback((value) => {
    dispatch({
      type: MOVIE_SEARCH_REQUEST,
      data: value,
    });
    setLimit(L);

    // UL의 높이 갱신
    var UL_Ref_style = window.getComputedStyle(UL_Ref.current);
    var UL_Ref_height = UL_Ref_style.getPropertyValue('height');
    setHeight(parseInt(UL_Ref_height) + 32.4);
  }, [dispatch]);

  const onMoreClick = useCallback(() => {
    setLimit(Limit + 8);
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
            <SearchWarp
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
          <Loading height={Height}/>
        ) : (
          <div className="movie-list">
            <UL ref={UL_Ref}>
              {/* 영화 검색 결과에 따라 다른 화면을 출력 */}
              {allMovie.length !== 0 ?
              allMovie.slice(0, Limit).map((movie) => (
                <Movie movie={movie} key={movie.id} />
              )) : 
              <NoSearch>
                <p>
                  현재 상영중인 영화가 없습니다.
                </p>
              </NoSearch>}
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

const SearchWarp = styled(Search)`
  span {
    .ant-input-clear-icon {
    display: none; 
    }
    .ant-input-affix-wrapper {
      border-color: #a0a0a0;
    }
    .ant-input-group-addon {
      border-color: #a0a0a0;
    }
    .ant-btn {
      border-color: #a0a0a0;
    }
    .ant-input::placeholder {
        color: #a0a0a0;
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

const NoSearch = styled.div`
  padding: 60px 0 60px 0;
  color: #222;
  text-align: center;
  font-size: 1.3333em;
  
  p {
    margin: 0;
    padding: 50px 0;
    border: 1.5px solid #f5f5f5;
    border-width: 1.5px 0 1.5px 0;
  }
`;

const More = styled.button`
  margin-bottom: 70px;
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

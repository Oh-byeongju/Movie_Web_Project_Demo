import { id } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { select } from "redux-saga/effects";
import styled from "styled-components";
import { ALLMOVIE_REQUEST } from "../../reducer/movie";
import {
  ALLTHEATER_REQUEST,
  SELECT_THEATER_REQUEST,
  SELECT_DAY_REQUEST,
  SELECT_MOVIETHEATER_REQUEST,
  T_ALLMOVIE_REQUEST,
  SELECT_MOVIETHEATER_TO_DAY_REQUEST,
} from "../../reducer/ticket";
const AllMovieList = ({ movieId, setMovieId, areaName, theater }) => {
  const dispatch = useDispatch();
  const { allTheater_done, t_allMovie, select_TheaterToMovie_done } =
    useSelector((state) => state.ticket);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [disable, setDisable] = useState(true);
  const CopyMovie = [];

  // 로그인 리덕스 상태
  const { LOGIN_data } = useSelector((state) => state.R_user_login);

  // 영화 예매 페이지에 쓸모 없을수도 있지만 Spring boot 메소드가 겹쳐서 로그인 상태도 같이 묶어서 보냄
  useEffect(() => {
    dispatch({
      type: T_ALLMOVIE_REQUEST,
      data: LOGIN_data.uid,
    });
  }, [LOGIN_data.uid, dispatch]);

  //영화 토클 함수
  const selectMovie = (movie_id) => {
    const selectedObject = t_allMovie.find(({ id }) => id === movie_id);
    setSelectedMovie(selectedObject.id);
  };

  return (
    <MovieWrapper>
      <MovieTitle>영화</MovieTitle>
      <MovieSelector>
        <MovieSelectorText>전체</MovieSelectorText>
      </MovieSelector>
      <MovieListWrapper>
        {t_allMovie.map((movie) => {
          if (movie.able === "able") {
            return (
              <MovieList
                onClick={() => {
                  if (select_TheaterToMovie_done) {
                    dispatch({
                      type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
                      data: {
                        mid: movie.id,
                        tid: theater,
                      },
                    });
                  }
                  selectMovie(movie.id);
                  setMovieId(movie.id);
                }}
                movie={movie.id}
                selectedMovie={selectedMovie}
              >
                <MovieListMovieName selectedMovie={selectedMovie}>
                  {movie.title}
                </MovieListMovieName>
              </MovieList>
            );
          } else if (movie.able === "disable") {
            return (
              <MovieList
                onClick={() => {}}
                movie={movie.id}
                selectedMovie={selectedMovie}
              >
                <MovieListMovieName
                  selectedMovie={selectedMovie}
                  className="disable"
                >
                  {movie.title}
                </MovieListMovieName>
              </MovieList>
            );
          } else {
            return (
              <MovieList
                onClick={() => {
                  dispatch({
                    type: SELECT_THEATER_REQUEST,
                    data: movie.id,
                  });

                  if (select_TheaterToMovie_done) {
                    dispatch({
                      type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
                      data: {
                        mid: movie.id,
                        tid: theater,
                      },
                    });
                  } else if (!select_TheaterToMovie_done) {
                    dispatch({
                      type: SELECT_DAY_REQUEST,
                      data: movie.id,
                    });
                  }

                  selectMovie(movie.id);
                  setMovieId(movie.id);
                }}
                movie={movie.id}
                selectedMovie={selectedMovie}
              >
                <MovieListMovieName selectedMovie={selectedMovie}>
                  {movie.title}
                </MovieListMovieName>
              </MovieList>
            );
          }
        })}
      </MovieListWrapper>
    </MovieWrapper>
  );
};

export default AllMovieList;
const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  border-right: 1px solid #d8d9db;
`;

const MovieTitle = styled.div`
  color: #222;
  font-size: 20px;
  line-height: 38px;
  padding: 20px 0 0 20px;
`;

const MovieSelector = styled.div`
  padding: 18px;
`;

const MovieSelectorText = styled.div`
  border: 1px solid #d8d9db;
  border-bottom: none;
  height: 35px;
  font-size: 16px;
  text-align: center;
  margin-top: 10;
  padding-top: 6px;
`;

const MovieListWrapper = styled.div`
  padding: 10px 18px 0 20px;
  height: 290px;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const MovieList = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  padding: 4px 0px 4px 7px;
  
    .disable {
      cursor: default;
        opacity:0.5;
      
    }
  }
  background-color: ${(props) =>
    props.selectedMovie === props.movie ? "gray" : "white"};
`;

const MovieListMovieName = styled.div`
  font-size: 13px;
  width: 174px;
  margin-left: 10px;
  color: ${(props) =>
    props.selectedMovie === props.movie ? "white" : "black"};
`;

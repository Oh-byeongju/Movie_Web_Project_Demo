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
  SELECT_DAYMOVIE_TO_THEATER_REQUEST,
} from "../../reducer/ticket";
const AllMovieList = ({ setMovieId, theater, day }) => {
  const dispatch = useDispatch();
  const {
    allTheater_done,
    t_allMovie,
    select_TheaterToMovie_done,
    select_Theater_To_Day_done,
    select_day_to_theater_done,
    select_day_to_movie_done,
    select_daytheater_to_movie_done,
    choiceMovie,
    choiceTheater,
    choiceDay,
  } = useSelector((state) => state.ticket);
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
      <MovieTitle>
        <p>영화</p>
      </MovieTitle>
      <MovieSelector>
        <MovieSelectorText>전체</MovieSelectorText>
      </MovieSelector>
      <MovieListWrapper>
        {t_allMovie.map((movie) => {
          if (movie.able === "able") {
            //극장이나 날짜가 선택이 되어서 able 이 활성화됨
            //극장이 선택된 상태에서 영화 선택
            //날짜가 선택된 상태에서 영화선택
            //극장,날짜가 두개 다 선택된 상태에서 영화 검색
            return (
              <MovieList
                onClick={() => {
                  //둘다 선택
                  if (choiceDay && choiceTheater) {
                    dispatch({
                      type: SELECT_DAYMOVIE_TO_THEATER_REQUEST,
                      data: {
                        miday: day,
                        mid: movie.id,
                      },
                    });
                    dispatch({
                      type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
                      data: {
                        mid: movie.id,
                        tid: theater,
                      },
                    });
                  }
                  //극장 선택
                  else if (choiceTheater && !choiceDay) {
                    dispatch({
                      type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
                      data: {
                        mid: movie.id,
                        tid: theater,
                      },
                    });

                    //극장이 선택되어 있어도 극장은 같이 변해야함
                    dispatch({
                      type: SELECT_THEATER_REQUEST,
                      data: movie.id,
                    });
                  }
                  //날
                  else if (!choiceTheater && choiceDay) {
                    dispatch({
                      type: SELECT_DAY_REQUEST,
                      data: movie.id,
                    });
                    dispatch({
                      type: SELECT_DAYMOVIE_TO_THEATER_REQUEST,
                      data: {
                        miday: day,
                        mid: movie.id,
                      },
                    });
                  }
                  //두개다 선택되어있을때

                  selectMovie(movie.id);
                  setMovieId(movie.id);
                }}
                movie={movie.id}
                selectedMovie={selectedMovie}
              >
                <MovieListMovieName selectedMovie={selectedMovie}>
                  <Img src={`img/age/${movie.rating}.png`} alt="영화" />

                  {movie.title}
                </MovieListMovieName>
              </MovieList>
            );
          } else if (movie.able === "disable") {
            //해당하는 데이터가 아닐때
            //다시 극장, 날짜 select
            return (
              <MovieList
                onClick={() => {
                  dispatch({
                    type: SELECT_THEATER_REQUEST,
                    data: movie.id,
                  });
                  dispatch({
                    type: SELECT_DAY_REQUEST,
                    data: movie.id,
                  });
                  selectMovie(movie.id);
                  setMovieId(movie.id);
                }}
                movie={movie.id}
                selectedMovie={selectedMovie}
              >
                <MovieListMovieName
                  selectedMovie={selectedMovie}
                  className="disable"
                >
                  <Img src={`img/age/${movie.rating}.png`} alt="영화" />

                  {movie.title}
                </MovieListMovieName>
              </MovieList>
            );
          } else {
            return (
              <MovieList
                onClick={() => {
                  //allmovie(초기상태)
                  //영화 클릭시 날짜 극장 검색해주면 됨
                  dispatch({
                    type: SELECT_THEATER_REQUEST,
                    data: movie.id,
                  });
                  dispatch({
                    type: SELECT_DAY_REQUEST,
                    data: movie.id,
                  });

                  selectMovie(movie.id);
                  setMovieId(movie.id);
                }}
                movie={movie.id}
                selectedMovie={selectedMovie}
              >
                <MovieListMovieName selectedMovie={selectedMovie}>
                  <Img src={`img/age/${movie.rating}.png`} alt="영화" />
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
  width: 284px;
  border-right: 1px solid #d8d9db;
  background-color: #f2f0e5;
`;

const MovieTitle = styled.div`
  color: #222;
  position: relative;
  height: 33px;
  line-height: 33px;
  text-align: center;
  font-size: 20px;
  padding: 20px 0 20px 20px;
  font-weight: bold;
  top: -15px;
  p {
    display: block;
    position: relative;
    left: -10px;
  }
`;

const MovieSelector = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const MovieSelectorText = styled.div`
  border: 1px solid #d8d9db;
  border-bottom: none;
  height: 35px;
  margin-left: 20px;
  width: 240px;
  font-size: 16px;
  text-align: center;
  margin-top: 10;
  padding-top: 6px;
`;

const MovieListWrapper = styled.div`
  padding: 10px 18px 0 20px;
  height: 400px;
  width: 235px;
  display: flex;
  overflow-x: scroll;

  overflow-x: hidden;
  flex-direction: column;
`;

const MovieList = styled.div`
clear: both;
float: left;
width: 244px;
height: 35px;
line-height: 35px;
margin-bottom: 1px;
position: relative;
background-color:#f2f0e5;
  
    .disable {
      cursor: default;
        opacity:0.5;
      
    }
  }
  background-color: ${(props) =>
    props.selectedMovie === props.movie ? "gray" : "#f2f0e5"};
`;

const MovieListMovieName = styled.div`
  font-size: 13px;
  width: 174px;
  margin-left: 10px;
  color: ${(props) =>
    props.selectedMovie === props.movie ? "white" : "black"};
`;

const Img = styled.img`
  width: 23px;
  height: 20px;
  position: relative;
  top: 3px;
  padding-right: 10px;
`;

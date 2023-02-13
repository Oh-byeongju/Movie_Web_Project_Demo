import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  SELECT_THEATER_REQUEST,
  SELECT_DAY_REQUEST,
  T_ALLMOVIE_REQUEST,
  SELECT_MOVIETHEATER_TO_DAY_REQUEST,
  SELECT_DAYMOVIE_TO_THEATER_REQUEST,
  MOVIE_DATA,
  RESET_DAY_DATA,
  RESET_THEATER_DATA,
  RESET_MOVIE_DATA,
} from "../../reducer/ticket";
const AllMovieList = ({ setDayMore }) => {
  const dispatch = useDispatch();
  const {
    t_allMovie,
    choiceTheater,
    choiceDay,
    movieData,
    theaterData,
    DayData,
  } = useSelector((state) => state.ticket);
  // 로그인 리덕스 상태
  const { LOGIN_data } = useSelector((state) => state.R_user_login);
  // 영화 예매 페이지에 쓸모 없을수도 있지만 Spring boot 메소드가 겹쳐서 로그인 상태도 같이 묶어서 보냄
  useEffect(() => {
    dispatch({
      type: T_ALLMOVIE_REQUEST,
      data: LOGIN_data.uid,
    });
    return () => {
      dispatch({
        type: RESET_MOVIE_DATA,
      });
    };
  }, [LOGIN_data.uid, dispatch]);

  //able된 영화를 선택하는 함수
  const onClickMovie = (data) => {
    dispatch({
      type: MOVIE_DATA,
      data: data,
    });
    //날짜와 극장이 선택되어있을 때
    if (choiceDay && choiceTheater) {
      dispatch({
        type: SELECT_DAYMOVIE_TO_THEATER_REQUEST,
        data: {
          miday: DayData.miday,
          mid: data.id,
        },
      });
      dispatch({
        type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
        data: {
          mid: data.id,
          tid: theaterData.tid,
        },
      });
    }
    //극장이 선택되어 있을 때
    else if (choiceTheater && !choiceDay) {
      dispatch({
        type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
        data: {
          mid: data.id,
          tid: theaterData.tid,
        },
      });

      //극장이 선택되어 있어도 극장은 같이 변해야함
      dispatch({
        type: SELECT_THEATER_REQUEST,
        data: data.id,
      });
    }
    //날짜가 선택되어 있을 때
    else if (!choiceTheater && choiceDay) {
      console.log("날짜만선택");
      dispatch({
        type: SELECT_DAY_REQUEST,
        data: data.id,
      });
      dispatch({
        type: SELECT_DAYMOVIE_TO_THEATER_REQUEST,
        data: {
          miday: DayData.miday,
          mid: data.id,
        },
      });
    }
  };

  //disable된 상태 검색
  const onClickDisable = (data) => {
    if (
      !window.confirm(
        "선택한 영화에 원하시는 상영스케줄이 없습니다. 계속하겠습니까?"
      )
    ) {
      return;
    }
    dispatch({
      type: MOVIE_DATA,
      data: data,
    });
    dispatch({
      type: RESET_DAY_DATA,
    });
    dispatch({
      type: RESET_THEATER_DATA,
    });
    //영화도 새로고침
    dispatch({
      type: T_ALLMOVIE_REQUEST,
      data: LOGIN_data.uid,
    });
    //극장을 영화에 대해 검색
    dispatch({
      type: SELECT_THEATER_REQUEST,
      data: data.id,
    });
    //날짜를 영화에 대해 검색
    dispatch({
      type: SELECT_DAY_REQUEST,
      data: data.id,
    });
    setDayMore("");
  };
  //영화 토클 함수

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
                  onClickMovie(movie);
                }}
                key={movie.id}
                movieData={movieData}
                movie={movie.id}
              >
                <MovieListMovieName movieData={movieData}>
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
                  //disable된 영화를 선택하면 theater day 모두 영화로 다시 검색
                  onClickDisable(movie);
                }}
                key={movie.id}
                movieData={movieData}
                movie={movie.id}
              >
                <MovieListMovieName movieData={movieData} className="disable">
                  <Img src={`img/age/${movie.rating}.png`} alt="영화" />

                  {movie.title}
                </MovieListMovieName>
              </MovieList>
            );
          } else {
            return (
              <MovieList
                onClick={() => {
                  dispatch({
                    type: MOVIE_DATA,
                    data: movie,
                  });
                  //allmovie(태초상태)
                  //영화 클릭시 날짜 극장 검색해주면 됨
                  dispatch({
                    type: SELECT_THEATER_REQUEST,
                    data: movie.id,
                  });
                  dispatch({
                    type: SELECT_DAY_REQUEST,
                    data: movie.id,
                  });
                }}
                key={movie.id}
                movieData={movieData}
                movie={movie.id}
              >
                <MovieListMovieName movieData={movieData}>
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
    left: -4px;
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
cursor:pointer;
    .disable {
      cursor: default;
        opacity:0.5;
      
    }
  }
  background-color: ${(props) =>
    props.movieData.id === props.movie ? "gray" : "#f2f0e5"};
`;

const MovieListMovieName = styled.div`
  font-size: 13px;
  width: 174px;
  margin-left: 10px;
`;

const Img = styled.img`
  width: 23px;
  height: 20px;
  position: relative;
  top: 3px;
  padding-right: 10px;
`;

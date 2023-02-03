import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { select } from "redux-saga/effects";
import styled from "styled-components";
import { ALLMOVIE_REQUEST } from "../../reducer/movie";
import { SELECT_THEATER_REQUEST } from "../../reducer/ticket";
const AllMovieList = ({ movieId, setMovieId, area }) => {
  const dispatch = useDispatch();
  const { allMovie } = useSelector((state) => state.movie);
  const { select_TheaterToMovie_done, selectTheaterToMovie } = useSelector(
    (state) => state.ticket
  );
  const [selectedMovie, setSelectedMovie] = useState("");

  useEffect(() => {
    dispatch({ type: ALLMOVIE_REQUEST });
  }, []);

  //영화 토클 함수

  const selectMovie = (movie_id) => {
    const selectedObject = allMovie.find(({ id }) => id === movie_id);
    setSelectedMovie(selectedObject.id);
  };

  return (
    <MovieWrapper>
      <MovieTitle>영화</MovieTitle>
      <MovieSelector>
        <MovieSelectorText>전체</MovieSelectorText>
      </MovieSelector>
      <MovieListWrapper>
        {select_TheaterToMovie_done ? (
          <div>
            {selectTheaterToMovie.map((movie) => (
              <MovieList
                onClick={() => {
                  dispatch({
                    type: SELECT_THEATER_REQUEST,
                    data: movie.id,
                  });
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
            ))}
          </div>
        ) : (
          <div>
            {allMovie.map((movie) => (
              <MovieList
                onClick={() => {
                  dispatch({
                    type: SELECT_THEATER_REQUEST,
                    data: movie.id,
                  });
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
            ))}
          </div>
        )}
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
`;

const MovieList = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  padding: 4px 0px 4px 7px;
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

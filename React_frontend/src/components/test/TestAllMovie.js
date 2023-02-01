import React from "react";
import styled from "styled-components";
const TestAllMovie = ({
  movieList,
  selectedMovie,
  setSelectedMovie,
  setSelectedTheater,
  setSelectedRegion,
  setRegionTheaters,
  setTimeList,
}) => {
  const selectMovie = (movie_id) => {
    //movliest에서 id를 찾아 매개변수와 비교 후 setSelectMovie로 변수 set()
    const selectedObject = movieList.find(({ id }) => id === movie_id);
    setSelectedMovie(selectedObject.id);
    //밑에것은 이 컴포넌트에서 다루지 않음
    setSelectedTheater("");
    setSelectedRegion("");
    setRegionTheaters([]);
    setTimeList([]);
  };
  return (
    <MovieWrapper>
      <MovieTitle>영화</MovieTitle>
      <MovieSelector>
        <MovieSelectorText>전체</MovieSelectorText>
      </MovieSelector>
      <MovieListWrapper>
        {movieList.map((movie) => (
          <MovieList
            key={movie.id}
            movie={movie.id}
            selectedMovie={selectedMovie}
          >
            <img
              src={"/img/age/12.png"}
              style={{ width: "15px", height: "15px" }}
              alt="영화관람가"
            />
            <MovieListMovieName
              movie={movie.id}
              key={movie.id}
              selectedMovie={selectedMovie}
              onClick={() => selectMovie(movie.id)}
            >
              {movie.title}
            </MovieListMovieName>
          </MovieList>
        ))}
      </MovieListWrapper>
    </MovieWrapper>
  );
};

export default TestAllMovie;

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

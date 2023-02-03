import React, { useEffect, useState } from "react";

import styled from "styled-components";
import AllMovieList from "../components/ticket/AllMovieList";
import AllTheaterList from "../components/ticket/AllTheaterList";
const Reserve = () => {
  const [movieId, setMovieId] = useState("");
  const [theater, setTheater] = useState("");
  useEffect(() => {
    console.log(movieId, theater);
  }, [movieId, theater]);
  return (
    <BookinWrapper>
      <AllMovieList movieId={movieId} setMovieId={setMovieId} />
      <AllTheaterList
        movieId={movieId}
        theater={theater}
        setTheater={setTheater}
      />
    </BookinWrapper>
  );
};
//예매 페이지
export default Reserve;

const BookinWrapper = styled.div`
  display: flex;
  width: 1100px;
  border-top: 1px solid black !important;
  border: 1px solid #d8d9db;
`;

/*  
      <AllMovieList />
      <AllTheaterList />
      <Calendar />
      <MovieInfo />
      */

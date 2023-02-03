import React, { useEffect, useState } from "react";

import styled from "styled-components";
import AllMovieList from "../components/ticket/AllMovieList";
import AllTheaterList from "../components/ticket/AllTheaterList";
const Reserve = () => {
  const [movieId, setMovieId] = useState("");
  return (
    <BookinWrapper>
      <AllMovieList movieId={movieId} setMovieId={setMovieId} />
      <AllTheaterList movieId={movieId} />
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

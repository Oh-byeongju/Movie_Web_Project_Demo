import React, { useEffect, useState } from "react";

import styled from "styled-components";
import AllDayList from "../components/ticket/AllDayList";
import AllMovieList from "../components/ticket/AllMovieList";
import AllTheaterList from "../components/ticket/AllTheaterList";
const Reserve = () => {
  const [movieId, setMovieId] = useState("");
  const [areaName, setAreaName] = useState("");
  const [theater, setTheater] = useState("");

  useEffect(() => {
    console.log(movieId, areaName, theater);
  }, [movieId, areaName, theater]);
  return (
    <BookinWrapper>
      <AllMovieList
        movieId={movieId}
        setMovieId={setMovieId}
        areaName={areaName}
        theater={theater}
      />
      <AllTheaterList
        movieId={movieId}
        theater={theater}
        setTheater={setTheater}
        areaName={setAreaName}
        setAreaName={setAreaName}
      />
      <AllDayList />
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

import React, { useEffect, useState } from "react";

import styled from "styled-components";
import AllDayList from "../components/ticket/AllDayList";
import AllMovieList from "../components/ticket/AllMovieList";
import AllSchedule from "../components/ticket/AllSchedule";
import AllTheaterList from "../components/ticket/AllTheaterList";
const Reserve = () => {
  const [movieId, setMovieId] = useState("");
  const [areaName, setAreaName] = useState("");
  const [theater, setTheater] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    console.log(movieId, theater, day);
  }, [movieId, theater, day]);
  return (
    <BookinWrapper>
      <AllMovieList
        movieId={movieId}
        setMovieId={setMovieId}
        areaName={areaName}
        day={day}
        theater={theater}
      />
      <AllTheaterList
        movieId={movieId}
        theater={theater}
        setTheater={setTheater}
        areaName={setAreaName}
        day={day}
        setAreaName={setAreaName}
      />
      <AllDayList
        movieId={movieId}
        theater={theater}
        setDay={setDay}
        day={day}
      />
      <AllSchedule movieId={movieId} theater={theater} day={day} />
    </BookinWrapper>
  );
};
//예매 페이지
export default Reserve;

const BookinWrapper = styled.div`
  display: flex;
  width: 996px;
  border-top: 1px solid black !important;
  border: 1px solid #d8d9db;
  padding-left: 200px-;
`;

/*  
      <AllMovieList />
      <AllTheaterList />
      <Calendar />
      <MovieInfo />
      */

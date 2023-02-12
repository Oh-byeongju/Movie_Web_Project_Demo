import React, { useEffect, useState } from "react";

import styled from "styled-components";
import AllDayList from "../components/ticket/AllDayList";
import AllMovieList from "../components/ticket/AllMovieList";
import AllSchedule from "../components/ticket/AllSchedule";
import AllTheaterList from "../components/ticket/AllTheaterList";
import TicketMore from "../components/ticket/TicketMore";
import TopButton from "../components/ticket/TopButton";

const Reserve = () => {
  const [movieId, setMovieId] = useState("");
  const [areaName, setAreaName] = useState("");
  const [theater, setTheater] = useState("");
  const [day, setDay] = useState("");

  //토글
  const [tabstate, setTabState] = useState({
    seoul: true,
    busan: false,
  });

  //more페이지에 넘겨주는것들
  const [moviePoster, setMoviePoster] = useState("");
  const [theaterMore, setTheaterMore] = useState("");
  const [dayMore, setDayMore] = useState("");

  useEffect(() => {
    console.log(movieId, theater, day);
  }, [movieId, theater, day]);
  return (
    <Container>
      <TopButton />
      <BookinWrapper>
        <AllMovieList
          movieId={movieId}
          setMovieId={setMovieId}
          setMoviePoster={setMoviePoster}
          day={day}
          theater={theater}
          setTheater={setTheater}
          setDay={setDay}
          setTheaterMore={setTheaterMore}
          setDayMore={setDayMore}
        />
        <AllTheaterList
          movieId={movieId}
          theater={theater}
          setTheater={setTheater}
          day={day}
          setTheaterMore={setTheaterMore}
          tabstate={tabstate}
          setTabState={setTabState}
        />
        <AllDayList
          movieId={movieId}
          theater={theater}
          setDay={setDay}
          day={day}
          setDayMore={setDayMore}
        />
        <AllSchedule movieId={movieId} theater={theater} day={day} />
      </BookinWrapper>
      <TicketMore
        movieId={movieId}
        theater={theater}
        day={day}
        moviePoster={moviePoster}
        theaterMore={theaterMore}
        dayMore={dayMore}
      />
    </Container>
  );
};
//예매 페이지
export default Reserve;
const Container = styled.div`
  width: 100%;
  background: #fff;
`;

const BookinWrapper = styled.div`
  display: flex;
  background: #fff;
  padding-left: 290px;
  padding-right: 290px;
`;

/*  
      <AllMovieList />
      <AllTheaterList />
      <Calendar />
      <MovieInfo />
      */

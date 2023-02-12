import React, { useEffect, useState } from "react";

import styled from "styled-components";
import AllDayList from "../components/ticket/AllDayList";
import AllMovieList from "../components/ticket/AllMovieList";
import AllSchedule from "../components/ticket/AllSchedule";
import AllTheaterList from "../components/ticket/AllTheaterList";
import TicketMore from "../components/ticket/TicketMore";
import TopButton from "../components/ticket/TopButton";

const Reserve = () => {
  //토글
  const [tabstate, setTabState] = useState({
    seoul: true,
    busan: false,
  });

  return (
    <Container>
      <TopButton />
      <BookinWrapper>
        <AllMovieList />
        <AllTheaterList tabstate={tabstate} setTabState={setTabState} />
        <AllDayList />
        <AllSchedule />
      </BookinWrapper>
      <TicketMore />
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

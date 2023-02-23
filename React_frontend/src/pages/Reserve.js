import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AllDayList from "../components/ticket/AllDayList";
import AllMovieList from "../components/ticket/AllMovieList";
import AllSchedule from "../components/ticket/AllSchedule";
import AllTheaterList from "../components/ticket/AllTheaterList";
import TicketMore from "../components/ticket/TicketMore";
import TopButton from "../components/ticket/TopButton";
import Seat from "../components/ticket/Seat";
import { useSelector, useDispatch } from "react-redux";

import {
  T_ALLMOVIE_REQUEST,
  ALLDAY_REQUEST,
  ALLTHEATER_REQUEST,
  RESET_RESERVE_PAGE,
} from "../reducer/ticket";
const Reserve = () => {
  //토글
  const [tabstate, setTabState] = useState({
    seoul: true,
    busan: false,
    gyeonggi: false,
    incheon: false,
  });
  const dispatch = useDispatch();
  const { LOGIN_data } = useSelector((state) => state.R_user_login);
  // 영화 예매 페이지에 쓸모 없을수도 있지만 Spring boot 메소드가 겹쳐서 로그인 상태도 같이 묶어서 보냄

  //리덕스 초기화를 위한 useEffect
  //영화 검색
  //페이지 접속 시 실행
  useEffect(() => {
    console.log("reserve 페이지 실행");
    //극장검색
    dispatch({
      type: T_ALLMOVIE_REQUEST,
      data: LOGIN_data.uid,
    });
    dispatch({
      type: ALLTHEATER_REQUEST,
    });
    // 날짜검색
    dispatch({
      type: ALLDAY_REQUEST,
    });

    //페이지 나갈 시 초기화 시켜야 하는 것들
    return () => {
      console.log("reserve out");
      dispatch({
        type: RESET_RESERVE_PAGE,
      });
    };
    //페이지에서 컴포넌트가 사라질때 return()을 사용하면 실행시킬수있다 페이지 뒤로가기나 다른페이지에서 다시 올 때 사용하면 좋을거같다.
  }, [LOGIN_data.uid, dispatch]);

  //좌석 페이지에 가려면 URL이 바뀌지않고 컴포넌트만 이동시켜줘야함.
  const [page, setPage] = useState(false);
  return (
    <Container>
      <TopButton />

      {page ? (
        <Seat />
      ) : (
        <BookinWrapper>
          <AllMovieList />
          <AllTheaterList tabstate={tabstate} setTabState={setTabState} />
          <AllDayList />
          <AllSchedule />
        </BookinWrapper>
      )}

      <TicketMore setPage={setPage} page={page} />
    </Container>
  );
};
//예매 페이지

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

export default Reserve;
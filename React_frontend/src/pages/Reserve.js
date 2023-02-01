import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALLMOVIE_REQUEST } from "../reducer/movie";
import styled from "styled-components";
import { ALLTHEATER_REQUEST, SELECT_THEATER_REQUEST } from "../reducer/ticket";
import TestAllMovie from "../components/test/TestAllMovie";
import TestAllTheater from "../components/test/TestAllTheater";
import TestAllTimeList from "../components/test/TestAllTimeList";
const Reserve = () => {
  const [movieList, setMovieList] = useState([]); // 전체 영화 list 데이터
  const [theatersList, setTheatersList] = useState([]); //극장,지역 list 데이터
  const [regionTheaters, setRegionTheaters] = useState([]); //극장 데이터
  const [timeList, setTimeList] = useState([]); //상영 시간 데이터
  const [selectedMovie, setSelectedMovie] = useState(""); //검색한 영화
  const [selectedRegion, setSelectedRegion] = useState(""); //검색한 지역
  const [selectedTheater, setSelectedTheater] = useState(""); //선택한 극장

  const dispatch = useDispatch();
  const { allMovie } = useSelector((state) => state.movie);
  const { selectTheater, select_theater_done } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    dispatch({
      type: ALLMOVIE_REQUEST,
    });
  }, []);
  useEffect(() => {
    setMovieList(allMovie);
  });

  useEffect(() => {
    dispatch({
      type: SELECT_THEATER_REQUEST,
      data: selectedMovie,
    });
  }, [selectedMovie]);

  useEffect(() => {
    setTheatersList(selectTheater);
  }, [selectTheater]);

  useEffect(() => {
    console.log(selectedMovie, selectedRegion, selectedTheater);
  }, [selectedMovie, selectedRegion, selectedTheater]);

  return (
    <BookinWrapper>
      <div></div>
      <TestAllMovie
        movieList={movieList}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        setSelectedTheater={setSelectedTheater}
        setSelectedRegion={setSelectedRegion}
        setRegionTheaters={setRegionTheaters}
        setTimeList={setTimeList}
      ></TestAllMovie>
      <TestAllTheater
        theatersList={theatersList}
        selectedRegion={selectedRegion}
        regionTheaters={regionTheaters}
        setSelectedMovie={setSelectedMovie}
        setSelectedTheater={setSelectedTheater}
        setSelectedRegion={setSelectedRegion}
        setRegionTheaters={setRegionTheaters}
        selectedTheater={selectedTheater}
        select_theater_done={select_theater_done}
      ></TestAllTheater>

      <TestAllTimeList timeList={timeList} selectedTheater={selectedTheater} />
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

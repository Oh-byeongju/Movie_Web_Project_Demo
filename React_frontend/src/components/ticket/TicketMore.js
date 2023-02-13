import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
const TicketMore = ({ dayMore }) => {
  const { movieData, theaterData, DayData, scheduleData } = useSelector(
    (state) => state.ticket
  );
  //사용자가 선택한 영화 및 정보를 표시해주는 컴포넌트 2023-02-13 수정완(강경목)
  //좌석 페이지로 넘어가야함 데이터와 함께
  return (
    <TicketWrapper>
      <TicketStep>
        {movieData !== "" ? (
          <MoviePoster>
            <Poster>
              <Img
                className="imggg"
                src={`${movieData.imagepath}`}
                alt="영화"
              />
            </Poster>

            <Title>
              <span>{movieData.title}</span>
            </Title>
            <Title>{movieData.rating}세 관람가</Title>
          </MoviePoster>
        ) : (
          <MoviePoster>
            <Poster></Poster>
            <Title></Title>
          </MoviePoster>
        )}
        <MovieTheater>
          {theaterData !== "" ? (
            <Name>
              <span>극장</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                {theaterData.tarea} {theaterData.tname}점
              </span>
            </Name>
          ) : (
            <Name>
              <span>극장</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Name>
          )}
          <Date>
            <span>일시</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{DayData.miday}</span>
          </Date>
          {scheduleData !== "" ? (
            <Screen>
              <span>상영관</span>&nbsp;&nbsp;&nbsp;
              <span>
                {scheduleData.cinema.ctype} {scheduleData.cinema.cname}
              </span>
            </Screen>
          ) : (
            <Screen>
              <span>상영관</span>&nbsp;&nbsp;&nbsp;
              <span></span>
            </Screen>
          )}
        </MovieTheater>
        <MovieSeat></MovieSeat>
      </TicketStep>
    </TicketWrapper>
  );
};

export default TicketMore;

const TicketWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 996px;
  height: 128px;
  background-color: #1d1d1c;
  color: white;
`;

const TicketStep = styled.div`
  margin: 0 auto;
  width: 996px;
  height: 108px;
  padding-top: 10px;
  padding-left: 50px;
  position: relative;
`;
const MoviePoster = styled.div`
  width: 210px;
  float: left;
  height: 108px;
  padding-right: 2px;
  padding-left: 20px;
  position: relative;
  color: #cccccc;
  font-size: 12px;

  background: url(http://img.cgv.co.kr/CGV_RIA/Ticket/image/reservation/tnb/split.png)
    no-repeat right;
`;
const Poster = styled.span`
  float: left;
  width: 74px;
  height: 108px;
  line-height: 108px;
  margin-right: 11px;
  overflow: hidden;
`;
const Title = styled.div`
  margin-top: 14px;
  color: white;
`;
const MovieTheater = styled.div`
  width: 185px;
  float: left;
  height: 108px;
  padding-right: 2px;
  background: url(http://img.cgv.co.kr/CGV_RIA/Ticket/image/reservation/tnb/split.png)
    no-repeat right;
  position: relative;
  color: #cccccc;
  font-size: 12px;
  padding-left: 10px;
`;

const MovieSeat = styled.div`
  background: url(http://img.cgv.co.kr/CGV_RIA/Ticket/image/reservation/tnb/tnb_buttons.png)
    no-repeat;
  background-position: 0 0;
  overflow: hidden;
  text-indent: -1000px;
  background-position: 0 -220px;
  position: absolute;
  top: 10px;
  right: 100px;
  width: 106px;
  height: 108px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  display: inline;
`;
const Name = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;

const Date = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;
const Screen = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;

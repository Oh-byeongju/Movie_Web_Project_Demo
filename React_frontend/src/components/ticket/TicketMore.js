import React, { useEffect } from "react";
import styled from "styled-components";
const TicketMore = ({
  movieId,
  theater,
  day,
  moviePoster,
  theaterMore,
  dayMore,
}) => {
  useEffect(() => {
    console.log(moviePoster);
  }, []);
  return (
    <TicketWrapper>
      <TicketStep>
        {moviePoster !== "" ? (
          <MoviePoster>
            <Poster>
              <Img
                className="imggg"
                src={`${moviePoster.imagePath}`}
                alt="영화"
              />
            </Poster>
            <Title>
              <span>{moviePoster.title}</span>
            </Title>
            <Title>{moviePoster.rating}세 관람가</Title>
          </MoviePoster>
        ) : (
          <MoviePoster>
            <Poster></Poster>
            <Title></Title>
          </MoviePoster>
        )}
        <MovieTheater>
          {theaterMore !== "" ? (
            <Name>
              <span>극장</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                {theaterMore.area} {theaterMore.name}점
              </span>
            </Name>
          ) : (
            <Name>
              <span>극장</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Name>
          )}
          <Date>
            <span>일시</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{dayMore.day}</span>&nbsp;
            <span>{dayMore.week}</span>
          </Date>
          <Screen>
            <span>상영관</span>&nbsp;&nbsp;&nbsp;
            <span>버튼 클릭해서 바꿔야 함 hover onclick</span>
          </Screen>
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

const MovieSeat = styled.div``;

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

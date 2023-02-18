import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { SELECT_SEAT_REQUEST } from "../../reducer/ticket";
const TicketMore = ({ setPage, page }) => {
  const { movieData, theaterData, DayData, scheduleData } = useSelector(
    (state) => state.ticket
  );
  const { choiceSeat } = useSelector((state) => state.seat);
  const dispatch = useDispatch();
  let sum;
  //사용자가 선택한 영화 및 정보를 표시해주는 컴포넌트 2023-02-13 수정완(강경목)
  //좌석 페이지로 넘어가야함 데이터와 함께
  return (
    <TicketWrapper>
      <TicketStep page={page}>
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
        <SeatMore>
          <Seat>
            좌석 :
            {choiceSeat.map((seat) => {
              return <span>&nbsp;{seat.location} </span>;
            })}
          </Seat>
          <Price>가격 : {sum}</Price>
        </SeatMore>
      </TicketStep>
      {page ? (
        <>
          <MovieChoice onClick={() => setPage(false)}>
            <ArrowCircleLeftIcon
              style={{
                width: "80px",
                height: "80px",
                left: "14px",
                position: "absolute",
              }}
            />
            <p>영화선택</p>
          </MovieChoice>
          <MovieSeat onClick={() => setPage(true)}>
            <ArrowCircleRightIcon
              style={{
                width: "80px",
                height: "80px",
                left: "14px",
                position: "absolute",
              }}
            />
            <p>결제하기</p>
          </MovieSeat>
        </>
      ) : (
        <MovieSeat
          onClick={() => {
            if (
              movieData !== "" &&
              theaterData !== "" &&
              DayData !== "" &&
              scheduleData !== ""
            ) {
              setPage(true);
              dispatch({
                type: SELECT_SEAT_REQUEST,
                data: theaterData.tid,
              });
            }
          }}
        >
          <ArrowCircleRightIcon
            style={{
              width: "80px",
              height: "80px",
              left: "14px",
              position: "absolute",
            }}
          />
          <p>좌석선택</p>
        </MovieSeat>
      )}
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

  left: ${(props) => (props.page === true ? "100px" : "0px")};
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

const MovieChoice = styled.div`
  overflow: hidden;
  position: absolute;
  top: 10px;
  left: 100px;
  width: 106px;
  height: 108px;
  cursor: pointer;
  p {
    position: absolute;
    bottom: -10px;
    left: 23px;
    font-weight: bold;
  }
`;
const SeatMore = styled.div`
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
const Seat = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;
const Price = styled.div`
  display: block;
  margin-top: 14px;
  height: 10px;
  line-height: 20px;
`;
const MovieSeat = styled.div`
  overflow: hidden;
  position: absolute;
  top: 10px;
  right: 300px;
  width: 106px;
  height: 108px;
  cursor: pointer;
  p {
    position: absolute;
    bottom: -10px;
    left: 23px;
    font-weight: bold;
  }
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

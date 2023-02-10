import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
const AllSchedule = ({ movieId, theater, day }) => {
  const dispatch = useDispatch();
  const { choiceTheater, choiceMovie, choiceDay } = useSelector(
    (state) => state.ticket
  );
  return (
    <Schedule>
      <ScheduleTitle>
        <p>시간</p>
      </ScheduleTitle>
      <ScheduleList>
        <Result>
          <TimeList>
            <Time>
              <Button type="button">
                <Legend></Legend>
                <Hour>
                  <StartTime>08:50</StartTime>
                  <EndTime>11~05</EndTime>
                </Hour>
                <Title>
                  <Name>
                    title 슬램덩크
                    <Em>2D(자막)</Em>
                  </Name>
                </Title>
                <Info>
                  infomovie
                  <Theater>
                    극장
                    <br />
                    컴포트 6관
                  </Theater>
                  <Seat>
                    <Now>잔여좌석</Now>
                    <All>전체좌석</All>
                  </Seat>
                </Info>
              </Button>
            </Time>
            <Time>
              <Button type="button">
                <Legend></Legend>
                <Hour>
                  <StartTime>08:50</StartTime>
                  <EndTime>11~05</EndTime>
                </Hour>
                <Title>
                  <Name>
                    title 슬램덩크
                    <Em>2D(자막)</Em>
                  </Name>
                </Title>
                <Info>
                  infomovie
                  <Theater>
                    극장
                    <br />
                    컴포트 6관
                  </Theater>
                  <Seat>
                    <Now>잔여좌석</Now>
                    <All>전체좌석</All>
                  </Seat>
                </Info>
              </Button>
            </Time>
            <Time>
              <Button type="button">
                <Legend></Legend>
                <Hour>
                  <StartTime>08:50</StartTime>
                  <EndTime>11~05</EndTime>
                </Hour>
                <Title>
                  <Name>
                    title 슬램덩크
                    <Em>2D(자막)</Em>
                  </Name>
                </Title>
                <Info>
                  infomovie
                  <Theater>
                    극장
                    <br />
                    컴포트 6관
                  </Theater>
                  <Seat>
                    <Now>잔여좌석</Now>
                    <All>전체좌석</All>
                  </Seat>
                </Info>
              </Button>
            </Time>
          </TimeList>
        </Result>
      </ScheduleList>
    </Schedule>
  );
};

export default AllSchedule;

const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  border-right: 1px solid #d8d9db;
  background-color: #f2f0e5;
`;
const ScheduleTitle = styled.div`
  color: #222;
  position: relative;
  height: 33px;
  line-height: 33px;
  text-align: center;
  font-size: 20px;
  padding: 20px 0 20px 20px;
  font-weight: bold;
  top: -15px;
  p {
    display: block;
    position: relative;
    left: -10px;
  }
`;

const ScheduleList = styled.div`
  overflow: hidden;
  margin-top: 10px;
  height: 430px;
`;
const Result = styled.div`
  height: 100%;
  padding: 0;
  text-align: center;
  position: relative;
  top: 0px;
  left: 0px;
`;

const TimeList = styled.ul`
  height: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Time = styled.li``;

const Button = styled.button`
  overflow: hidden;
  display: table;
  table-layout: fixed;
  width: 100%;
  padding: 0;
  margin: 0;
  padding: 0;
  border: 0;
  letter-spacing: -1px;
  background-color: transparent;
  cursor: pointer;
  letter-spacing: -0.5px;
  font-weight: 400;
`;

const Legend = styled.div`
  display: table-cell;
  width: 30px;
  height: 66px;
  padding: 10px 0 0 0;
  vertical-align: top;
`;

const Hour = styled.span`
  display: table-cell;
  width: 60px;
  padding: 10px 0;
  text-align: left;
  vertical-align: top;
  font-family: Roboto, Dotum, "돋움", sans-serif !important;
  font-weight: 300;
`;
const StartTime = styled.strong`display: block;
font-size: 1.2em;
font-weight: 700;
}
`;
const EndTime = styled.em`
  display: block;
  padding: 3px 0 0 0;
  font-size: 0.8667em;
  font-weight: 300;
  font-style: normal;
`;
const Title = styled.span`
  display: table-cell;
  width: 275px;
  padding: 10px 0;
  text-align: left;
`;
const Name = styled.strong`
  display: block;
  font-weight: 400;
  padding: 0 5px 0 0;
  line-height: 1.3;
  font-weight: 700;
`;
const Em = styled.em`
  display: block;
  padding-top: 7px;
  font-size: 0.8em;
`;

const Info = styled.div`
  display: table-cell;
  width: 110px;
  padding: 0 5px 0 0;
  font-size: 0.8em;
  vertical-align: middle;
  text-align: right;
`;
const Theater = styled.span`
  overflow: hidden;
  display: block;
  padding: 0;
  line-height: 1.5;
`;

const Seat = styled.span`
  overflow: hidden;
  display: inline-block;
  width: 60px;
  height: 20px;
  padding: 0;
  letter-spacing: 0;
  text-align: center;
  border: 1px solid #f2f4f5;
`;
const Now = styled.strong`
  display: inline-block;
  color: #01738b;
  line-height: 20px;
  vertical-align: middle;
  font-weight: 700;
`;
const All = styled.em`
  display: inline-block;
  color: #666;
  line-height: 20px;
  vertical-align: middle;
`;

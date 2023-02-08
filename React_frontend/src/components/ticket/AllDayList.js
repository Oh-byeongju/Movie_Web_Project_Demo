import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { now } from "moment/moment";
import moment from "moment";
//선언하지 않아도, 디바이스 혹은 locale의 시간을 불러온다.
import "moment/locale/ko";
import { ALLDAY_REQUEST, SELECT_DAY_REQUEST } from "../../reducer/ticket";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
const AllDayList = ({ movieId, areaName }) => {
  const { allDay, selectDay, select_Day_done, select_Theater_To_Day_done } =
    useSelector((state) => state.ticket);
  const now = new Date();
  const [selectedDay, setSelectedDay] = useState("");
  const year = now.getFullYear();
  const nowTime = moment().format("YYYY-MM-DD");
  const month = now.getMonth() + 1;
  //날짜
  const [weekday, setWeekDay] = useState([
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ALLDAY_REQUEST,
    });
  }, []);

  //날짜 계산

  const Weak = useRef(null);

  //요일 표시 평일 검정색, 토요일 파란색, 일요일 빨간색

  return (
    <Calender>
      <DayList ticking={false}>
        <YearMonthList>
          <p>
            <span className={cn("Year")}>
              <Year
                id="Year"
                format={"YYYY"}
                ticking={false}
                timezone={"KR/Pacific"}
              >
                {year}
              </Year>
            </span>
            <span className={cn("Month")}>
              <Month format={"MMMM"} ticking={false} timezone={"KR/Pacific"}>
                {month}
              </Month>
            </span>
          </p>
        </YearMonthList>
        <DaylistSector>
          {allDay.map((calendar, index) => {
            let selectedClassName = "";
            selectedClassName += allDay.find(
              (selectedMovie) => selectedMovie.miday === calendar.miday
            )
              ? "selectedInfoDarker "
              : "";
            let disableClassName = "";
            if (select_Day_done || select_Theater_To_Day_done) {
              disableClassName = selectDay.find(
                (canSelectedMovie) => canSelectedMovie.miday === calendar.miday
              )
                ? ""
                : "disable";
            }
            return (
              <Today
                today={calendar.miday}
                selectedDay={selectedDay}
                className={selectedClassName + disableClassName}
              >
                <div
                  className={cn(
                    "weak",
                    weekday[new Date(`'${calendar.miday}'`).getDay()] === "토"
                      ? "Sun"
                      : "weak",
                    weekday[new Date(`'${calendar.miday}'`).getDay()] === "일"
                      ? "Sat"
                      : "weak"
                  )}
                  ref={Weak}
                >
                  {weekday[new Date(`'${calendar.miday}'`).getDay()]}
                </div>
                <div
                  className={cn("day")}
                  onClick={() => {
                    setSelectedDay(calendar.miday);
                  }}
                >
                  {calendar.miday.substring(8, 10)}
                </div>
              </Today>
            );
          })}
        </DaylistSector>
      </DayList>
    </Calender>
  );
};
//{calendar.miday.substring(8, 10)}
const Calender = styled.div`
  align-items: center; //수직 중앙 정렬
  justify-content: center; //수평 중앙 정렬
  text-align: center;
  height: 20vh;
  width: 91px;
  height: 528px;
  overflow: initial;
`;
const YearMonthList = styled.div`
  font-family: "SEBANG";
  font-style: italic;
  color: #1864ab;
`;
const Year = styled.div`
  font-size: 25px;
`;
const Month = styled.div`
  font-size: 20px;
`;
const DayList = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  color: #005096;
  float: left;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: auto;
`;
const DaylistSector = styled.ul`
  position: relative;
  left: -20px;
  cursor: pointer;
  list-style-type: none;
  padding-top: 10px;
  .Sun {
    color: red !important;
  }
  .Sat {
    color: blue !important;
  }

  .weak {
    font-family: "Nanum Myeongjo";
    font-size: 0.8em;
    align-items: center; //수직 중앙 정렬

    justify-content: center; //수평 중앙 정렬
    color: black;
    text-align: center;
  }
  .day {
    font-weight: bold;
  }
  .disable {
    div {
      cursor: default;
      opacity: 0.5;
    }
  }
`;
const Today = styled.li`
padding-bottom: 10px;

    background-color: ${(props) =>
      props.today === props.selectedDay ? "gainsboro" : "white"};
  }

`;

export default AllDayList;

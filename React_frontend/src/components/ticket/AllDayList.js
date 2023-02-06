import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { now } from "moment/moment";
import { SELECT_DAY_REQUEST } from "../../reducer/ticket";
import cn from "classnames";
import { useDispatch } from "react-redux";
const AllDayList = ({ movieId, areaName }) => {
  const now = new Date();
  const todayWeek = now.getDay();
  const today = now.getDate();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const [lastDay, setLastDay] = useState(
    new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SELECT_DAY_REQUEST,
      data: {
        movieId: movieId,
        areaName: areaName,
      },
    });
  }, [movieId, areaName]);
  //날짜 계산
  const getAlldate = (today, lastday) => {
    let dates = [];

    dates[0] = today;
    for (let i = 1; i <= 30; i++) {
      today++;
      //마지막 날보다 날짜가 클경우 today를 1로 초기화.
      if (today > lastday) {
        today = 1;
        dates[i] = today;
      }
      //일반 경우 그냥 날짜 추가
      else {
        dates[i] = today;
      }
    }

    //요일 정상적으로 뜨는지 확인해보자
    //console.log(dates[1].getDay());

    return dates;
  };

  //요일 표시 평일 검정색 토요일 파란색 일요일 빨간색
  const getAllweak = (todayWeak) => {
    let strWeak = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weaklist = [];

    //첫번째 오늘 날짜 적용

    weaklist[0] = strWeak[todayWeak];

    for (let i = 1; i <= 30; i++) {
      todayWeak++;
      if (todayWeak > 6) {
        todayWeak = 0;
        weaklist[i] = strWeak[todayWeak];
      } else {
        weaklist[i] = strWeak[todayWeak];
      }
    }

    return weaklist;
  };
  //오늘 기준 날짜 계산하는 함수
  const CalendarDay = getAlldate(today, lastDay);
  const CalendarWeak = getAllweak(todayWeek);

  /*⭐⭐날짜와 요일을 같이 표시하기위해서 만들어 놓은 객체
  날짜를 하나씩 출력해서 객체로 만들기위해서 함수를 실행시킨뒤
  분해로 하나씩 넣는 방법을 사용했음 ⭐⭐*/

  const CalendarObject = [
    { weak: CalendarWeak[0], day: CalendarDay[0] },
    { weak: CalendarWeak[1], day: CalendarDay[1] },

    { weak: CalendarWeak[2], day: CalendarDay[2] },
    { weak: CalendarWeak[3], day: CalendarDay[3] },
    { weak: CalendarWeak[4], day: CalendarDay[4] },
    { weak: CalendarWeak[5], day: CalendarDay[5] },
    { weak: CalendarWeak[6], day: CalendarDay[6] },
    { weak: CalendarWeak[7], day: CalendarDay[7] },
    { weak: CalendarWeak[8], day: CalendarDay[8] },

    { weak: CalendarWeak[9], day: CalendarDay[9] },
    { weak: CalendarWeak[10], day: CalendarDay[10] },
    { weak: CalendarWeak[11], day: CalendarDay[11] },
    { weak: CalendarWeak[12], day: CalendarDay[12] },
    { weak: CalendarWeak[13], day: CalendarDay[13] },
    { weak: CalendarWeak[14], day: CalendarDay[14] },
    { weak: CalendarWeak[15], day: CalendarDay[15] },

    { weak: CalendarWeak[16], day: CalendarDay[16] },
    { weak: CalendarWeak[17], day: CalendarDay[17] },
    { weak: CalendarWeak[18], day: CalendarDay[18] },
    { weak: CalendarWeak[19], day: CalendarDay[19] },
    { weak: CalendarWeak[20], day: CalendarDay[20] },
    { weak: CalendarWeak[21], day: CalendarDay[21] },
    { weak: CalendarWeak[22], day: CalendarDay[22] },
    { weak: CalendarWeak[23], day: CalendarDay[23] },
    { weak: CalendarWeak[24], day: CalendarDay[24] },
    { weak: CalendarWeak[25], day: CalendarDay[25] },
    { weak: CalendarWeak[26], day: CalendarDay[26] },
    { weak: CalendarWeak[27], day: CalendarDay[27] },
    { weak: CalendarWeak[28], day: CalendarDay[28] },
    { weak: CalendarWeak[29], day: CalendarDay[29] },

    { weak: CalendarWeak[30], day: CalendarDay[30] },
  ];

  useEffect(() => {
    return () => console.log("Clean up");
  });

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
          {CalendarObject.map((calendar, index) => (
            <li>
              <div
                className={cn(
                  "weak",
                  calendar.weak === "Sun" ? "Sun" : "weak",
                  calendar.weak === "Sat" ? "Sat" : "weak"
                )}
                ref={Weak}
              >
                {calendar.weak}
              </div>
              <div className={cn("day")}>{calendar.day}</div>
            </li>
          ))}
        </DaylistSector>
      </DayList>
    </Calender>
  );
};
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
  li {
    padding-bottom: 10px;
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
`;

export default AllDayList;

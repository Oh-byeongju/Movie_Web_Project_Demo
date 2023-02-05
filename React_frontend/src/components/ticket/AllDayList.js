import React, { useState } from "react";
import DatePicker from "react-horizontal-datepicker";
import styled from "styled-components";
const AllDayList = () => {
  const [date, setDate] = useState(new Date());
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const weekOfDay = ["일", "월", "화", "수", "목", "금", "토"];
  const year = date.getFullYear();
  const month = date.getMonth();

  function datepicker() {
    for (let i = date.getDate(); i <= lastDay.getDate(); i++) {
      <button onClick={() => {}}>안녕하세용</button>;
    }
  }
  return (
    <Calendar>
      <div class="reserve-title">날짜</div>
      <div class="reserve-date">{datepicker()}</div>
    </Calendar>
  );
};

const Calendar = styled.div`
  .day-part {
    width: 91px;
  }
  .reserve-title {
    border-bottom: 1px solid #dddddd;
    background-color: #444444;
    text-align: center;
    color: #dddddd;
    padding: 5px;
    font-size: 13px;
    font-weight: bold;
  }
  .reserve-date {
    padding-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 770px;
    overflow: scroll;
    overflow-x: hidden;
  }
`;

export default AllDayList;

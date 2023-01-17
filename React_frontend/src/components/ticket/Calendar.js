import React, { useState } from "react";
import Calandar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const disableDates = new Date("Jan 28, 2023 00:00:30");
const date1 = disableDates.getDate();
const Calendar = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <Calandar
        onChange={onChange}
        value={value}
        tileDisabled={({ date }) => date.getDate() === date1}
        onClickDay={(value, event) => console.log(value)}
      />
    </div>
  );
};

export default Calendar;

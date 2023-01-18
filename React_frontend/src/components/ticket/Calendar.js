import React, { useState } from "react";
import Calandar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";

const disableDates = new Date("Jan 28, 2023 00:00:30");
const date1 = disableDates.getDate();
const Calendar = () => {
  const { selectmovie } = useSelector((state) => state.ticket);

  const [value, onChange] = useState(new Date());
  return <div></div>;
};

export default Calendar;

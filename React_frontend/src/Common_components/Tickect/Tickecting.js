import React from "react";
import { useSelector } from "react-redux";

const dummyData = [
  {
    id: 1,
    title: "dummy",
    movie: {
      area: "~~~",
      time: "~~~~",
    },
  },
  {},
];

const Tickecting = () => {
  const { MovieTicket } = useSelector((state) => state.ticket);
  return <div>{MovieTicket}</div>;
};

export default Tickecting;

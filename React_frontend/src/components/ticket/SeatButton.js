import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const SeatButton = ({
  seat,
  addSeats,
  totalNumber,
  selectedRows,
  is_reserved,
  removeSeats,
}) => {
  const [isChecked, setIschecked] = useState(true);
  const { rows, choiceSeat, selectseat, selectinfoseat } = useSelector(
    (state) => state.seat
  );
  const checkedSeat = () => {
    if (totalNumber > selectedRows.length && isChecked) {
      setIschecked((prev) => !prev);
    } else if (!isChecked) {
      setIschecked((prev) => !prev);
    }
  };
  return (
    <>
      <SeatNumber
        is_reserved={is_reserved}
        isChecked={isChecked}
        disabled={seat.is_reserved}
        seatnum={seat.id}
        sid={seat.sid}
        selectinfoseat={selectinfoseat}
        onClick={() => {
          checkedSeat();
          isChecked ? addSeats(seat) : removeSeats(seat.sid);
        }}
      >
        {seat.sname}
      </SeatNumber>
    </>
  );
};

export default SeatButton;

const SeatNumber = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
  margin-right: ${(props) => (props.seatnum % 10 === 5 ? "40px" : "1px")};
  color: black;
  float: left;
  background-color: ${(props) =>
    props.is_reserved ? "grey" : props.isChecked ? "lightblue" : ""};
  border: none;
  cursor: ${(props) => (props.is_reserved ? "default" : "pointer")};
`;

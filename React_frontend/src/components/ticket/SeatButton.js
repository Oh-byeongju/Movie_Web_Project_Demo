import React from "react";
import styled from "styled-components";
const SeatButton = ({ id, row }) => {
  return (
    <>
      <SeatNumber>{id}</SeatNumber>
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
  background-color: ${(props) =>
    props.is_reserved
      ? "grey"
      : props.isChecked
      ? "lightblue"
      : props.theme.terra};
  border: none;
  cursor: ${(props) => (props.is_reserved ? "default" : "pointer")};
`;

import React from "react";
import styled from "styled-components";
const AllTheater = ({ isSelected, elementIndex, areaClick, c }) => {
  return (
    <TheaterEnties>
      <li
        onClick={() => {
          areaClick(elementIndex);
          console.log(c);
        }}
        className={isSelected ? "clickButton" : "notClickbutton"}
      >
        <p>{c}</p>
      </li>
    </TheaterEnties>
  );
};
const TheaterEnties = styled.ul`
  position: relative;
  list-style-type: none;
  width: 150px;
  top: 12px;
  left: 110px;
  font-size: 12px;
  .clickButton {
    width: 150px;
    height: 30px;
    background-color: #686868;
    margin-bottom: -10px;
    color: black;
    p {
      position:relative;
      left:10px;
      top: 5px;
    }
  }
  .notClickbutton {
    height: 30px;
    background-color: white;
    color: black;
    margin-bottom: -10px;

    p {
      position:relative;
      left:10px;
      top: 5px;
    }
`;

export default AllTheater;

import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { MOVIE_SELECT_REQUEST } from "../../reducer/ticket";
const AllMovie = ({
  title,
  rating,
  id,
  index,
  isSelected,
  handleClick,
  onSelect,
}) => {
  const dispatch = useDispatch();
  const [choice, setChoice] = useState(false);

  const onClick = useCallback(() => {
    handleClick(index);
    console.log(title);
  }, []);

  return (
    <MovieText>
      <div onClick={onClick} className={isSelected ? "show-menu" : "hide-menu"}>
        <img
          src={"img/age/12.png"}
          style={{ width: 30, height: 30, marginRight: 10 }}
        />
        <p>{title}</p>
      </div>
    </MovieText>
  );
};

const MovieText = styled.div`
  display: flex;
  align-items: center;
  font-weight: 40px;
  width: 100%;
  height: 100%;
  line-height: 40px;
  position: relative;

  div {
    line-height: 40px;
    position: absolute;
    top: 0;
  }
  p {
    position: relative;
    top: -13px;
    left: 45px;
  }
  img {
    position: absolute;
    top: 5px;
    left: 5px;
  }
  .show-menu {
    background-color: black;
    width: 100%;
    height: 100%;
    color: white;
  }
  .hide-menu {
    background-color: white;
    width: 100%;
    height: 100%;
  }
`;

export default AllMovie;

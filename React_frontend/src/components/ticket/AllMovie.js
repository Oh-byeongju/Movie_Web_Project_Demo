import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { MOVIE_SELECT_REQUEST } from "../../reducer/ticket";
const AllMovie = ({ title, rating, id }) => {
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch({
      type: MOVIE_SELECT_REQUEST,
      data: id,
    });
    console.log(id);
  }, []);
  return (
    <MovieText onClick={onClick}>
      <img
        src={"img/age/12.png"}
        style={{ width: 30, height: 30, marginRight: 10 }}
      />
      {title}
    </MovieText>
  );
};

const MovieText = styled.div`
  display: flex;
  align-items: center;
  font-weight: 40px;
`;

export default AllMovie;

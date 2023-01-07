import React, { useCallback } from "react";

import styled from "styled-components";
const AllMovie = ({ title, rating }) => {
  const onClick = useCallback(() => {
    console.log(title);
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

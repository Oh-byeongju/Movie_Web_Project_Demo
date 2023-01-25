import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALLMOVIE_REQUEST } from "../../reducer/ticket";
import Box from "../BoxOffice/Box";
import styled from "styled-components";
const MovieList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: ALLMOVIE_REQUEST,
    });
  }, []);
  const { allMovie } = useSelector((state) => state.ticket);
  return (
    <Container>
      <Content>
        <InnerWraps>
          <h2>전체영화</h2>
          <div>
            <p>{`${allMovie.length}개의 영화가 검색되었습니다.`}</p>
            <div>
              <input type="text" />
              <button type="submit" />
            </div>
            <div className="movie-list">
              <UL>
                {allMovie.map((movie) => (
                  <Box movie={movie} key={movie.id} />
                ))}
              </UL>
            </div>
          </div>
        </InnerWraps>
      </Content>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  padding: 0;
  width: 100%;
  height: 1000px;
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
`;
const InnerWraps = styled.div`
  position: absolute;
  width: 100%;
`;

const UL = styled.ul`
  align-items: center;
  list-style-type: none;
  width: 100%;
  padding-left: 160px;

  &:after {
    content: "";
    clear: both;
    display: block;
  }
`;
export default MovieList;

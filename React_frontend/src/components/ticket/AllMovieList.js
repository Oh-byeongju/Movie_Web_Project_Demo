import React, { useCallback, useEffect, useState } from "react";
import AllMovie from "./AllMovie";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ALLMOVIE_REQUEST } from "../../reducer/ticket";

const AllMovieList = () => {
  const dispatch = useDispatch();
  const { allMovie } = useSelector((state) => state.ticket);
  useEffect(() => {
    dispatch({
      type: ALLMOVIE_REQUEST,
    });
  }, []);
  const onClick = useCallback(() => {
    console.log(allMovie);
  }, []);
  return (
    <MovieReverse>
      <div className="title" onClick={onClick}>
        전체영화
      </div>
      <ListView>
        <MovieChoice>
          <List>
            <UL>
              {allMovie.map((m) => (
                <li>
                  <AllMovie key={m.id} title={m.title} rating={m.rating} />
                </li>
              ))}
            </UL>
          </List>
        </MovieChoice>
      </ListView>
    </MovieReverse>
  );
};

const MovieReverse = styled.div`
  position: relative;

  width: 300px;
  height: 500px;
  background-color: white;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 270px;
    height: 30px;
    background-color: black;
    color: white;
    top: 45px;

    left: 100px;
  }
`;
const ListView = styled.div`
  border: 1px solid black;
  margin: 0;
  position: relative;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  width: 270px;
  height: 400px;
  top: 80px;
  left: 100px;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }
`;
const MovieChoice = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 400px;
`;

const UL = styled.div`
  list-style-type: none;
  margin: 0;
  align-items: center;
  padding: 0;
  display: block;
  width: 100%;
  float: left;
  align-items: center;

  li {
    display: list-item;
    width: 100%;
    height: 40px;
    cursor: pointer;
  }
`;
const List = styled.div``;
export default AllMovieList;

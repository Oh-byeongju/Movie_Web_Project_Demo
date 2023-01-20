import React, { useCallback, useEffect, useState } from "react";
import AllMovie from "./AllMovie";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  ALLMOVIE_REQUEST,
  MOVIE_SELECT_REQUEST,
  MOVIE_SELECT_CANCEL,
} from "../../reducer/ticket";

const AllMovieList = () => {
  const dispatch = useDispatch();
  const { allMovie, movie_select_done } = useSelector((state) => state.ticket);
  useEffect(() => {
    dispatch({
      type: ALLMOVIE_REQUEST,
    });
  }, []);
  const onSelect = useCallback((id) => {
    dispatch({
      type: MOVIE_SELECT_REQUEST,
      data: id,
    });
  }, []);

  const [select, SetSelect] = useState(false);
  var c;
  const handleClick = (id) => {
    //영화 제목 클릭 시 토글 함수
    if (c === id) {
      const newArr = Array(allMovie.length).fill(false);
      SetSelect(newArr);
      c = 99999;
      dispatch({
        type: MOVIE_SELECT_CANCEL,
      });
    } else if (c !== id) {
      //id번호로 영화 제목클릭시 하나만 가능하게 하는
      const newArr = Array(allMovie.length).fill(false);
      newArr[id] = true;
      SetSelect(newArr);
      onSelect(id + 1);
      c = id;
    }
  };

  return (
    <MovieReverse>
      <div className="title">전체영화</div>
      <ListView>
        <MovieChoice>
          <List>
            <UL>
              {allMovie.map((m, index) => (
                <li>
                  <AllMovie
                    key={m.id}
                    title={m.title}
                    rating={m.rating}
                    id={m.id}
                    handleClick={handleClick}
                    isSelected={select[index]}
                    index={index}
                  />
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
  left: 150px;
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
    top: 49px;

    left: 100px;
  }
`;
const ListView = styled.div`
  border: 1px solid black;
  margin: 0;
  position: absolute;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  width: 270px;
  height: 400px;
  top: 80px;
  left: 100px;
  overflow: scroll;
  background-color: #f2f0e5;

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
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  height: 400px;
`;

const UL = styled.div`
  list-style-type: none;
  position: absolute;
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

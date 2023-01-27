import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ALLTHEATER_REQUEST } from "../../reducer/ticket";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AllTheater from "./AllTheater";
import { all } from "axios";
import { select } from "redux-saga/effects";

const AllTheaterList = () => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(false); // Movie를 선택했는지 bollean으로 확인
  const [theater, setTheater] = useState([]); // theater 담기

  const onClick = useCallback((e) => {
    console.log(e.target.value);
  });
  const { alltheater, selectmovie, movie_select_done } = useSelector(
    (state) => state.ticket
  );
  var obj_value = new Array();
  const theaterList = alltheater.reduce((theater, { name, area, id }) => {
    if (!theater[area]) theater[area] = [];
    theater[area].push(name);
    return theater;
  }, {}); //지역별로 나눔

  const selectList = selectmovie.reduce((theater, { name, area, id }) => {
    if (!theater[area]) theater[area] = [];
    theater[area].push(name);
    return theater;
  }, {}); //극장 리스트

  var set = new Set(theater);
  const un = [...set];

  const [reset, setReset] = useState("");
  // theater.map((item) => {
  //   //for each item in arrayOfObjects check if the object exists in the resulting array
  //   if (
  //     selectArray.find((object) => {
  //       if (object === item && object.id === item.id) {
  //         //if the object exists iterate times
  //         object.cnt++;
  //         return true;
  //         //if it does not return false
  //       } else {
  //         return false;
  //       }
  //     })
  //   ) {
  //   } else {
  //     //if the object does not exists push it to the resulting array and set the times count to 1
  //     item.cnt = 1;
  //     selectArray.push(item);
  //   }
  // });

  const [select, SetSelect] = useState(false);

  const [sel, setSel] = useState("");

  const handleClick = (id) => {
    //지역 클릭 시 토글 함수
    //id번호로 영화 제목클릭시 하나만 가능하게 하는
    const newArr = Array(Object.keys(selectList)).fill(false);

    newArr[id] = true;

    if (newArr !== select) {
      setAreas(false);
    } //지역 선택 시 극장 선택 한 버튼 초기화
    SetSelect(newArr);
  };

  const [areas, setAreas] = useState(false);

  const areaClick = (id) => {
    //극장 클릭 시 토글 함수
    //id번호로 지역클릭시 하나만 가능하게 하는

    const area = Array(un.length).fill(false);
    area[id] = true;
    setAreas(area);
  };

  const [check, setCheck] = useState(true);

  useEffect(() => {
    // 영화 선택 초기화 해줌

    if (selectmovie != 0) {
      setSel(selectmovie);
      console.log(sel);
      SetSelect(false);
      setTheater("");
    }
    dispatch({
      type: ALLTHEATER_REQUEST,
    });
  }, [selectmovie]); //지역불러오기

  return (
    <Center>
      <div className="title">극장</div>
      <Theater>
        <TheaterSelect>
          <TheaterList>
            {movie_select_done && selectmovie != 0 ? ( //reducer 체크와 selectmovie에 데이터가 들어왔는지 확인
              <TheaterArea>
                <ul className="area">
                  {Object.entries(selectList).map(([key, value], index) => (
                    <li
                      className={select[index] ? "area-name" : "notchoicename"} // boolean ? click : NotClick
                      onClick={() => {
                        obj_value = [];
                        for (var key in value) {
                          obj_value.push(value[key]);
                        }

                        handleClick(index);

                        setTheater(obj_value);
                      }}
                    >
                      <p>{key}</p>
                    </li>
                  ))}
                </ul>

                {un.map((c, id) => (
                  <AllTheater
                    isSelected={areas[id]}
                    key={id}
                    elementIndex={id}
                    areaClick={areaClick}
                    c={c}
                  ></AllTheater>
                ))}
              </TheaterArea>
            ) : (
              /*<TheaterArea>
                <ul className="area">
                  {Object.entries(theaterList).map(([key, value], index) => (
                    <li
                      className={select[index] ? "area-name" : "notchoicename"} // boolean ? click : NotClick
                      onClick={() => {
                        obj_value = [];
                        for (var key in value) {
                          obj_value.push(value[key]);
                          setMovie(true);
                        }
                        handleClick(index);
                        setTheater(obj_value);
                      }}
                    >
                      <p>{key}</p>
                    </li>
                  ))}
                </ul>
                <TheaterEnties>
                  {un.map((c, id) => (
                    <li
                      className={areas[id] ? "choice" : "notchoice"}
                      key={id}
                      onClick={() => {
                        areaClick(id);
                        console.log(id);
                      }}
                    >
                      <p>{c}</p>
                    </li>
                  ))}
                </TheaterEnties>
              </TheaterArea>*/
              <div>영화를 선택하세요</div>
            )}
          </TheaterList>
        </TheaterSelect>
      </Theater>
    </Center>
  );
};

const Center = styled.div`
  display: block;
  position: relative;
  background-color: #f2f0e5;

  left: 72px;
  top: -592px;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 302px;
    height: 30px;
    background-color: black;
    color: white;
    top: 141px;

    left: 450px;
  }
`;

const Theater = styled.div`
  position: absolute;

  width: 300px;
  height: 500px;
  top: 172px;
  left: 450px;

  background-color: white;
`;

const TheaterSelect = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid;
`;

const TheaterList = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f2f0e5;
`;
const TheaterArea = styled.div`
  width: 150px;
  height: 100%;
  position: absolute;
  top: -24px;
  cursor: pointer;
  .area {
    width: 150px;
    position: absolute;
    left: -40px;
    list-style-type: none;
    font-size: 12px;

    .notchoicename {
      height: 30px;
      background-color: #686868;
      margin-bottom: -10px;
      color: black;
      z-index: 1;
      p {
        position: relative;
        width: 30px;
        left: 110px;
        top: 5px;
      }
    }
    .area-name {
      height: 30px;
      background-color: black;
      color: white;
      margin-bottom: -10px;
      z-index: 100;

      p {
        position: relative;
        left: 110px;
        width: 30px;

        top: 5px;
        font-color: white;
      }
    }
  }
`;

const TheaterEnties = styled.ul`
  position: absolute;
  list-style-type: none;
  width: 150px;
  top: 0px;
  left: 110px;
  font-size: 12px;
  .choice {
    width: 150px;
    height: 30px;
    background-color: #686868;
    margin-bottom: -10px;
    color: black;
    position:relative;
    p {
      position:relative;
      left:10px;
      top: 5px;
    }
  }
  .notchoice {
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

export default AllTheaterList;

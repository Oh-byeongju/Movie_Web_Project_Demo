import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ALLTHEATER_REQUEST } from "../../reducer/ticket";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AllTheater from "./AllTheater";
import { all } from "axios";
const AllTheaterList = () => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(false);
  const [theater, setTheater] = useState([]);
  const onClick = useCallback((e) => {
    console.log(e.target.value);
  });
  const { alltheater, selectmovie } = useSelector((state) => state.ticket);
  var obj_value = new Array();

  const theaterList = alltheater.reduce((theater, { name, area, id }) => {
    if (!theater[area]) theater[area] = [];
    theater[area].push(name);
    return theater;
  }, {});

  console.log(selectmovie.cinema);
  useEffect(() => {
    dispatch({
      type: ALLTHEATER_REQUEST,
    });
  }, []);
  return (
    <Theater>
      <TheaterSelect>
        <TheaterList>
          <TheaterArea>
            <ul className="area">
              {Object.entries(theaterList).map(([key, value]) => (
                <li className="area-name">
                  <p
                    onClick={() => {
                      obj_value = [];
                      for (var key in value) {
                        obj_value.push(value[key]);
                        setMovie(true);
                      }
                      setTheater(obj_value);
                    }}
                  >
                    {key}
                  </p>
                </li>
              ))}
            </ul>

            <div>
              <TheaterEnties>
                {movie
                  ? theater.map((c) => (
                      <li
                        onClick={() => {
                          console.log(c);
                        }}
                      >
                        {c}
                      </li>
                    ))
                  : Object.entries(theaterList).map(([key, value]) =>
                      value.map((c) => (
                        <li
                          onClick={() => {
                            console.log(c);
                          }}
                        >
                          {c}
                        </li>
                      ))
                    )}
              </TheaterEnties>
            </div>
          </TheaterArea>
        </TheaterList>
      </TheaterSelect>
    </Theater>
  );
};

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
`;
const TheaterArea = styled.div`
  width: 100%;
  height: 100%;

  .area-name {
    list-style-type: none;
    display: flex;
    cursor: pointer;
    a {
      width: 110px;
      height: 30px;
      cursor: pointer;
      span {
        float: right;
      }
    }
  }
  li {
    list-style-type: none;
  }
`;

const TheaterEnties = styled.ul`
  position: absolute;
  top: 15px;
  left: 100px;
`;

export default AllTheaterList;

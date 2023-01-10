import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { ALLTHEATER_REQUEST } from "../../reducer/ticket";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AllTheater from "./AllTheater";
import { all } from "axios";
const AllTheaterList = () => {
  const dispatch = useDispatch();
  const onClick = useCallback((e) => {
    console.log(e.target.value);
  });
  const { alltheater } = useSelector((state) => state.ticket);

  const theaterList = alltheater.reduce((theater, { name, area, id }) => {
    if (!theater[area]) theater[area] = [];
    theater[area].push(name);
    return theater;
  }, {});

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
                      console.log(key);
                    }}
                  >
                    {" "}
                    {key}
                  </p>
                  <div>
                    <ul className="theater">
                      {value.map((c) => (
                        <li
                          onClick={() => {
                            console.log(c);
                          }}
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
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

    .theater {
      display: block;
      float: left;
      text-align: center;
      li {
        width: 114px;
        height: 30px;
        cursor: pointer;
      }
    }
  }
  li {
    list-style-type: none;
  }
`;

export default AllTheaterList;

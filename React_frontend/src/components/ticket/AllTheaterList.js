import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { ALLTHEATER_REQUEST } from "../../reducer/ticket";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AllTheater from "./AllTheater";
const AllTheaterList = () => {
  const dispatch = useDispatch();
  const onClick = useCallback((e) => {
    console.log(e.target.value);
  });
  const { alltheater } = useSelector((state) => state.ticket);

  const resultTheater = [];

  alltheater.map((item) => {
    //극장나누기
    if (
      resultTheater.find((object) => {
        if (
          object.theater.t_area === item.theater.t_area &&
          object.theater.t_id === item.theater.t_id
        ) {
          object.cnt++;
          return true;
        } else {
          return false;
        }
      })
    ) {
    } else {
      item.cnt = 1;
      resultTheater.push(item);
    }
    console.log(resultTheater);
  });

  const resultArea = [];
  resultTheater.map((item) => {
    //지역나누기
    if (
      resultArea.find((object) => {
        if (object.theater.t_area === item.theater.t_area) {
          object.cnt++;
          return true;
        } else {
          return false;
        }
      })
    ) {
    } else {
      item.cnt = 1;
      resultArea.push(item);
      console.log(resultArea);
    }
  });
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
              {resultArea.map((c) => (
                <li className="area-name">
                  {c.theater.t_area}({c.cnt})
                  <div>
                    <ul className="theater">
                      {resultTheater.map((t) => (
                        <li>
                          <AllTheater key={t.id} name={t.theater.t_name} />
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

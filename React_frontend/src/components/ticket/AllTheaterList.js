import React, { useCallback } from "react";
import styled from "styled-components";
const AllTheaterList = () => {
  const onClick = useCallback((e) => {
    console.log(e.target.value);
  });
  return (
    <Theater>
      <TheaterSelect>
        <TheaterList>
          <TheaterArea>
            <ul className="area">
              <li className="area-name">
                <a onClick={onClick}>
                  <span>서울</span>
                </a>
                <div>
                  <ul className="theater">
                    <li>강남</li>
                    <li>강변</li>
                    <li>건대입구</li>
                    <li>대학로</li>
                    <li>동대문</li>
                    <li>등촌</li>
                    <li>명동</li>
                    <li>미아</li>
                    <li>방학</li>
                  </ul>
                </div>
              </li>

              <li className="area-name">
                <a>
                  <span>인천</span>
                </a>
                <div>
                  <ul className="theater">
                    <li>강남</li>
                    <li>강변</li>
                    <li>건대입구</li>
                    <li>대학로</li>
                    <li>동대문</li>
                    <li>등촌</li>
                    <li>명동</li>
                    <li>미아</li>
                    <li>방학</li>
                  </ul>
                </div>
              </li>

              <li className="area-name">
                <a>
                  <span>대구</span>
                </a>
                <div>
                  <ul className="theater">
                    <li>강남</li>
                    <li>강변</li>
                    <li>건대입구</li>
                    <li>대학로</li>
                    <li>동대문</li>
                    <li>등촌</li>
                    <li>명동</li>
                    <li>미아</li>
                    <li>방학</li>
                  </ul>
                </div>
              </li>

              <li className="area-name">
                <a>
                  <span>부산</span>
                </a>
                <div>
                  <ul className="theater">
                    <li>강남</li>
                    <li>강변</li>
                    <li>건대입구</li>
                    <li>대학로</li>
                    <li>동대문</li>
                    <li>등촌</li>
                    <li>명동</li>
                    <li>미아</li>
                    <li>방학</li>
                  </ul>
                </div>
              </li>
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

    a {
      width: 110px;
      height: 30px;
      cursor: pointer;
      span {
        float: right;
      }
    }

    .theater {
      li {
        width: 114px;
        height: 30px;
      }
    }
  }
  li {
    list-style-type: none;
  }
  .theater {
    display: none;
  }
`;

export default AllTheaterList;

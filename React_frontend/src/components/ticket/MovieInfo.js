import React from "react";
import styled from "styled-components";
//select 영화 제목 + 상영 지역 , 극장 + 날짜  == 시간 ,상영관, 좌석
const MovieInfo = () => {
  return (
    <Information>
      <div className="TopInfo">
        <div className="Top">
          <div className="title">시간</div>
          <div className="MovieInfoList">
            <div className="InfoList">
              <ul>
                <li>16:45 100좌석</li>

                <li>16:45 100좌석</li>

                <li>16:45 100좌석</li>

                <li>16:45 100좌석</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Information>
  );
};

export default MovieInfo;

const Information = styled.div`
  width: 300px;
  height: 500px;
  display: flex;
  border: 1px solid black;
  position: relative;
  left: 1000px;
  top: -430px;
`;

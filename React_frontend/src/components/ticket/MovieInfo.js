import React from "react";
import styled from "styled-components";
//select 영화 제목 + 상영 지역 , 극장 + 날짜  == 시간 ,상영관, 좌석
//위에 다 해당되면서 상영관 같으면 같은 칸에 시간만 표시
//   상영관 -----
//    시간 (좌석) ------ 시간(좌석) ------시간(좌석)

//theater 클래스를 반복해서 생성
const MovieInfo = () => {
  return (
    <Information>
      <div className="title">시간</div>

      <div className="Time-Option">
        <div className="Time-List">
          <div className="Content">
            <div className="Theater">
              <span> 3D 10관 </span>
              <ul>
                <li>17:30</li>
                <li>21:25</li>
              </ul>
            </div>
            <div className="Theater"></div>
            <div className="Theater"></div>
            <div className="Theater"></div>
            <div className="Theater"></div>
          </div>
        </div>
      </div>
    </Information>
  );
};

export default MovieInfo;

const Information = styled.div`
  display: block;
  width: 300px;
  height: 500px;
  border: 1px solid black;
  position: relative;
  left: 850px;
  top: -421px;
  background-color: #f2f0e5;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 300px;
    height: 30px;
    background-color: black;
    color: white;
    top: -32px;

    left: 0px;
  }
`;

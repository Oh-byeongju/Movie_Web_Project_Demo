import React, { useState } from "react";
import styled from "styled-components";
import TestAllRegionList from "./TestAllRegionList";
const TestAllTheater = ({
  theatersList,
  selectedRegion,
  regionTheaters,
  setSelectedMovie,
  setSelectedTheater,
  setSelectedRegion,
  setRegionTheaters,
  selectedTheater,
  select_theater_done,
}) => {
  var resultArray = []; // 카운팅해서 반환할 결과값 배열
  theatersList.map((item) => {
    if (
      resultArray.find((object) => {
        if (object.area === item.area && object.id === item.id) {
          object.cnt++;
          return true;
        } else {
          return false;
        }
      })
    ) {
    } else {
      item.cnt = 1;
      resultArray.push(item);
    }
  });

  //지역 중복 제거
  var resultRegion = []; // 카운팅해서 반환할 결과값 배열
  theatersList.map((item) => {
    if (
      resultRegion.find((object) => {
        if (object.name === item.name && object.tid === item.tid) {
          object.cnt++;
          return true;
        } else {
          return false;
        }
      })
    ) {
    } else {
      item.cnt = 1;
      resultRegion.push(item);
    }
  });

  var resulttheater = []; // id에 해당하는 지역 추출
  const selectRegion = (region_id) => {
    const selectedObject = resultArray.find(({ id }) => id === region_id);
    resultRegion.map((mv) => {
      if (mv.id === selectedObject.id) {
        resulttheater.push(mv);
      }
    });

    setRegionTheaters(resulttheater);
    setSelectedRegion(selectedObject.id);
  };

  return (
    <TheatersWrapper>
      <TheatersTitle>극장</TheatersTitle>
      <TheatersSelector>
        <TheatersSelectorText
          onClick={() => {
            console.log(resultArray);
          }}
        >
          전체
        </TheatersSelectorText>
      </TheatersSelector>
      <TheatersRegionWrapper>
        <TheatersListWrapper>
          {theatersList &&
            select_theater_done &&
            resultArray.map((theatersData) => {
              return (
                <TheatersList
                  key={theatersData.id}
                  theater={theatersData.id}
                  selectedRegion={selectedRegion}
                >
                  <div onClick={() => selectRegion(theatersData.id)}>
                    {theatersData.area}
                  </div>
                </TheatersList>
              );
            })}
        </TheatersListWrapper>
        <TestAllRegionList
          regionTheaters={regionTheaters}
          selectedTheater={selectedTheater}
          setSelectedTheater={setSelectedTheater}
        />
      </TheatersRegionWrapper>
    </TheatersWrapper>
  );
};

export default TestAllTheater;
const TheatersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  border-right: 1px solid #d8d9db;
`;
const TheatersTitle = styled.div`
  color: #222;
  font-size: 20px;
  line-height: 38px;
  padding: 20px 0 0 20px;
`;

const TheatersSelector = styled.div`
  padding: 18px;
  > div {
    border: 1px solid #d8d9db;
    border-bottom: none;
    height: 35px;
    font-size: 16px;
    text-align: center;
    margin-top: 10;
    padding-top: 6px;
  }
`;

const TheatersListWrapper = styled.div`
  padding-left: 20px;
`;

const TheatersRegionWrapper = styled.div`
  display: flex;
`;

const TheatersList = styled.div`
  display: flex;
  padding-bottom: 7px;
  background-color: ${(props) =>
    props.theater === props.selectedRegion ? "gainsboro" : "white"};
  > div {
    padding: 6px 0px 5px 10px;
    font-size: 13px;
  }
`;

// const RegionTheatersListWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const RegionItem = styled.div`
//   display: flex;
//   padding-bottom: 7px;
//   background-color: ${props =>
//     props.regionId === props.regionTheatersId ? 'gray' : 'white'};
//   > div {
//     padding: 6px 70px 5px 10px;
//     font-size: 13px;
//     color: ${props =>
//       props.regionId === props.regionTheatersId ? 'white' : 'black'};
//   }
// `;

const TheatersSelectorText = styled.div`
  border: 1px solid #d8d9db;
  border-bottom: none;
  height: 35px;
  font-size: 16px;
  text-align: center;
  margin-top: 10;
  padding-top: 6px;
`;

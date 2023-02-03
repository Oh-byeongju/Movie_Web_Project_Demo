import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  ALLAREA_REQUEST,
  ALLTHEATER_REQUEST,
  SELECT_MOVIETHEATER_REQUEST,
} from "../../reducer/ticket";
const AllTheaterList = ({ movieId }) => {
  const [selectedArea, setSelectedArea] = useState("서울");
  const [selectedTheater, setSelectedTheater] = useState("");
  const dispatch = useDispatch();
  const {
    allArea,
    allTheater,
    select_theater_done,
    selectTheater,
    selectMovieTheater,
  } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch({
      type: ALLAREA_REQUEST,
    });
    dispatch({
      type: ALLTHEATER_REQUEST,
      data: "서울",
    });
  }, []);

  const SelectedArea = (data) => {
    if (select_theater_done) {
      dispatch({
        type: SELECT_MOVIETHEATER_REQUEST,
        data: { movieId: movieId, area: data },
      });
      console.log(movieId, data);
    } else {
      dispatch({
        type: ALLTHEATER_REQUEST,
        data: data,
      });
    }
  };

  //select_theater_done 이것은 영화검색BOOLEAN삼항연산자
  return (
    <TheatersWrapper>
      <TheatersTitle>극장</TheatersTitle>
      <TheatersSelector>
        <TheatersSelectorText>전체</TheatersSelectorText>
      </TheatersSelector>
      <TheatersRegionWrapper>
        <TheatersListWrapper>
          {select_theater_done ? (
            <div>
              <TheaterListBlock>
                {selectTheater.map((area, index) => {
                  return (
                    <TheatersList
                      key={index}
                      area={area}
                      selectedArea={selectedArea}
                    >
                      <div
                        onClick={() => {
                          setSelectedArea(area);
                          SelectedArea(area);
                        }}
                      >
                        {area}
                      </div>
                    </TheatersList>
                  );
                })}
              </TheaterListBlock>
              <RegionTheatersListWrapper>
                {selectMovieTheater.map((theater, index) => (
                  <RegionItem
                    key={index}
                    selectedTheater={selectedTheater}
                    theater={theater.tname}
                  >
                    <div
                      onClick={() => {
                        setSelectedTheater(theater.tname);
                      }}
                      theater={theater.tname}
                      selectedTheater={selectedTheater}
                    >
                      {theater.tname}
                    </div>
                  </RegionItem>
                ))}
              </RegionTheatersListWrapper>
            </div>
          ) : (
            <div>
              <TheaterListBlock>
                {allArea.map((area, index) => {
                  return (
                    <TheatersList
                      key={index}
                      area={area}
                      selectedArea={selectedArea}
                    >
                      <div
                        onClick={() => {
                          setSelectedArea(area);
                          SelectedArea(area);
                        }}
                      >
                        {area}
                      </div>
                    </TheatersList>
                  );
                })}
              </TheaterListBlock>
              <RegionTheatersListWrapper>
                {allTheater.map((theater, index) => (
                  <RegionItem
                    key={index}
                    selectedTheater={selectedTheater}
                    theater={theater.tname}
                  >
                    <div
                      onClick={() => {
                        setSelectedTheater(theater.tname);
                      }}
                      theater={theater.tname}
                      selectedTheater={selectedTheater}
                    >
                      {theater.tname}
                    </div>
                  </RegionItem>
                ))}
              </RegionTheatersListWrapper>
            </div>
          )}
        </TheatersListWrapper>
      </TheatersRegionWrapper>
    </TheatersWrapper>
  );
};

export default AllTheaterList;
const TheatersWrapper = styled.div`
  display: inline-block;
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
  width: 100%;
`;

const TheatersRegionWrapper = styled.div`
  display: flex;
`;

const TheaterListBlock = styled.div`
  display: inline-block;
  position: relative;
  float: left;

  width: 50%;
`;
const TheatersList = styled.div`
  display: flex;

  width: 100%;
  padding-bottom: 7px;
  background-color: ${(props) =>
    props.area === props.selectedArea ? "gainsboro" : "white"};
  > div {
    padding: 6px 0px 5px 10px;
    font-size: 13px;
  }
`;

const TheatersSelectorText = styled.div`
  border: 1px solid #d8d9db;
  border-bottom: none;
  height: 35px;
  font-size: 16px;
  text-align: center;
  margin-top: 10;
  padding-top: 6px;
`;
const RegionTheatersListWrapper = styled.div`
  display: inline-block;
  float: left;
  width: 50%;
  flex-direction: column;
`;

const RegionItem = styled.div`
  display: flex;
  padding-bottom: 7px;
  background-color: ${(props) =>
    props.theater === props.selectedTheater ? "gray" : "white"};
  > div {
    padding: 6px 70px 5px 10px;
    font-size: 13px;
    color: ${(props) =>
      props.theater === props.selectedTheater ? "white" : "black"};
  }
`;

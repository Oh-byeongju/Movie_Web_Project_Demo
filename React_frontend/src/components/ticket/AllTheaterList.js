import { th } from "date-fns/locale";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  ALLAREA_REQUEST,
  ALLTHEATER_REQUEST,
  SELECT_MOVIETHEATER_REQUEST,
  SELECT_THEATER_REQUEST,
  SELECT_MOVIETHEATER_TO_DAY_REQUEST,
  SELECT_THEATER_TO_MOVIE_REQUEST,
  SELECT_THEATER_TO_DAY_REQUEST,
} from "../../reducer/ticket";
const AllTheaterList = ({ movieId, setTheater, setAreaName, areaName }) => {
  const [selectedArea, setSelectedArea] = useState("서울");
  const [selectedTheater, setSelectedTheater] = useState("");
  const dispatch = useDispatch();
  const {
    allArea,
    allTheater,
    select_theater_done,
    selectTheater,
    select_MovieTheater_done,
    selectMovieTheater,
    disableTheater,
    disableArea,
  } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch({
      type: ALLAREA_REQUEST,
    });
    dispatch({
      type: ALLTHEATER_REQUEST,
      data: "서울",
    });
    setAreaName(selectedArea);
  }, []);

  const SelectedArea = (data) => {
    if (select_theater_done) {
      dispatch({
        type: ALLTHEATER_REQUEST,
        data: data,
      });
      dispatch({
        type: SELECT_MOVIETHEATER_REQUEST,
        data: { movieId: movieId, area: data },
      });
    } else {
      dispatch({
        type: ALLTHEATER_REQUEST,
        data: data,
      });
    }
    setSelectedArea(data);
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
          <TheaterListBlock>
            {allArea.map((area, index) => {
              //여기서 find해서 감ㅌ은 이름일시 able, 다르면 disable
              let selectedClassNameArea = "";
              selectedClassNameArea += allArea.find(
                (selectedMovie) => selectedMovie === area
              )
                ? "selectedInfoDarker "
                : "";
              let disableClassNameArea = "";
              if (select_theater_done) {
                disableClassNameArea = disableArea.find(
                  (canSelectedMovie) => canSelectedMovie === area
                )
                  ? ""
                  : "disableArea";
              }

              //여기까지
              //수정

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
                      setAreaName(area);
                    }}
                    className={selectedClassNameArea + disableClassNameArea}
                  >
                    {area}
                  </div>
                </TheatersList>
              );
            })}
          </TheaterListBlock>
          <RegionTheatersListWrapper>
            {allTheater.map((theater, index) => {
              let selectedClassNameTheater = "";
              selectedClassNameTheater += allTheater.find(
                (selectedMovie) => selectedMovie.tid === theater.tid
              )
                ? "selectedInfoDarker"
                : "";
              let disableClassNameTheater = "";
              if (select_MovieTheater_done) {
                disableClassNameTheater = disableTheater.find(
                  (canSelectedMovie) => canSelectedMovie.tid === theater.tid
                )
                  ? ""
                  : "disableTheater";
              }
              return (
                <RegionItem
                  key={index}
                  selectedTheater={selectedTheater}
                  theater={theater.tname}
                >
                  <div
                    onClick={() => {
                      if (selectedClassNameTheater === "selectedInfoDarker") {
                        if (!select_theater_done) {
                          dispatch({
                            type: SELECT_THEATER_TO_MOVIE_REQUEST,
                            data: theater.tid,
                          });
                          dispatch({
                            type: SELECT_THEATER_TO_DAY_REQUEST,
                            data: theater.tid,
                          });
                        }
                        if (select_theater_done) {
                          dispatch({
                            type: SELECT_THEATER_TO_MOVIE_REQUEST,
                            data: theater.tid,
                          });
                          dispatch({
                            type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
                            data: {
                              mid: movieId,
                              tid: theater.tid,
                            },
                          });
                        }
                      }

                      setSelectedTheater(theater.tname);
                      setTheater(theater.tid);
                    }}
                    setTheater={theater.tid}
                    theater={theater.tname}
                    selectedTheater={selectedTheater}
                    className={
                      selectedClassNameTheater + disableClassNameTheater
                    }
                  >
                    {theater.tname}
                  </div>
                </RegionItem>
              );
            })}
          </RegionTheatersListWrapper>
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
  .disableArea {
    cursor: default;
    opacity: 0.5;
  }
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
  .selectedInfoDarkerdisableTheater {
    cursor: default;
    opacity: 0.5;
  }
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

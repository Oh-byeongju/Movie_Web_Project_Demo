import { style } from "@mui/system";
import { is, th } from "date-fns/locale";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { act } from "react-dom/test-utils";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  ALLTHEATER_REQUEST,
  SELECT_THEATER_TO_MOVIE_REQUEST,
} from "../../reducer/ticket";
const Test = ({ movieId, setTheater, setAreaName, areaName }) => {
  const dispatch = useDispatch();
  const [selectedTheater, setSelectedTheater] = useState("");

  //밑에 4개는 카운트를 위한 변수
  let seoul = 0;
  let busan = 0;
  let ableseoul = 0;
  let ablebusan = 0;
  //토글을 위한 훅
  const [isWideTab, setIsWideTab] = useState(false);
  const [tabstate, setTabState] = useState({
    seoul: true,
    busan: false,
  });

  //메뉴 토클을 위한 함수
  const tabHandler = (e) => {
    if (isWideTab) {
      setIsWideTab(!isWideTab);
    }
    const newTabState = { ...tabstate };
    const activeTab = e.currentTarget.id;
    for (let key in newTabState) {
      key === activeTab
        ? (newTabState[key] = true)
        : (newTabState[key] = false);
    }
    console.log(newTabState);
    setTabState(newTabState);
  };
  //기본적으로 alltheater에 모든 극장 데이터를 담음
  const { allTheater } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch({
      type: ALLTHEATER_REQUEST,
    });
  }, []);
  useEffect(() => {
    console.log(allTheater);
  }, [allTheater]);

  //select_theater_done 이것은 영화검색BOOLEAN삼항연산자

  return (
    <TheatersWrapper>
      <TheatersTitle>극장</TheatersTitle>
      <TheatersSelector>
        <TheatersSelectorText>전체</TheatersSelectorText>
      </TheatersSelector>
      <TheatersRegionWrapper>
        <TheatersListWrapper>
          <TheaterList>
            <TheaterAreaListSeoul
              id="seoul"
              seoul={tabstate.seoul}
              onClick={tabHandler}
            >
              <a seoul={tabstate.seoul}>서울</a>
              <ALLTHEATERLISTSEOUL
                className="all_theater"
                seoul={tabstate.seoul}
              >
                <CONENTSCROLL className="content_scroll">
                  {allTheater.map((mv) => {
                    if (mv.tarea === "서울") {
                      seoul++;
                      if (mv.able === "disable") {
                        ableseoul++;
                      }
                      if (tabstate.seoul) {
                        if (mv.able === "able") {
                          return (
                            <Theater
                              selectedTheater={selectedTheater}
                              theater={mv.tid}
                              onClick={() => {
                                dispatch({
                                  type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                  data: mv.tid,
                                });
                                setSelectedTheater(mv.tid);
                                setTheater(mv.tid);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        } else if (mv.able === "disable") {
                          return (
                            <Theater
                              selectedTheater={selectedTheater}
                              theater={mv.tid}
                              style={{ opacity: 0.5 }}
                              onClick={() => {
                                setSelectedTheater(mv.tid);
                                setTheater(mv.tid);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        } else {
                          return (
                            <Theater
                              selectedTheater={selectedTheater}
                              theater={mv.tid}
                              onClick={() => {
                                dispatch({
                                  type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                  data: mv.tid,
                                });
                                setSelectedTheater(mv.tid);
                                setTheater(mv.tid);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        }
                      }
                    }
                  })}
                </CONENTSCROLL>
              </ALLTHEATERLISTSEOUL>
              ({seoul - ableseoul})
            </TheaterAreaListSeoul>
            <TheaterAreaListBusan
              id="busan"
              busan={tabstate.busan}
              onClick={tabHandler}
            >
              <a busan={tabstate.busan}>부산</a>
              <ALLTHEATERLISTBUSAN
                className="all_theater"
                busan={tabstate.busan}
              >
                <CONENTSCROLL className="content_scroll">
                  {allTheater.map((mv) => {
                    if (mv.tarea === "부산") {
                      busan++;
                      if (mv.able === "disable") {
                        ablebusan++;
                      }
                      if (tabstate.busan) {
                        if (mv.able === "able") {
                          return (
                            <Theater
                              selectedTheater={selectedTheater}
                              theater={mv.tid}
                              onClick={() => {
                                dispatch({
                                  type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                  data: mv.tid,
                                });
                                setSelectedTheater(mv.tid);
                                setTheater(mv.tid);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        } else if (mv.able === "disable") {
                          return (
                            <Theater
                              selectedTheater={selectedTheater}
                              theater={mv.tid}
                              style={{ opacity: 0.5 }}
                              onClick={() => {
                                setSelectedTheater(mv.tid);
                                setTheater(mv.tid);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        } else {
                          return (
                            <Theater
                              selectedTheater={selectedTheater}
                              theater={mv.tid}
                              onClick={() => {
                                dispatch({
                                  type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                  data: mv.tid,
                                });
                                setSelectedTheater(mv.tid);
                                setTheater(mv.tid);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        }
                      }
                    } else {
                      return <></>;
                    }
                  })}
                </CONENTSCROLL>
              </ALLTHEATERLISTBUSAN>
              ({busan - ablebusan})
            </TheaterAreaListBusan>
          </TheaterList>
        </TheatersListWrapper>
      </TheatersRegionWrapper>
    </TheatersWrapper>
  );
};

export default Test;
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
  position: relative;
  float: left;
  width: 100%;
  height: 323px;
  margin-top: 3px;
`;
const TheaterList = styled.ul`
  float: left;
  width: 109px;
  height: 100%;
  overflow: hidden;
  list-style: none;
`;
const TheaterAreaListSeoul = styled.li`
  clear: both;
  overflow: hidden;
  float: left;
  width: 100%;
  height: 31px;
  line-height: 31px;
  margin-bottom: 1px;
  background-color: ${(props) =>
    props.seoul === true ? "gainsboro" : "white"};
`;

const TheaterAreaListBusan = styled.li`
  clear: both;
  overflow: hidden;
  float: left;
  width: 100%;
  height: 31px;
  line-height: 31px;
  margin-bottom: 1px;
  background-color: ${(props) =>
    props.busan === true ? "gainsboro" : "white"};
`;

const ALLTHEATERLISTSEOUL = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 124px;
  height: 100%;
  display: ${(props) => (props.seoul === true ? "block" : "none")};
`;
const ALLTHEATERLISTBUSAN = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 124px;
  height: 100%;
  display: ${(props) => (props.busan === true ? "block" : "none")};
`;
const CONENTSCROLL = styled.ul`
  overflow-x: hidden;

  li {
    list-style-type: none;
  }
`;
const TheatersRegionWrapper = styled.div`
  display: flex;
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
const Theater = styled.li`
  background-color: ${(props) =>
    props.theater === props.selectedTheater ? "gray" : "white"};

  color: ${(props) =>
    props.theater === props.selectedTheater ? "white" : "black"};
`;

import { style } from "@mui/system";
import { is, th } from "date-fns/locale";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { act } from "react-dom/test-utils";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  ALLTHEATER_REQUEST,
  SELECT_THEATER_TO_MOVIE_REQUEST,
  SELECT_MOVIETHEATER_TO_DAY_REQUEST,
  SELECT_THEATER_TO_DAY_REQUEST,
  SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
  SELECT_DAY_TO_THEATER_REQUEST,
} from "../../reducer/ticket";
const AllTheaterList = ({
  movieId,
  setTheater,
  setAreaName,
  areaName,
  day,
}) => {
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
  const {
    allTheater,
    choiceMovie,

    choiceDay,
  } = useSelector((state) => state.ticket);

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
      <TheatersTitle>
        <p>극장</p>
      </TheatersTitle>
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
                      //count를 위해 만듬
                      if (mv.able === "disable") {
                        ableseoul++;
                      }
                      if (tabstate.seoul) {
                        if (mv.able === "able") {
                          //영화나 날짜를 클릭해서 able이 된 상태
                          //영화가 클릭이 되어있으면 movietheater_to_day로 날짜 검색, 영화 데이터도 동시에 바꿔줘야함
                          // 날자가 클릭되어있으면 theaterday_to_movie로 영화검색, 극장클릭시 날짜도 같이 토글 극장에 맞게
                          //두개다 클릭이 되어있으면 날짜로 영화 데이터 검색

                          return (
                            <Theater
                              selectedTheater={selectedTheater}
                              theater={mv.tid}
                              onClick={() => {
                                //처음으로 영화가 클릭되고 극장 클릭

                                if (choiceMovie && !choiceDay) {
                                  dispatch({
                                    type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
                                    data: {
                                      mid: movieId,
                                      tid: mv.tid,
                                    },
                                  });
                                  dispatch({
                                    type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                    data: mv.tid,
                                  });
                                }
                                //날짜 선택 후 극장 클릭
                                else if (choiceDay && !choiceMovie) {
                                  //이상황은 날짜 클릭 후 극장 클릭
                                  dispatch({
                                    type: SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
                                    data: {
                                      miday: day,
                                      tid: mv.tid,
                                    },
                                  });
                                  dispatch({
                                    type: SELECT_THEATER_TO_DAY_REQUEST,
                                    data: mv.tid,
                                  });
                                  //극장 클릭 시 극장ㅎ도 함께 바꿔줘야함
                                  dispatch({
                                    type: SELECT_DAY_TO_THEATER_REQUEST,
                                    data: day,
                                  });
                                }
                                //두개 다 검색완
                                else if (choiceDay && choiceMovie) {
                                  dispatch({
                                    type: SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
                                    data: {
                                      miday: day,
                                      tid: mv.tid,
                                    },
                                  });
                                  dispatch({
                                    type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
                                    data: {
                                      mid: movieId,
                                      tid: mv.tid,
                                    },
                                  });
                                }

                                //else if(두개다 클릭되어서 같이 검색)
                                //else if(날짜가 클릭되어있을때)
                                setSelectedTheater(mv.tid);
                                setTheater(mv.tid);
                              }}
                            >
                              {mv.tname}
                            </Theater>
                          );
                        } else if (mv.able === "disable") {
                          return (
                            //disable된거를 클릭하면은 극장으로 처음부터 다시 검색해야함
                            <Theater
                              selectedTheater={selectedTheater}
                              theater={mv.tid}
                              style={{ opacity: 0.5 }}
                              onClick={() => {
                                dispatch({
                                  type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                  data: mv.tid,
                                });
                                dispatch({
                                  type: SELECT_THEATER_TO_DAY_REQUEST,
                                  data: mv.tid,
                                });
                                //theater로 day 검색
                                alert("해당하는 데이터가 없습니다.");
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
                                //alltheater 상태(첫 상태)
                                //극장으로 영화 검색 가능
                                //극장으로 날짜 검색 추가해야함★★★★★★
                                dispatch({
                                  type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                  data: mv.tid,
                                });
                                dispatch({
                                  type: SELECT_THEATER_TO_DAY_REQUEST,
                                  data: mv.tid,
                                });
                                //theater로 day 검색
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
                                //처음으로 영화가 클릭되고 극장 클릭

                                if (choiceMovie && !choiceDay) {
                                  dispatch({
                                    type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
                                    data: {
                                      mid: movieId,
                                      tid: mv.tid,
                                    },
                                  });
                                  dispatch({
                                    type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                    data: mv.tid,
                                  });
                                }
                                //날짜 선택 후 극장 클릭
                                else if (choiceDay && !choiceMovie) {
                                  //이상황은 날짜 클릭 후 극장 클릭
                                  dispatch({
                                    type: SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
                                    data: {
                                      miday: day,
                                      tid: mv.tid,
                                    },
                                  });
                                  dispatch({
                                    type: SELECT_THEATER_TO_DAY_REQUEST,
                                    data: mv.tid,
                                  });
                                  //극장 클릭 시 극장ㅎ도 함께 바꿔줘야함
                                  dispatch({
                                    type: SELECT_DAY_TO_THEATER_REQUEST,
                                    data: day,
                                  });
                                }
                                //두개 다 검색완
                                else if (choiceDay && choiceMovie) {
                                  dispatch({
                                    type: SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
                                    data: {
                                      miday: day,
                                      tid: mv.tid,
                                    },
                                  });
                                  dispatch({
                                    type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
                                    data: {
                                      mid: movieId,
                                      tid: mv.tid,
                                    },
                                  });
                                }

                                //else if(두개다 클릭되어서 같이 검색)
                                //else if(날짜가 클릭되어있을때)
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
                                dispatch({
                                  type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                  data: mv.tid,
                                });
                                dispatch({
                                  type: SELECT_THEATER_TO_DAY_REQUEST,
                                  data: mv.tid,
                                });

                                //theater로 day 검색
                                alert("해당하는 데이터가 없습니다.");
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
                                //alltheater 상태(첫 상태)
                                //극장으로 영화 검색 가능
                                //극장으로 날짜 검색 추가해야함★★★★★★
                                dispatch({
                                  type: SELECT_THEATER_TO_MOVIE_REQUEST,
                                  data: mv.tid,
                                });
                                dispatch({
                                  type: SELECT_THEATER_TO_DAY_REQUEST,
                                  data: mv.tid,
                                });
                                //theater로 day 검색
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

export default AllTheaterList;
const TheatersWrapper = styled.div`
  width: 265px;
  position: relative;
  float: left;
  height: 528px;
  margin-left: 2px;
  background-color: #f2f0e5;
  overflow: hidden;
  padding-right:120px;
}
`;
const TheatersTitle = styled.div`
  color: #222;
  position: relative;
  height: 33px;
  line-height: 33px;
  text-align: center;
  font-size: 20px;
  padding: 20px 0 4px 20px;
  font-weight: bold;
  top: -15px;
  p {
    display: block;
    position: relative;
    left: 10px;
  }
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
  position: relative;
  float: left;
  width: 100%;
  height: 323px;
  margin-top: 3px;
`;
const TheaterAreaListSeoul = styled.li`
  clear: both;
  overflow: hidden;
  float: left;
  width: 109px;
  height: 31px;
  font-size: 14px;
  line-height: 31px;
  margin-bottom: 1px;
  background-color: ${(props) =>
    props.seoul === true ? "gainsboro" : "#f2f0e5"};
`;

const TheaterAreaListBusan = styled.li`
  clear: both;
  overflow: hidden;

  float: left;
  width: 109px;
  height: 31px;
  font-size: 14px;
  line-height: 31px;
  margin-bottom: 1px;
  background-color: ${(props) =>
    props.busan === true ? "gainsboro" : "#f2f0e5"};
`;

const ALLTHEATERLISTSEOUL = styled.div`
  position: absolute;
  top: 0;
  left: 110px;
  width: 160px;
  height: 100%;
  font-weight: bold;
  display: ${(props) => (props.seoul === true ? "block" : "none")};
`;
const ALLTHEATERLISTBUSAN = styled.div`
  position: absolute;
  font-weight: bold;
  top: 0;
  left: 110px;
  width: 160px;
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
  margin-left: 10px;
  width: 240px;
  font-size: 16px;
  text-align: center;
  margin-top: 10;
  padding-top: 6px;
`;
const Theater = styled.li`
  background-color: ${(props) =>
    props.theater === props.selectedTheater ? "gray" : "#f2f0e5"};
  color: ${(props) =>
    props.theater === props.selectedTheater ? "white" : "#333333"};
`;

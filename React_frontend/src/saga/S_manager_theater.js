/*

 23-03-29 관리자 페이지 영화관 관련 crud (강경목)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import { 
	CINEMA_LOADING,CINEMA_DONE,CINEMA_ERROR,
    THEATER_INSERT_LOADING,THEATER_INSERT_DONE,THEATER_INSERT_ERROR,
    CINEMA_INSERT_LOADING,CINEMA_INSERT_DONE,CINEMA_INSERT_ERROR
 } from "../reducer/R_manager_theater";
import { http } from "../lib/http";

// 상영관 조회 함수
function* cinema(action) {
  const result = yield call(CinemaApi, action.data);
  if (result.status === 200) {
    yield put({
      type: CINEMA_DONE,
      data: result.data
    });
  } 
  else {
    yield put({
			type: CINEMA_ERROR,
            data:result.error
    });
  }
}

// 상영관 조회 백엔드 호출
async function CinemaApi() {
  return await http.get("/v2/normal/cinemaall")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

//극장 추가
function* theaterInsert(action) {
    const result = yield call(TheaterInsertApi, action.data);
    if (result.status === 200) {
      yield put({
        type: THEATER_INSERT_DONE,
      });
    } 
    else {
      yield put({
              type: THEATER_INSERT_ERROR,
              data:result.error
      });
    }
  }
  
  // 극장 추가 백엔드 호출
  async function TheaterInsertApi(data) {
    return await http.post("/v2/normal/inserttheater",data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  //상영관 추가 
function* cinemaInsert(action) {
    const result = yield call(CinemaInsertApi, action.data);
    if (result.status === 200) {
      yield put({
        type: CINEMA_INSERT_DONE,
      });
    } 
    else {
      yield put({
              type: CINEMA_INSERT_ERROR,
              data:result.error
      });
    }
  }
  
  // 상영관 추가 백엔드 호출
  async function CinemaInsertApi(data) {
    return await http.post("/v2/normal/insertcinema",data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }


function* ALL_CINEMA() {
  yield takeLatest(CINEMA_LOADING, cinema);
}

function* THEATER_INSERT() {
    yield takeLatest(THEATER_INSERT_LOADING, theaterInsert);
  }
function* CINEMA_INSERT() {
    yield takeLatest(CINEMA_INSERT_LOADING, cinemaInsert);
  }


export default function* S_manager_theater() {
  yield all([fork(ALL_CINEMA),fork(THEATER_INSERT),fork(CINEMA_INSERT)]);
}

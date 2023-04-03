/*
	23-04-03 관리자 페이지 상영정보관리 구현(오병주)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import { 
	MANAGER_MOVIEINFO_MOVIE_LIST_REQUEST, MANAGER_MOVIEINFO_MOVIE_LIST_SUCCESS,  MANAGER_MOVIEINFO_MOVIE_LIST_FAILURE,
	MANAGER_MOVIEINFO_THEATER_LIST_REQUEST, MANAGER_MOVIEINFO_THEATER_LIST_SUCCESS,  MANAGER_MOVIEINFO_THEATER_LIST_FAILURE,
	MANAGER_MOVIEINFO_LIST_REQUEST, MANAGER_MOVIEINFO_LIST_SUCCESS,  MANAGER_MOVIEINFO_LIST_FAILURE
} from "../reducer/R_manager_movieinfo";
import { http } from "../lib/http";

// 영화 조회 함수
function* AllMovie() {
  const result = yield call(callAllMovie);
  if (result.status === 200) {
    yield put({
      type: MANAGER_MOVIEINFO_MOVIE_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: MANAGER_MOVIEINFO_MOVIE_LIST_FAILURE
    });
  }
}

// 영화 조회 백엔드 호출
async function callAllMovie() {
  return await http.get("/Manager/auth/allMovie")
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
}

// 극장 조회 함수
function* AllTheater() {
  const result = yield call(callAllTheater);
  if (result.status === 200) {
    yield put({
      type: MANAGER_MOVIEINFO_THEATER_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: MANAGER_MOVIEINFO_THEATER_LIST_FAILURE
    });
  }
}

// 극장 조회 백엔드 호출
async function callAllTheater() {
  return await http.get("/Manager/auth/allTheater")
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
}

// 상영정보 조회 함수
function* MovieInfoSearch(action) {
  const result = yield call(callMovieInfoSearch, action.data);

  console.log(result);

  if (result.status === 200) {
    yield put({
      type: MANAGER_MOVIEINFO_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: MANAGER_MOVIEINFO_LIST_FAILURE
    });
  }
}

// 상영정보 조회 백엔드 호출
async function callMovieInfoSearch(data) {
  return await http.get("/manager/auth/getMovieInfo", {
    params: {
      mid: data.mid,
			tid: data.tid,
      startDay: data.startDay,
      endDay: data.endDay,
      page: data.page,
      size: data.size
    },
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response;
  });
}

function* MOVIE_LIST() {
  yield takeLatest(MANAGER_MOVIEINFO_MOVIE_LIST_REQUEST, AllMovie);
}

function* THEATER_LIST() {
  yield takeLatest(MANAGER_MOVIEINFO_THEATER_LIST_REQUEST, AllTheater);
}

function* MOVIEINFO_LIST() {
  yield takeLatest(MANAGER_MOVIEINFO_LIST_REQUEST, MovieInfoSearch);
}

export default function* S_manager_movieinfo() {
  yield all([
    fork(MOVIE_LIST),
    fork(THEATER_LIST),
		fork(MOVIEINFO_LIST)
	]);
}

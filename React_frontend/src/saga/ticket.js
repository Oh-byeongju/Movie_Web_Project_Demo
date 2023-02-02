import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import {
  //전체 지역 및 극장 검색
  ALLAREA_FAILURE,
  ALLAREA_SUCCESS,
  ALLAREA_REQUEST,

  //검색한 지역 및 극장 검색
  ALLTHEATER_SUCCESS,
  ALLTHEATER_FAILURE,
  ALLTHEATER_REQUEST,
  SELECT_THEATER_REQUEST,
  SELECT_THEATER_SUCCESS,
  SELECT_THEATER_FAILURE,
} from "../reducer/ticket";
import { http } from "../lib/http";

//모두 수정

//전체 영화 불러오기
async function allAreaApi() {
  return await http
    .get("/v2/normal/area")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* allArea() {
  const result = yield call(allAreaApi);
  if (result.status === 200) {
    //네트워크에
    //네트워크에서 200으로 받아서 수정했음 id: mv.cinema.theater.area.aarea:{}

    yield put({
      type: ALLAREA_SUCCESS,
      data: result.data,
    });
  } else {
    yield put({
      type: ALLAREA_FAILURE,
      data: result.status,
    });
  }
}

//전체 극장 지역으로 검색
async function allTheaterApi(data) {
  return await http
    .get(`/v2/normal/theater?area=${data}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* allTheater(action) {
  const result = yield call(allTheaterApi, action.data);
  if (result.status === 200) {
    //네트워크에
    //네트워크에서 200으로 받아서 수정했음 id: mv.cinema.theater.area.aarea:{}

    yield put({
      type: ALLTHEATER_SUCCESS,
      data: result.data,
    });
  } else {
    yield put({
      type: ALLTHEATER_FAILURE,
      data: result.status,
    });
  }
}

//전체 극장 지역으로 검색
async function selectTheaterApi(data) {
  return await http
    .get(`/infomovie/normal/movieselect?id=${data}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* selectTheater(action) {
  const result = yield call(selectTheaterApi, action.data);
  if (result.status === 200) {
    //네트워크에
    //네트워크에서 200으로 받아서 수정했음 id: mv.cinema.theater.area.aarea:{}

    yield put({
      type: SELECT_THEATER_SUCCESS,
      data: result.data,
    });
  } else {
    yield put({
      type: SELECT_THEATER_FAILURE,
      data: result.status,
    });
  }
}

function* allTheaterSaga() {
  yield takeLatest(ALLTHEATER_REQUEST, allTheater);
}
function* allAreaSaga() {
  yield takeLatest(ALLAREA_REQUEST, allArea);
}
function* selectTheaterSaga() {
  yield takeLatest(SELECT_THEATER_REQUEST, selectTheater);
}

export default function* ticketSaga() {
  yield all([fork(allTheaterSaga), fork(allAreaSaga), fork(selectTheaterSaga)]);
}

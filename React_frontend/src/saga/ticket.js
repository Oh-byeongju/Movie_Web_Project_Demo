import { all, takeLatest, fork, put, call, delay } from "redux-saga/effects";
import {
  //전체 지역  검색
  ALLAREA_FAILURE,
  ALLAREA_SUCCESS,
  ALLAREA_REQUEST,

  //지역 name으로 극장 검색
  ALLTHEATER_SUCCESS,
  ALLTHEATER_FAILURE,
  ALLTHEATER_REQUEST,

  //영화 id로 극장검색
  SELECT_THEATER_REQUEST,
  SELECT_THEATER_SUCCESS,
  SELECT_THEATER_FAILURE,

  //영화 id와 지역name으로 극장 검색
  SELECT_MOVIETHEATER_REQUEST,
  SELECT_MOVIETHEATER_SUCCESS,
  SELECT_MOVIETHEATER_FAILURE,
  SELECT_THEATER_TO_MOVIE_REQUEST,
  SELECT_THEATER_TO_MOVIE_SUCCESS,
  SELECT_THEATER_TO_MOVIE_FAILURE,
} from "../reducer/ticket";
import axios from "axios";
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

//영화 id와 극장 name으로 지역 검색

async function selectMovieTheaterApi(data) {
  return await http
    .get("/infomovie/normal/movietheater", {
      params: {
        id: data.movieId,
        area: data.area,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
function* selectMovieTheater(action) {
  const result = yield call(selectMovieTheaterApi, action.data);
  if (result.status === 200) {
    //네트워크에
    //네트워크에서 200으로 받아서 수정했음 id: mv.cinema.theater.area.aarea:{}

    yield put({
      type: SELECT_MOVIETHEATER_SUCCESS,
      data: result.data,
    });
  } else {
    yield put({
      type: SELECT_MOVIETHEATER_FAILURE,
      data: result.status,
    });
  }
}

//극장으로 영화 검색

async function selectTheaterToMovieApi(data) {
  return await http
    .get("/v2/normal/theatertomovie", {
      params: {
        id: data,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
function* selectTheaterToMovie(action) {
  const result = yield call(selectTheaterToMovieApi, action.data);
  if (result.status === 200) {
    //네트워크에
    //네트워크에서 200으로 받아서 수정했음 id: mv.cinema.theater.area.aarea:{}
    const allmoviedata = result.data.map((mv) => ({
      id: mv.mid, //영화번호

      title: mv.mtitle, //제목
    }));
    yield put({
      type: SELECT_THEATER_TO_MOVIE_SUCCESS,
      data: allmoviedata,
    });
  } else {
    yield put({
      type: SELECT_THEATER_TO_MOVIE_FAILURE,
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
function* selectMovieTheaterSaga() {
  yield takeLatest(SELECT_MOVIETHEATER_REQUEST, selectMovieTheater);
}

function* selectTheaterToMovieSaga() {
  yield takeLatest(SELECT_THEATER_TO_MOVIE_REQUEST, selectTheaterToMovie);
}

export default function* ticketSaga() {
  yield all([
    fork(allTheaterSaga),
    fork(allAreaSaga),
    fork(selectTheaterSaga),
    fork(selectMovieTheaterSaga),
    fork(selectTheaterToMovieSaga),
  ]);
}

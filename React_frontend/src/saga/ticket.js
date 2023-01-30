import { all, takeLatest, fork, put, call, delay } from "redux-saga/effects";
import {
  ALLTHEATER_FAILURE,
  ALLTHEATER_REQUEST,
  ALLTHEATER_SUCCESS,
  MOVIE_SELECT_REQUEST,
  MOVIE_SELECT_SUCCESS,
  MOVIE_SELECT_FAILURE,
} from "../reducer/ticket";
import axios from "axios";
import { http } from "../lib/http";

//영화 불러오기

function loadAllTheater() {
  return axios.get("http://localhost:8080/v2/normal/theater", {
    "Access-Control-Allow-Credentials": true,
  });
} //극장 불러오기

function* allTheaterLoad() {
  const result = yield call(loadAllTheater);
  const alltheaterdata = result.data.map((mv) => ({
    id: mv.tid,
    name: mv.tname,
    area: mv.tarea,
    addr: mv.taddr,
  }));
  try {
    yield put({
      type: ALLTHEATER_SUCCESS,
      data: alltheaterdata,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ALLTHEATER_FAILURE,
    });
  }
}

//영화 검색
function selectMovie(data) {
  return axios.post(
    `http://localhost:8080/infomovie/normal/selectmovie?id=${data}`,
    {
      "Access-Control-Allow-Credentials": true,
    }
  );
} //영화 불러오기

function* selectMovieLoad(action) {
  const result = yield call(selectMovie, action.data);

  console.log(result);

  const selectMovieList = result.data.map((mv) => ({
    id: mv.cinema.theater.tid,
    name: mv.cinema.theater.tname,
    area: mv.cinema.theater.tarea,
    addr: mv.cinema.theater.taddr,
    miid: mv.miid,
    starttime: mv.mistarttime,
    endtime: mv.miendtime,
  }));
  try {
    yield put({
      type: MOVIE_SELECT_SUCCESS,
      data: selectMovieList,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: MOVIE_SELECT_FAILURE,
    });
  }
}

function* allTheater() {
  yield takeLatest(ALLTHEATER_REQUEST, allTheaterLoad);
}

function* selectedMovie() {
  yield takeLatest(MOVIE_SELECT_REQUEST, selectMovieLoad);
}

export default function* ticketSaga() {
  yield all([fork(allTheater), fork(selectedMovie)]);
}

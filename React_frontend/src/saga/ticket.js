import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import {
  ALLMOVIE_REQUEST,
  ALLMOVIE_SUCCESS,
  ALLMOVIE_FAILURE,
  ALLTHEATER_FAILURE,
  ALLTHEATER_REQUEST,
  ALLTHEATER_SUCCESS,
} from "../reducer/ticket";
import axios from "axios";

function loadAllMovie() {
  return axios.get("http://localhost:8080/v1/products", {
    "Access-Control-Allow-Credentials": true,
  });
} //영화 불러오기

function* allMovieLoad() {
  const result = yield call(loadAllMovie);

  const allmoviedata = result.data.map((mv) => ({
    id: mv.m_id,
    title: mv.m_title,
    rating: mv.m_rating,
  }));
  try {
    console.log(result.data);
    console.log(allmoviedata);
    yield put({
      type: ALLMOVIE_SUCCESS,
      data: allmoviedata,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ALLMOVIE_FAILURE,
    });
  }
}

function loadAllTheater() {
  return axios.get("http://localhost:8080/v1/cinema", {
    "Access-Control-Allow-Credentials": true,
  });
} //극장 불러오기

function* allTheaterLoad() {
  const result = yield call(loadAllTheater);

  const alltheaterdata = result.data.map((mv) => ({
    id: mv.c_id,
    name: mv.c_name,
    type: mv.c_type,
    seat: mv.c_seat,
    theater: {
      t_id: mv.theater.t_id,
      t_name: mv.theater.t_name,
      t_area: mv.theater.t_area,
      t_addr: mv.theater.t_addr,
    },
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

function* allMovie() {
  yield takeLatest(ALLMOVIE_REQUEST, allMovieLoad);
}

function* allTheater() {
  yield takeLatest(ALLTHEATER_REQUEST, allTheaterLoad);
}

export default function* ticketSaga() {
  yield all([fork(allMovie), fork(allTheater)]);
}

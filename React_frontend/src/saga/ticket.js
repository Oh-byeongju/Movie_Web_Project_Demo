import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import {
  ALLMOVIE_REQUEST,
  ALLMOVIE_SUCCESS,
  ALLMOVIE_FAILURE,
  ALLTHEATER_FAILURE,
  ALLTHEATER_REQUEST,
  ALLTHEATER_SUCCESS,
  MOVIE_SELECT_REQUEST,
  MOVIE_SELECT_SUCCESS,
  MOVIE_SELECT_FAILURE,
} from "../reducer/ticket";
import axios from "axios";
import { RestOutlined } from "@ant-design/icons";

function loadAllMovie() {
  return axios.get("http://localhost:8080/v1/showlist", {
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
  return axios.get("http://localhost:8080/v1/theater", {
    "Access-Control-Allow-Credentials": true,
  });
} //극장 불러오기

function* allTheaterLoad() {
  const result = yield call(loadAllTheater);

  console.log(result);
  const alltheaterdata = result.data.map((mv) => ({
    id: mv.t_id,
    name: mv.t_name,
    area: mv.t_area,
    addr: mv.t_addr,
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

function selectMovie(data) {
  return axios.post(
    "http://localhost:8080/v1/selected",
    {
      "Access-Control-Allow-Credentials": true,
    },
    data
  );
} //영화 불러오기

function* selectMovieLoad(action) {
  const result = yield call(selectMovie(action.data));
  try {
    yield put({
      type: MOVIE_SELECT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: MOVIE_SELECT_FAILURE,
    });
  }
}

function* allMovie() {
  yield takeLatest(ALLMOVIE_REQUEST, allMovieLoad);
}

function* allTheater() {
  yield takeLatest(ALLTHEATER_REQUEST, allTheaterLoad);
}

function* selectedMovie() {
  yield takeLatest(MOVIE_SELECT_REQUEST, selectMovieLoad);
}

export default function* ticketSaga() {
  yield all([fork(allMovie), fork(allTheater), fork(selectedMovie)]);
}

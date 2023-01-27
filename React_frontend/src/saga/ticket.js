import { all, takeLatest, fork, put, call, delay } from "redux-saga/effects";
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
  MOVIE_SEARCH_REQUEST,
  MOVIE_SEARCH_FAILURE,
  MOVIE_SEARCH_SUCCESS,
} from "../reducer/ticket";
import axios from "axios";

function loadAllMovie() {
  return axios.get("http://localhost:8080/v2/normal/movie", {
    "Access-Control-Allow-Credentials": true,
  });
} //영화 불러오기

function* allMovieLoad() {
  const result = yield call(loadAllMovie);
  const allmoviedata = result.data.map((mv) => ({
    id: mv.mid, //영화번호
    dir: mv.mdir, //감독
    date: mv.mdate, //개봉일
    actor: mv.mactor, //주연
    supactor: mv.supactor, //조연
    time: mv.mtime, //러닝타임
    genre: mv.mgenre, //장르
    story: mv.mstory,
    title: mv.mtitle, //제목
    mrating: mv.mrating, //연령
  }));
  try {
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

function searchMovie(data) {
  return axios.post(
    `http://localhost:8080/v2/normal/searchmovie?title=${data}`,
    {
      "Access-Control-Allow-Credentials": true,
    }
  );
}
function* searchMovieLoad(action) {
  const result = yield call(searchMovie, action.data);
  console.log(result);
  const allmoviedata = result.data.map((mv) => ({
    id: mv.mid, //영화번호
    dir: mv.mdir, //감독
    date: mv.mdate, //개봉일
    actor: mv.mactor, //주연
    supactor: mv.supactor, //조연
    time: mv.mtime, //러닝타임
    genre: mv.mgenre, //장르
    story: mv.mstory,
    title: mv.mtitle, //제목
    mrating: mv.mrating, //연령
  }));
  try {
    yield delay(2000);
    yield put({
      type: MOVIE_SEARCH_SUCCESS,
      data: allmoviedata,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: MOVIE_SEARCH_FAILURE,
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

function* searchedMovie() {
  yield takeLatest(MOVIE_SEARCH_REQUEST, searchMovieLoad);
}

export default function* ticketSaga() {
  yield all([
    fork(allMovie),
    fork(allTheater),
    fork(selectedMovie),
    fork(searchedMovie),
  ]);
}

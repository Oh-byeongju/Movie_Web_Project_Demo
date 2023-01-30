import { all, takeLatest, fork, put, call, delay } from "redux-saga/effects";
import {
  ALLMOVIE_REQUEST,
  ALLMOVIE_SUCCESS,
  ALLMOVIE_FAILURE,
  MOVIE_SEARCH_REQUEST,
  MOVIE_SEARCH_FAILURE,
  MOVIE_SEARCH_SUCCESS,
} from "../reducer/ticket";
import axios from "axios";
import { http } from "../lib/http";

//영화 불러오기
async function loadAllMovie() {
  return await http
    .get("/v2/normal/movie")
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

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
    rating: mv.mrating, //연령
    like: mv.mlike,
    imagepath: mv.mimagepath,
  }));

  if (result.status === 200) {
    //네트워크에서 200으로 받아서 수정했음
    yield put({
      type: ALLMOVIE_SUCCESS,
      data: allmoviedata,
    });
  } else {
    yield put({
      type: ALLMOVIE_FAILURE,
      data: result.status,
    });
  }
}

//영화를 검색하기 위한 사가
async function searchMovie(data) {
  return await http
    .post(`/v2/normal/searchmovie?title=${data}`)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* searchMovieLoad(action) {
  const result = yield call(searchMovie, action.data);

  if (result.status === 200) {
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
      rating: mv.mrating, //연령
      like: mv.mlike,
      imagepath: mv.mimagepath,
    }));
    //네트워크에서 200으로 받아서 수정했음
    yield delay(2000);
    yield put({
      type: MOVIE_SEARCH_SUCCESS,
      data: allmoviedata,
    });
  } else {
    yield put({
      type: MOVIE_SEARCH_FAILURE,
      data: result.status,
    });
  }
}

function* allMovie() {
  yield takeLatest(ALLMOVIE_REQUEST, allMovieLoad);
}

function* selectedMovie() {
  yield takeLatest(MOVIE_SEARCH_REQUEST, searchMovieLoad);
}

export default function* movieSaga() {
  yield all([fork(allMovie), fork(selectedMovie)]);
}

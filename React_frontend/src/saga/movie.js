import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import {
  ALLMOVIE_REQUEST,
  ALLMOVIE_SUCCESS,
  ALLMOVIE_FAILURE,
  MOVIE_SEARCH_REQUEST,
  MOVIE_SEARCH_FAILURE,
  MOVIE_SEARCH_SUCCESS,
  DETAIL_MOVIE_REQUEST,
  DETAIL_MOVIE_SUCCESS,
  DETAIL_MOVIE_FAILURE
} from "../reducer/movie";
import { http } from "../lib/http";

// 전체 영화 불러오는 함수
function* AllMovieLoad(action) {
  const result = yield call(LoadAllMovie, action.data);
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
    imagepath: mv.mimagepath,
    likes: mv.mlikes,
    score: mv.mscore,
    like: mv.mlike
  }));
  //네트워크에서 200으로 받아서 수정했음
  if (result.status === 200) {
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

// 백엔드 호출
async function LoadAllMovie(data) {
  return await http.get("/movie/normal/allmovie", {
    params: {
      uid: data
    }
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 사용자 영화 검색을 위한 함수
function* SearchMovieLoad(action) {
  const result = yield call(SearchMovie, action.data);
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
      imagepath: mv.mimagepath,
      likes: mv.mlikes,
      score: mv.mscore,
      like: mv.mlike
    }));
    //네트워크에서 200으로 받아서 수정했음
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

// 백엔드 호출
async function SearchMovie(data) {
  return await http
    .get(`/movie/normal/searchmovie`, {
      params: {
        title: data.title,
        uid: data.uid
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 영화 세부내용 검색을 위한 함수
function* DetailMovieLoad(action) {
  const result = yield call(DetailMovie, action.data);
  if (result.status === 200) {
    yield put({
      type: DETAIL_MOVIE_SUCCESS,
      data: result.data,
    });
  } else {
    yield put({
      type: DETAIL_MOVIE_FAILURE,
      data: result.data,
    });
  }
}

// 백엔드 호출
async function DetailMovie(data) {
  return await http
    .get(`/movie/normal${data.pathname}`, {
      params: {
        uid: data.uid
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* allMovie() {
  yield takeLatest(ALLMOVIE_REQUEST, AllMovieLoad);
}

function* selectedMovie() {
  yield takeLatest(MOVIE_SEARCH_REQUEST, SearchMovieLoad);
}

function* detailMovie() {
  yield takeLatest(DETAIL_MOVIE_REQUEST, DetailMovieLoad);
}

export default function* movieSaga() {
  yield all([fork(allMovie), fork(selectedMovie), fork(detailMovie)]);
}

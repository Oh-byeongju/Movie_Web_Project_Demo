import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import {
  T_ALLMOVIE_FAILURE,
  T_ALLMOVIE_SUCCESS,
  T_ALLMOVIE_REQUEST,
  ALLTHEATER_SUCCESS,
  ALLTHEATER_FAILURE,
  ALLTHEATER_REQUEST,
  ALLDAY_REQUEST,
  ALLDAY_SUCCESS,
  ALLDAY_FAILURE,
  SELECT_THEATER_REQUEST,
  SELECT_THEATER_SUCCESS,
  SELECT_THEATER_FAILURE,
  SELECT_DAY_REQUEST,
  SELECT_DAY_SUCCESS,
  SELECT_DAY_FAILURE,
  SELECT_MOVIETHEATER_REQUEST,
  SELECT_MOVIETHEATER_SUCCESS,
  SELECT_MOVIETHEATER_FAILURE,
  SELECT_THEATER_TO_MOVIE_REQUEST,
  SELECT_THEATER_TO_MOVIE_SUCCESS,
  SELECT_THEATER_TO_MOVIE_FAILURE,
  SELECT_THEATER_TO_DAY_REQUEST,
  SELECT_THEATER_TO_DAY_SUCCESS,
  SELECT_THEATER_TO_DAY_FAILURE,
  SELECT_MOVIETHEATER_TO_DAY_FAILURE,
  SELECT_MOVIETHEATER_TO_DAY_SUCCESS,
  SELECT_MOVIETHEATER_TO_DAY_REQUEST,
} from "../reducer/ticket";
import { http } from "../lib/http";

//모두 수정

//전체 영화 검색

//영화 불러오기 좋아요순
async function loadAllMovie(data) {
  return await http
    .get("v2/normal/movie", {
      params: {
        uid: data,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* allMovieLoad(action) {
  const result = yield call(loadAllMovie, action.data);
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
    like: mv.mlike,
    able: true,
  }));

  if (result.status === 200) {
    //네트워크에서 200으로 받아서 수정했음
    yield put({
      type: T_ALLMOVIE_SUCCESS,
      data: allmoviedata,
    });
  } else {
    yield put({
      type: T_ALLMOVIE_FAILURE,
      data: result.status,
    });
  }
}

//전체 극장 검색하기
async function allTheaterApi() {
  return await http
    .get("/v2/normal/area")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
//지역 클릭시 지역NAME으로 극장 검색 SAGA
function* allTheater(action) {
  const result = yield call(allTheaterApi);
  if (result.status === 200) {
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

//영화 클릭 시 영화id로 극장 검색
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
/*
//영화 클릭 시 영화 ID와 지역NAME으로 해당되는 극장 SELECT
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
}*/

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
    like: mv.mlike,
    able: mv.able,
  }));
  if (result.status === 200) {
    //네트워크에
    //네트워크에서 200으로 받아서 수정했음 id: mv.cinema.theater.area.aarea:{}

    yield put({
      type: SELECT_THEATER_TO_MOVIE_SUCCESS,
      data: allmoviedata,
    });
  } else {
    alert("실패");
    yield put({
      type: SELECT_THEATER_TO_MOVIE_FAILURE,
      data: result.status,
    });
  }
}

//날짜 검색
async function AllDayApi() {
  return await http
    .get("/infomovie/normal/movieinfo")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
function* AllDay(action) {
  const result = yield call(AllDayApi);
  if (result.status === 200) {
    //네트워크에
    //네트워크에서 200으로 받아서 수정했음 id: mv.cinema.theater.area.aarea:{}

    yield put({
      type: ALLDAY_SUCCESS,
      data: result.data,
    });
  } else {
    alert("실패");
    yield put({
      type: ALLDAY_FAILURE,
      data: result.status,
    });
  }
}

//날짜 검색
async function selectMovieToDayApi(data) {
  return await http
    .get("/infomovie/normal/movieselectday", {
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
function* selectMovieToDay(action) {
  const result = yield call(selectMovieToDayApi, action.data);
  if (result.status === 200) {
    //네트워크에
    //네트워크에서 200으로 받아서 수정했음 id: mv.cinema.theater.area.aarea:{}

    yield put({
      type: SELECT_DAY_SUCCESS,
      data: result.data,
    });
  } else {
    alert("실패");
    yield put({
      type: SELECT_DAY_FAILURE,
      data: result.status,
    });
  }
}

//극장으로 날짜 검색
async function selectTheaterTDayApi(data) {
  return await http
    .get("/infomovie/normal/theaterday", {
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
function* selectTheaterTDay(action) {
  const result = yield call(selectTheaterTDayApi, action.data);
  if (result.status === 200) {
    yield put({
      type: SELECT_THEATER_TO_DAY_SUCCESS,
      data: result.data,
    });
  } else {
    alert("실패");
    yield put({
      type: SELECT_THEATER_TO_DAY_FAILURE,
      data: result.status,
    });
  }
}

//영화+극장 날짜검색
async function selectMovieTheaterDayApi(data) {
  return await http
    .get("/infomovie/normal/movietheaterday", {
      params: {
        mid: data.mid,
        tid: data.tid,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
function* selectMovieTheaterDay(action) {
  const result = yield call(selectMovieTheaterDayApi, action.data);
  if (result.status === 200) {
    yield put({
      type: SELECT_MOVIETHEATER_TO_DAY_SUCCESS,
      data: result.data,
    });
  } else {
    alert("실패");
    yield put({
      type: SELECT_MOVIETHEATER_TO_DAY_FAILURE,
      data: result.status,
    });
  }
}

function* TallMovieSaga() {
  yield takeLatest(T_ALLMOVIE_REQUEST, allMovieLoad);
}
function* allTheaterSaga() {
  yield takeLatest(ALLTHEATER_REQUEST, allTheater);
}

function* selectTheaterSaga() {
  yield takeLatest(SELECT_THEATER_REQUEST, selectTheater);
}
/*
function* selectMovieTheaterSaga() {
  yield takeLatest(SELECT_MOVIETHEATER_REQUEST, selectMovieTheater);
}*/

function* selectTheaterToMovieSaga() {
  yield takeLatest(SELECT_THEATER_TO_MOVIE_REQUEST, selectTheaterToMovie);
}
function* allDaySaga() {
  yield takeLatest(ALLDAY_REQUEST, AllDay);
}
function* selectMovieToDaySaga() {
  yield takeLatest(SELECT_DAY_REQUEST, selectMovieToDay);
}
function* selectTheaterTDaySaga() {
  yield takeLatest(SELECT_THEATER_TO_DAY_REQUEST, selectTheaterTDay);
}
function* selectMovieTheaterDaySaga() {
  yield takeLatest(SELECT_MOVIETHEATER_TO_DAY_REQUEST, selectMovieTheaterDay);
}

export default function* ticketSaga() {
  yield all([
    fork(TallMovieSaga),
    fork(allTheaterSaga),
    fork(selectTheaterSaga),
    /*fork(selectMovieTheaterSaga),*/
    fork(selectTheaterToMovieSaga),
    fork(allDaySaga),
    fork(selectMovieToDaySaga),
    fork(selectTheaterTDaySaga),
    fork(selectMovieTheaterDaySaga),
  ]);
}

import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import {
  ALLMOVIE_REQUSET,
  ALLMOVIE_SUCCESS,
  ALLMOVIE_FAILURE,
} from "../reducer/ticket";
import axios from "axios";

function loadAllMovie() {
  return axios.get("http://localhost:8080/v1/products", {
    "Access-Control-Allow-Credentials": true,
  });
}
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

function* allMovie() {
  yield takeLatest(ALLMOVIE_REQUSET, allMovieLoad);
}

export default function* ticketSaga() {
  yield all([fork(allMovie)]);
}

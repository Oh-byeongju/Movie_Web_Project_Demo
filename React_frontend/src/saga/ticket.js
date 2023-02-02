import { all, takeLatest, fork, put, call, delay } from "redux-saga/effects";
import {
  SELECT_THEATER_SUCCESS,
  SELECT_THEATER_FAILURE,
  SELECT_THEATER_REQUEST,
} from "../reducer/ticket";
import { http } from "../lib/http";

//모두 수정

async function selectTheater(data) {
  return await http
    .get(`/infomovie/normal/movieselect?id=${data}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* selectedTheater(action) {
  const result = yield call(selectTheater, action.data);

  if (result.status === 200) {
    const selectedData = result.data.map((mv) => ({
      id: mv.cinema.theater.area.aid,
      tid: mv.cinema.theater.tid,
      area: mv.cinema.theater.area.aarea,
      name: mv.cinema.theater.tname,
    }));
    console.log(selectedData);
    //네트워크에
    //네트워크에서 200으로 받아서 수정했음 id: mv.cinema.theater.area.aarea:{}

    yield put({
      type: SELECT_THEATER_SUCCESS,
      data: selectedData,
    });
  } else {
    yield put({
      type: SELECT_THEATER_FAILURE,
      data: result.status,
    });
  }
}
function* Theater() {
  yield takeLatest(SELECT_THEATER_REQUEST, selectedTheater);
}
export default function* ticketSaga() {
  yield all([fork(Theater)]);
}

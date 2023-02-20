import {
  SELECT_SEAT_SUCCESS,
  SELECT_SEAT_FAILURE,
  SELECT_SEAT_REQUEST,
  SELECT_INFOSEAT_FAILURE,
  SELECT_INFOSEAT_REQUEST,
  SELECT_INFOSEAT_SUCCESS,
} from "../reducer/seat";
import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import { http } from "../lib/http";
async function selectSeatApi(data) {
  return await http
    .get("/seat/normal/infoseat", {
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

function* selectSeat(action) {
  const result = yield call(selectSeatApi, action.data);
  if (result.status === 200) {
    yield put({
      type: SELECT_SEAT_SUCCESS,
      data: result.data,
    });
  } else {
    alert("실패");
    yield put({
      type: SELECT_SEAT_FAILURE,
      data: result.status,
    });
  }
}

async function selectInfoSeatApi(data) {
  return await http
    .get("/seat/normal/movieinfoseat", {
      params: {
        miid: data,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* selectInfoSeat(action) {
  const result = yield call(selectInfoSeatApi, action.data);
  if (result.status === 200) {
    yield put({
      type: SELECT_INFOSEAT_SUCCESS,
      data: result.data,
    });
  } else {
    alert("실패");
    yield put({
      type: SELECT_INFOSEAT_FAILURE,
      data: result.status,
    });
  }
}
function* selectSeatSaga() {
  yield takeLatest(SELECT_SEAT_REQUEST, selectSeat);
}

function* selectInfoSeatSaga() {
  yield takeLatest(SELECT_INFOSEAT_REQUEST, selectInfoSeat);
}
export default function* seatSaga() {
  yield all([fork(selectSeatSaga), fork(selectInfoSeatSaga)]);
}

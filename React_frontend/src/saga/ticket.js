import { all, takeLatest, fork, put } from "redux-saga/effects";
import {
  ADD_TICKET_FAILURE,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_REQUEST,
} from "../reducer/ticket";
function* ticketing(action) {
  try {
    yield put({
      type: ADD_TICKET_SUCCESS,
      data: action.data,
    });
    console.log(action.data);
  } catch (err) {
    yield put({
      type: ADD_TICKET_FAILURE,
      data: action.err.data,
    });
  }
}

function* ticket() {
  yield takeLatest(ADD_TICKET_REQUEST, ticketing);
}

export default function* userSaga() {
  yield all([fork(ticket)]);
}

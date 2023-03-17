import { call, all, takeLatest, fork, put, select } from "redux-saga/effects";
import { http } from "../lib/http";
import { useSelector } from "react-redux";
import { BOARD_READ_FAILURE, BOARD_READ_REQUEST, BOARD_READ_SUCCESS, BOARD_WRITE_FAILURE, BOARD_WRITE_REQUEST, BOARD_WRITE_SUCCESS } from "../reducer/Board";

//게시판 읽기
async function BoardReadApi(data) {
  return await http
    .get("/board/normal/boardall")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* BoardRead(action) {
  console.log(action)
  const result = yield call(BoardReadApi, action.data);

  if (result.status === 200) { 
    yield put({
      type: BOARD_READ_SUCCESS,
      data:result.data
    });
  } else {
    yield put({
      type: BOARD_READ_FAILURE,
      data: result.status,
    });   
  }
}

//게시판 쓰기
async function BoardWriteApi(data) {
    return await http
      .post("/board/auth/boardwrite",data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  
  function* BoardWrite(action) {
    console.log(action)
    const result = yield call(BoardWriteApi, action.data);
  
    if (result.status === 200) { 
      yield put({
        type: BOARD_WRITE_SUCCESS,
      });
    } else {
      yield put({
        type: BOARD_WRITE_FAILURE,
        data: result.status,
      });   
    }
  }

  function* BoardWriteSaga() {
    yield takeLatest(BOARD_WRITE_REQUEST, BoardWrite);
  }
  
  function* BoardReadSaga() {
    yield takeLatest(BOARD_READ_REQUEST, BoardRead);
  }
  
  export default function* BoardSaga() {
    yield all([fork(BoardWriteSaga),fork(BoardReadSaga)]);
  }
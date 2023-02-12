/*
 23-01-19 유저 좋아요 toggle 구현(오병주)
 23-02-12 유저 관람평 작성 구현(오병주)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import {
  USER_MLIKE_REQUEST,
	USER_MLIKE_SUCCESS,
	USER_MLIKE_FAILURE,
  USER_COMMENT_REQUEST,
  USER_COMMENT_SUCCESS,
  USER_COMMENT_FAILURE
} from "../reducer/R_user_movie";
import { http } from "../lib/http";

// 좋아요 toggle 함수
function* LikeToggle(action) {
  const result = yield call(CallLikeToggle, action.data);
  if (result.status === 204) {
    yield put({
      type: USER_MLIKE_SUCCESS,
    });
  } else {
    yield put({
      type: USER_MLIKE_FAILURE,
    });
  }
}

// 유저 정보를 전달한 뒤 좋아요 기록 변경(백엔드 연결)
async function CallLikeToggle(data) {
  return await http.post("/MovieMember/auth/LikeToggle", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 관람평 작성 함수(이거 중복검사도 해야하네 공사가 클듯?  내일 사가랑 스프링 받는곳 부터 하면됨)
function* CommentInsert(action) {
  const result = yield call(CallCommentInsert, action.data);
  if (result.status === 204) {
    yield put({
      type: USER_COMMENT_SUCCESS,
    });
  } else {
    yield put({
      type: USER_COMMENT_FAILURE,
    });
  }
}

// 유저 정보를 전달한 뒤 좋아요 기록 변경(백엔드 연결)
async function CallCommentInsert(data) {
  return await http.post("/MovieMember/auth/LikeToggle", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* USER_MLIKE_TOGGLE() {
  yield takeLatest(USER_MLIKE_REQUEST, LikeToggle);
}

function* USER_COMMENT_INSERT() {
  yield takeLatest(USER_COMMENT_REQUEST, CommentInsert);
}

export default function* S_user_movie() {
  yield all([fork(USER_MLIKE_TOGGLE), fork(USER_COMMENT_INSERT)]);
}

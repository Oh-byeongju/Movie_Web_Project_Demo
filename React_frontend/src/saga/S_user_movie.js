/*
 23-01-19 유저 좋아요 toggle 구현(오병주)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import {
  USER_MLIKE_REQUEST,
	USER_MLIKE_SUCCESS,
	USER_MLIKE_FAILURE
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
  return await http.post("/MovieMember/normal/LikeToggle", data)
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

export default function* S_user_movie() {
  yield all([fork(USER_MLIKE_TOGGLE)]);
}

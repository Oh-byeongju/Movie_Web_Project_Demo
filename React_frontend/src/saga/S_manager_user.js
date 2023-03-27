/*
 23-03-27 관리자 페이지 회원관리 구현(오병주)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import { 
	MANAGER_USER_LIST_REQUEST,
	MANAGER_USER_LIST_SUCCESS,
	MANAGER_USER_LIST_FAILURE,
	MANAGER_USER_DROP_REQUEST,
	MANAGER_USER_DROP_SUCCESS,
	MANAGER_USER_DROP_FAILURE
 } from "../reducer/R_manager_user";
import { http } from "../lib/http";

// 전체 유저 조회 함수
function* AllUser() {
  const result = yield call(callAllUser);
  if (result.status === 200) {
    yield put({
      type: MANAGER_USER_LIST_SUCCESS,
      data: result.data
    });
  } 
  else {
    yield put({
			type: MANAGER_USER_LIST_FAILURE
    });
  }
}

// 전체 유저 조회 백엔드 호출
async function callAllUser() {
  return await http.get("/Manager/auth/allUser")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 유저 추방 함수
function* DropUser(action) {
  const result = yield call(callDropUser, action.data);
  if (result.status === 204) {
    yield put({
      type: MANAGER_USER_DROP_SUCCESS,
      data: action.data.uid
    });
  } 
  else {
    yield put({
			type: MANAGER_USER_DROP_FAILURE
    });
  }
}

// 유저 추방 함수 백엔드 호출
async function callDropUser(data) {
  return await http.post("/Manager/auth/dropUser", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* USER_LIST() {
  yield takeLatest(MANAGER_USER_LIST_REQUEST, AllUser);
}

function* USER_DROP() {
  yield takeLatest(MANAGER_USER_DROP_REQUEST, DropUser);
}

export default function* S_manager_user() {
  yield all([fork(USER_LIST), fork(USER_DROP)]);
}

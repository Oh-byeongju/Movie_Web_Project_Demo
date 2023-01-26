/*
 23-01-19 로그인 구현(오병주)
 23-01-24 로그인 상태확인 구현(오병주)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_STATUS_REQUEST,
  USER_LOGIN_STATUS_FAILURE,
  USER_LOGIN_STATUS_SUCCESS
} from "../reducer/R_user_login";
import axios from "axios";

const baseUrl = "http://localhost:8080";

// 로그인 함수
function* UserLogin(action) {
  const result = yield call(Login, action.data);
  if (result.status === 200) {
    yield put({
      type: USER_LOGIN_SUCCESS,
      data: result.data
    });
  }
  else {
    yield put({
      type: USER_LOGIN_FAILURE,
      data: result.data
    });
  }
}

// 디비에 로그인 정보를 전달하고 토큰을 리턴 /// csrf 검사도 넣어야함 /// 쿠키를 같이 보내려면 with~~ 저게 필요함
async function Login(data) {
	return await axios.post(baseUrl + "/member/normal/login", data, {withCredentials: true})  
  .then((response) => {
    return response;
  })
  .catch((error)=>{
    return error.response;
  })
};

// 로그인 상태 확인 함수
function* UserCheck() {
  const result = yield call(Check);
  if (result.status === 200) {
    yield put({
      type: USER_LOGIN_STATUS_SUCCESS,
      data: result.data
    });
  }
  else {
    yield put({
      type: USER_LOGIN_STATUS_FAILURE,
      data: result.data
    });
  }
}

// 로그인 상태를 확인 하기 위해 쿠키를 전달함
async function Check() {
  return await axios.get(baseUrl + "/member/normal/login_status", {withCredentials: true})  
  .then((response) => {
    return response;
  })
  .catch((error)=>{
    return error.response;
  })
};

function* USER_LOGIN() {
  yield takeLatest(USER_LOGIN_REQUEST, UserLogin);
}

function* USER_STATUS() {
  yield takeLatest(USER_LOGIN_STATUS_REQUEST, UserCheck);
}

export default function* S_user_loginSaga() {
  yield all([fork(USER_LOGIN), fork(USER_STATUS)]);
}
/* 
	23-01-08 회원가입 시 필요한 사가 파일 작성(오병주)
  23-01-10 아이디 중복확인 함수 생성(오병주)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import {
  USER_ID_FAILURE,
  USER_ID_SUCCESS,
  USER_ID_REQUEST,
} from "../reducer/R_user_join";
import axios from "axios";

const baseUrl = "http://localhost:8080";

// 디비에서 데이터 select 하고 바로 리턴해줌
async function idexsits(data) {
	return await axios.get(baseUrl + "/auth/id",{
    params: {
      uid: data
    }
  })
  .then((response) => {
    return response;
  })
  .catch((error)=>{
    return error.response;
  })
};

function* IDcheck(action) {
  const result = yield call(idexsits, action.data);
  //  idexsits(action.data); 이런 것
  
  if (result.status === 204) {
    yield put({
      type: USER_ID_SUCCESS,
      data: result.status
    });
    console.log(result);
  }
  else {
    yield put({
      type: USER_ID_FAILURE,
      data: result.status
    });
  }
}

function* S_user_join() {
  yield takeLatest(USER_ID_REQUEST, IDcheck);
}

export default function* S_user_joinSaga() {
  yield all([fork(S_user_join)]);
}

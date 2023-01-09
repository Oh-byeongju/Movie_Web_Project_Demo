import {all, call, takeLatest, fork, put } from "redux-saga/effects";
import {
  USER_INFO_FAILURE,
  USER_INFO_SUCCESS,
  USER_INFO_REQUEST,
} from "../reducer/temp";
import axios from "axios";


const baseUrl = "http://localhost:8080";

// 디비에서 데이터 select 하고 바로 리턴해줌
async function getData() {
	return await axios.get(baseUrl + "/Search/select")
};


// 이 파일 지금 수정 중 
function* Info() {
  try {
		const result = yield call(getData);

    const allInfo = result.data.map((Info) => ({
      id: Info.id,
      memo_text: Info.memo_text,
    }));

    yield put({
      type: USER_INFO_SUCCESS,
			data: allInfo
    });
  } 
  catch (err) {
    yield put({
      type: USER_INFO_FAILURE
    });
  }
}

function* temp() {
  yield takeLatest(USER_INFO_REQUEST, Info);
}

export default function* tempSaga() {
  yield all([fork(temp)]);
}
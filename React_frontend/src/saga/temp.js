import {all, call, takeLatest, fork, put } from "redux-saga/effects";
import {
  USER_INFO_FAILURE,
  USER_INFO_SUCCESS,
  USER_INFO_REQUEST,
} from "../reducer/temp";
import InfoDB from "../connectDB/InfoDB";


// 이 파일 지금 수정 중 
function* Info() {
	console.log("ehsek")
  try {
		const result = yield call()

		console.log("성공")

    yield put({
      type: USER_INFO_SUCCESS,
			data: "ss"
    });
  } catch (err) {
		console.log("error")
    yield put({
      type: USER_INFO_FAILURE,
      data: "ss"
    });
  }
}

function* temp() {
  yield takeLatest(USER_INFO_REQUEST, Info);
}

export default function* tempSaga() {
  yield all([fork(temp)]);
}
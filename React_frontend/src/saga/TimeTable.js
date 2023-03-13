import { SELECT_SC_THEATER_FAILURE, SELECT_SC_THEATER_REQUEST, SELECT_SC_THEATER_SUCCESS } from "../reducer/TimeTable";
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import { http } from "../lib/http";


async function selectTheaterApi(data) {
    return await http
      .get("/infomovie/normal/findtest", {params:{
        mid:data.mid,
        miday:data.miday,
        area:data.area
      }})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  
  function* selectTheater(action) {
    console.log('gg')
    const result = yield call(selectTheaterApi, action.data);
    console.log(result);
  
    if (result.status === 200) { 
      yield put({
        type: SELECT_SC_THEATER_SUCCESS,
        data:result.data,
      });
    } else {
      yield put({
        type: SELECT_SC_THEATER_FAILURE,
        data: result.status,
      });
    }
  }
  function* selectTheaterSaga() {
    yield takeLatest(SELECT_SC_THEATER_REQUEST, selectTheater);
  }
  
  export default function* timeTableSaga() {
    yield all([fork(selectTheaterSaga)]);
  }
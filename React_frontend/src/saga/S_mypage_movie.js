/*
 23-03-17 마이페이지 영화 함수들 구현(오병주)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import { 
	USER_MOVIE_POSSIBLE_REQUEST,
	USER_MOVIE_POSSIBLE_SUCCESS,
	USER_MOVIE_POSSIBLE_FAILURE,
  USER_MY_COMMENT_WRITE_REQUEST,
	USER_MY_COMMENT_WRITE_SUCCESS,
	USER_MY_COMMENT_WRITE_FAILURE,
  USER_MY_COMMENT_SEARCH_REQUEST,
	USER_MY_COMMENT_SEARCH_SUCCESS,
	USER_MY_COMMENT_SEARCH_FAILURE
} from "../reducer/R_mypage_movie";
import { http } from "../lib/http";

// 관람평 작성가능 영화 조회 메소드
function* Possible_movie() {
  const result = yield call(Possible_movie_call);
  if (result.status === 200) {
    yield put({
      type: USER_MOVIE_POSSIBLE_SUCCESS,
      data: result.data,
    });
  } 
  else {
    yield put({
      type: USER_MOVIE_POSSIBLE_FAILURE
    });
  }
}

// 관람평 작성가능 영화 조회 백엔드 호출
async function Possible_movie_call() {
  return await http
    .get("/MyPageMovie/auth/moviePossible")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 마이페이지 관람평 작성 함수
function* CommentInsert(action) {
  const result = yield call(CallCommentInsert, action.data);
  if (result.status === 204) {
    yield put({
      type: USER_MY_COMMENT_WRITE_SUCCESS,
      data: result.status
    });
  } 
  else {
    yield put({
      type: USER_MY_COMMENT_WRITE_FAILURE,
      data: result.status
    });
  }
}

// 관람평 내용을 전달한 뒤 저장(백엔드 연결)
async function CallCommentInsert(data) {
  return await http.post("/MyPageMovie/auth/InsertComment", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 작성한 관람평 조회 메소드
function* CommentSearch() {
  const result = yield call(CallCommentSearch);
  if (result.status === 200) {
    yield put({
      type: USER_MY_COMMENT_SEARCH_SUCCESS,
      data: result.data,
    });
  } 
  else {
    yield put({
      type: USER_MY_COMMENT_SEARCH_FAILURE
    });
  }
}

// 작성한 관람평 조회 백엔드 호출
async function CallCommentSearch() {
  return await http
    .get("/MyPageMovie/auth/GetComment")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* USER_POSSIBLE() {
  yield takeLatest(USER_MOVIE_POSSIBLE_REQUEST, Possible_movie);
}

function* USER_WRITE() {
  yield takeLatest(USER_MY_COMMENT_WRITE_REQUEST, CommentInsert);
}

function* USER_SEARCH() {
  yield takeLatest(USER_MY_COMMENT_SEARCH_REQUEST, CommentSearch);
}

export default function* S_mypage_movie() {
  yield all([fork(USER_POSSIBLE), fork(USER_WRITE), fork(USER_SEARCH)]);
}

import { call, all, takeLatest, fork, put, select, delay } from "redux-saga/effects";
import { http } from "../lib/http";
import { useNavigate } from "react-router-dom";
import { BOARD_READ_FAILURE, BOARD_READ_REQUEST, BOARD_READ_SUCCESS, 
  BOARD_WRITE_FAILURE, BOARD_WRITE_REQUEST, BOARD_WRITE_SUCCESS, 
  CONTENT_READ_FAILURE, CONTENT_READ_REQUEST, CONTENT_READ_SUCCESS 
,BOARD_SEARCH_REQUEST, BOARD_SEARCH_SUCCESS, BOARD_SEARCH_FAILURE
, CONTENT_DELETE_REQUEST,CONTENT_DELETE_SUCCESS,CONTENT_DELETE_FAILURE, COMMENT_WRITE_REQUEST, COMMENT_WRITE_SUCCESS, COMMENT_WRITE_FAILURE, COMMENT_READ_SUCCESS, COMMENT_READ_FAILURE, COMMENT_READ_REQUEST} from "../reducer/Board";

//게시판 읽기
async function BoardReadApi(data) {
  return await http
    .get(`/board/normal/boardall?sort=${data.sort}&page=${data.page}`)
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

//게시판 검색
async function BoardSearchApi(data) {
  return await http
    .get("/board/normal/search",{
    params:{
      page:data.page,
      category:data.category,
      title:data.title
    }})
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* BoardSearch(action) {
  console.log(action)
  const result = yield call(BoardSearchApi, action.data);

  if (result.status === 200) { 
    yield put({
      type: BOARD_SEARCH_SUCCESS,
      data:result.data
    });
  } else {
    yield put({
      type: BOARD_SEARCH_FAILURE,
      data: result.status,
    });   
  }
}

//게시판 상세 페이지
async function ContentReadApi(data) {
  return await http
    .get(`/board/normal/content/${data.id}/${data.title}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* ContentRead(action) {
  console.log(action)
  const result = yield call(ContentReadApi, action.data);
  console.log(result)
  if (result.status === 200) { 
    yield put({
      type: CONTENT_READ_SUCCESS,
      data:result.data
    });
  } else {
    yield put({
      type: CONTENT_READ_FAILURE,
      data: result.status,
    });   
  }
}
//게시판 삭제
async function ContentDeleteApi(data) {
  return await http
    .post("/board/auth/delete",data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* ContentDelete(action) {
  console.log(action)
  const result = yield call(ContentDeleteApi, action.data);
  console.log(result)
  
  if (result.status === 200) { 
    yield put({
      type: CONTENT_DELETE_SUCCESS,
      
    });

  } else {
    yield put({
      type: CONTENT_DELETE_FAILURE,
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
  
    if (result.status === 204) { 
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
   //댓글 쓰기
async function CommentReadApi(data) {
  return await http
    .get("/board/normal/comment",{params:{
      bid:data
    }})
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* CommentRead(action) {
  console.log(action)
  const result = yield call(CommentReadApi, action.data);

  if (result.status === 200) { 
    yield put({
      type: COMMENT_READ_SUCCESS,
      data:result.data
    });
  } else {
    yield put({
      type: COMMENT_READ_FAILURE,
      data: result.status,
    });   
  }
}


  //댓글 쓰기
async function CommentWriteApi(data) {
  return await http
    .post("/board/auth/commentwrite",data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* CommentWrite(action) {
  console.log(action)
  const result = yield call(CommentWriteApi, action.data);

  if (result.status === 204) { 
    yield put({
      type: COMMENT_WRITE_SUCCESS,
      data:result.data
    });
  } else {
    yield put({
      type: COMMENT_WRITE_FAILURE,
      data: result.status,
    });   
  }
}

  function* BoardWriteSaga() {
    yield takeLatest(BOARD_WRITE_REQUEST, BoardWrite);
  }

  function* BoardSearchSaga() {
    yield takeLatest(BOARD_SEARCH_REQUEST, BoardSearch);
  }
  
  function* ContentWriteSaga() {
    yield takeLatest(CONTENT_READ_REQUEST, ContentRead);
  }

  function* ContentDeleteSaga() {
    yield takeLatest(CONTENT_DELETE_REQUEST, ContentDelete);
  }

  function* BoardReadSaga() {
    yield takeLatest(BOARD_READ_REQUEST, BoardRead);
  }

  function* CommentReadSaga() {
    yield takeLatest(COMMENT_READ_REQUEST, CommentRead);
  }
  

  function* CommentWriteSaga() {
    yield takeLatest(COMMENT_WRITE_REQUEST, CommentWrite);
  }
  
  export default function* BoardSaga() {
    yield all([fork(BoardWriteSaga),fork(BoardReadSaga),fork(ContentWriteSaga),fork(BoardSearchSaga),fork(ContentDeleteSaga),
    fork(CommentWriteSaga),fork(CommentReadSaga)]);
  }
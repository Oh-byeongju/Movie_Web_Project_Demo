/* eslint-disable */
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserJoin from "./pages/UserJoin";
import Reserve from "./pages/Reserve";
import AllMovie from "./pages/AllMovie";
import ScreenMovie from "./pages/ScreenMovie";
import ComingMovie from "./pages/ComingMovie";
import MovieDetail from "./pages/MovieDetail";
import Mypage from "./pages/MyPage";
import MyPageReserve from "./pages/MyPageReserve";
import MyPageCancel from "./pages/MyPageCancel";
import MyPageReserveDetail from "./pages/MyPageReserveDetail";
import MyPageCancleDetail from "./pages/MyPageCancleDetail";
import MyPageLike from "./pages/MyPageLike";
import MyPageComment from "./pages/MyPageComment";
import MyPageModify from "./pages/MyPageModify";
import StoryChange from "./pages/StoryChange";
import TimeTable from "./pages/TimeTable";

// TopButton과 Footer가 있어야 하는 페이지이면 Layout 사이에 넣고 아니면 따로 빼기
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} exact></Route>
        <Route path="/UserLogin" element={<UserLogin />}></Route>
        <Route path="/UserJoin" element={<UserJoin />}></Route>
        <Route path="/Reserve" exact element={<Reserve />}></Route>
        <Route path="/allmovie" element={<AllMovie />}></Route>
        <Route path="/screenmovie" element={<ScreenMovie />}></Route>
        <Route path="/comingmovie" element={<ComingMovie />}></Route>
        <Route path="/moviedetail/:id" element={<MovieDetail />}></Route>
        <Route element={<Mypage />}>
          <Route path="/Mypage/Reserve" element={<MyPageReserve />}></Route>
          <Route path="/Mypage/Cancle" element={<MyPageCancel />}></Route>
          <Route path="/Mypage/ReserveDetail/:id" element={<MyPageReserveDetail />}></Route>
          <Route path="/Mypage/CancleDetail/:id" element={<MyPageCancleDetail />}></Route>
          <Route path="/Mypage/Like" element={<MyPageLike />}></Route>
          <Route path="/Mypage/Comment" element={<MyPageComment />}></Route>
          <Route path="/Mypage/Modify" element={<MyPageModify />}></Route>
        </Route>
        <Route path="/StoryChange" element={<StoryChange />}></Route>
        <Route path="/Timetable" element={<TimeTable />}></Route>
      </Route>
    </Routes>
  );
}

export default App;

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
import MyPageFinish from "./pages/MyPageFinish";
import MyPageReserveDetail from "./pages/MyPageReserveDetail";
import MyPageCancelDetail from "./pages/MyPageCancelDetail";
import MyPageFinishDetail from "./pages/MyPageFinishDetail";
import MyPageLike from "./pages/MyPageLike";
import MyPageComment from "./pages/MyPageComment";
import MyPageModify from "./pages/MyPageModify";
import StoryChange from "./pages/StoryChange";
import TimeTable from "./pages/TimeTable";
import Board from "./pages/Board";
import BoardList from "./pages/BoardList";
import BoardWrite from "./pages/BoardWrite";
import BoardCard from "./pages/BoardCard";
import BoardSearch from "./pages/BoardSearch";
import ManagerUser from "./pages/ManagerUser";
import ManagerReserve from "./pages/ManagerReserve";
import ManagerWriteRecord from "./pages/ManagerWriteRecord";
import Manager from "./pages/Manager";

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
        <Route element={<Board />}>
          <Route path="/Board/list/:category/:free/:page" element={<BoardList />}></Route>
          <Route path="/Board/write" element={<BoardWrite />}></Route>
          <Route path="/Board/content/:id/:title" element={<BoardCard />}></Route>
          <Route path="/Board/search/:target/:title/:page" element={<BoardSearch />} ></Route>
        </Route>
        <Route element={<Mypage />}>
          <Route path="/Mypage/Reserve" element={<MyPageReserve x/>}></Route>
          <Route path="/Mypage/Cancel" element={<MyPageCancel />}></Route>
          <Route path="/Mypage/Finish" element={<MyPageFinish />}></Route>
          <Route path="/Mypage/ReserveDetail/:id" element={<MyPageReserveDetail />}></Route>
          <Route path="/Mypage/CancelDetail/:id" element={<MyPageCancelDetail />}></Route>
          <Route path="/Mypage/FinishDetail/:id" element={<MyPageFinishDetail />}></Route>
          <Route path="/Mypage/Like" element={<MyPageLike />}></Route>
          <Route path="/Mypage/Comment" element={<MyPageComment />}></Route>
          <Route path="/Mypage/Modify" element={<MyPageModify />}></Route>
        </Route>
        <Route path="/StoryChange" element={<StoryChange />}></Route>
        <Route path="/Timetable" element={<TimeTable />}></Route>
        <Route path="/Manager/User" element={<ManagerUser />}></Route>
        <Route path="/Manager/Reserve" element={<ManagerReserve />}></Route>
        <Route path="/Manager/Document" element={<ManagerWriteRecord />}></Route>
        <Route path="/Manager/Cinema" element={<Manager />}></Route>
      </Route>
    </Routes>
  );
}

export default App;

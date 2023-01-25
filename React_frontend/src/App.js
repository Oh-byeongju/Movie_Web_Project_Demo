/* eslint-disable */
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserJoin from "./pages/UserJoin";
import Reserve from "./pages/Reserve";
import Movie from "./pages/Movie";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact={true}></Route>
      <Route path="/UserLogin" element={<UserLogin />}></Route>
      <Route path="/UserJoin" element={<UserJoin />}></Route>
      <Route path="/Reserve" element={<Reserve />}></Route>
      <Route path="/movie" element={<Movie />}></Route>
    </Routes>
  );
}

export default App;
// <Route path="/Notice/free/:id" element={<NoticeFreeLook/>}></Route> 추후 쿼리 스트링 사용시 쓰기(양식)

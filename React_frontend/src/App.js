/* eslint-disable */
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserJoin from "./pages/UserJoin";
import Reserve from "./pages/Reserve";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact={true}></Route>
      <Route path="/UserJoin" element={<UserJoin />}></Route>
      <Route path="/Reserve" element={<Reserve />}></Route>
    </Routes>
  );
}

export default App;
// <Route path="/Notice/free/:id" element={<NoticeFreeLook/>}></Route> 추후 쿼리 스트링 사용시 쓰기(양식)

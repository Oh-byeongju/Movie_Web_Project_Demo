import React from "react";
import Footer from "../components/Footer";
import TopButtons from "../components/TopButtons";
import AllTheaterList from "../components/ticket/AllTheaterList";
import AllMovieList from "../components/ticket/AllMovieList";
const Reserve = () => {
  //데이터를 받으면 컴포넌트에 넘겨줌
  return (
    <div>
      <TopButtons />
      <AllMovieList />
      <AllTheaterList />
      <Footer />
    </div>
  );
};
//예매 페이지
export default Reserve;

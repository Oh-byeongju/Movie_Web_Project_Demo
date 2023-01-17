import React from "react";
import Footer from "../components/Common_components/Footer";
import TopButtons from "../components/Common_components/TopButtons";
import AllTheaterList from "../components/ticket/AllTheaterList";
import AllMovieList from "../components/ticket/AllMovieList";
import Calendar from "../components/ticket/Calendar";
const Reserve = () => {
  //데이터를 받으면 컴포넌트에 넘겨줌
  return (
    <div>
      <TopButtons />
      <AllMovieList />
      <AllTheaterList />
      <Calendar />
      <Footer />
    </div>
  );
};
//예매 페이지
export default Reserve;

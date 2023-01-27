import React from "react";
import { Outlet } from "react-router-dom";
import TopButtons from "../components/Common_components/TopButtons";
import Footer from "../components/Common_components/Footer";

// 공통으로 쓰는 TopButton과 Footer의 리랜더링을 방지하기 위해 만든 컴포넌트
const Layout = () => {
  return (
    <>
      <TopButtons />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

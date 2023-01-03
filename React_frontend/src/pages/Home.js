import React from "react";
import TopButtons from "../Common_components/TopButtons";
import { createGlobalStyle } from "styled-components";
import BoxList from "../Common_components/BoxOffice/BoxList";
import HomeBanner from "../Common_components/HomeBanner";
import Footer from "../Common_components/Footer";

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <TopButtons />
      <HomeBanner />
      <BoxList />
      <Footer/>
    </>
  );
};

// BoxList 컴포넌트랑 Footer 컴포넌트 사이에 뭐가 있어야 오류가 안생김

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
  }
`;

export default Home;

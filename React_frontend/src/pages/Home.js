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

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
  }
`;

export default Home;

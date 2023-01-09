import React from "react";
import TopButtons from "../components/TopButtons";
import { createGlobalStyle } from "styled-components";
import BoxList from "../components/BoxOffice/BoxList";
import HomeBanner from "../components/HomeBanner";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <TopButtons />
      <HomeBanner />
      <BoxList />
      <Footer />
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
  }
`;

export default Home;

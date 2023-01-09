import React from "react";
import TopButtons from "../components/Common_components/TopButtons";
import { createGlobalStyle } from "styled-components";
import BoxList from "../components/BoxOffice/BoxList";
import HomeBanner from "../components/Common_components/HomeBanner";
import Footer from "../components/Common_components/Footer";

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

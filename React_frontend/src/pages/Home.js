import React from "react";
import TopButtons from "../components/TopButtons";
import { createGlobalStyle } from "styled-components";
<<<<<<< HEAD
import BoxList from "../components/BoxOffice/BoxList";
import HomeBanner from "../components/HomeBanner";
import Footer from "../components/Footer";
=======
import BoxList from "../Common_components/BoxOffice/BoxList";
import HomeBanner from "../Common_components/HomeBanner";
import Footer from "../Common_components/Footer";

>>>>>>> 18fb35950aca706e977db49650fa745abc0e31fd
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

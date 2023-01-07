import React from "react";
import TopButtons from "../components/TopButtons";
import { createGlobalStyle } from "styled-components";
import BoxList from "../components/BoxOffice/BoxList";
import HomeBanner from "../components/HomeBanner";
import Footer from "../components/Footer";
<<<<<<< HEAD

=======
>>>>>>> 3b9414709166e524783b8b514da5704e07baaaa0
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

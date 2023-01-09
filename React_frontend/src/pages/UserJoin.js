import React from "react";
import TopButtons from "../components/Common_components/TopButtons";
import JoinForm from "../components/Login_components/JoinForm";
import Footer from "../components/Common_components/Footer";
import { createGlobalStyle } from "styled-components";

const UserJoin = () => {
  return (
    <>
      <GlobalStyle />
      <TopButtons />
      <JoinForm />
      <Footer />
    </>
  );
};
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fff;
  }
`;

export default UserJoin;

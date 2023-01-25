import React from "react";
import TopButtons from "../components/Common_components/TopButtons";
import LoginForm from "../components/Login_components/LoginForm";
import Footer from "../components/Common_components/Footer";
import { createGlobalStyle } from "styled-components";

const UserLogin = () => {
  return (
    <>
      <GlobalStyle />
      <TopButtons />
			<LoginForm />
      <Footer />
    </>
  );
};
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fff;
  }
`;

export default UserLogin;

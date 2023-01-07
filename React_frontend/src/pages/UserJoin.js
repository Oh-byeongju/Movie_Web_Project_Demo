import React from "react";
import TopButtons from "../components/TopButtons";
import JoinForm from "../components/Login_components/JoinForm";
import { createGlobalStyle } from "styled-components";

const UserJoin = () => {
  return (
    <>
      <GlobalStyle />
      <TopButtons />
      <JoinForm />
    </>
  );
};
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fff;
  }
`;

export default UserJoin;

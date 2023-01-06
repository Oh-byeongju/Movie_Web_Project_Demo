<<<<<<< HEAD
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
=======
import React from 'react';
import TopButtons from '../Common_components/TopButtons';
import JoinForm from '../Login_components/JoinForm';
import Footer from '../Common_components/Footer';
import { createGlobalStyle } from "styled-components";

const UserJoin = () => {
	return (
		<>
			<GlobalStyle/>
			<TopButtons/>
			<JoinForm/>
			<Footer/>
		</>
	);
>>>>>>> 18fb35950aca706e977db49650fa745abc0e31fd
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fff;
  }
`;

export default UserJoin;

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
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fff;
  }
`;

export default UserJoin;
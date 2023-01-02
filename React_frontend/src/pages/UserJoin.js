import React from 'react';
import TopButtons from '../Common_components/TopButtons';
import JoinForm from '../Login_components/JoinForm';
import { createGlobalStyle } from "styled-components";

const UserJoin = () => {
	return (
		<>
			<GlobalStyle/>
			<TopButtons/>
			<JoinForm/>
		</>
	);
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e9ecef;
  }
`;

export default UserJoin;
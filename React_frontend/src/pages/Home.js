import React from 'react';
import TopButtons from '../Common_components/TopButtons';
import {createGlobalStyle} from 'styled-components';

const Home = () => {
	return (
		<>
			<GlobalStyle/>
			<TopButtons/>
		</>
	);
};


const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
  }
`;

export default Home;
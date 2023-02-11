import React from 'react';
import styled from "styled-components";

// 다시 수정해서 사용하기
const LoginLoading = () => {
	return (
		<Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
    </Background>
	);
};

export default LoginLoading;

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 525px;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;
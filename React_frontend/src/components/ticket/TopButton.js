import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import {} from "../../reducer/ticket";
const TopButton = ({}) => {
  const dispatch = useDispatch();
  const { LOGIN_data } = useSelector((state) => state.R_user_login);
  const onLogout = useCallback(() => {
    if (!window.confirm("예매 페이지를 초기화합니다.")) {
      return;
    }

    window.location.replace("/reserve");
  }, [window]);
  return (
    <Nav>
      <Right>
        <Schedule>
          <span style={{ display: "none" }}>상영 시간표</span>
        </Schedule>
        <Rereserve
          onClick={() => {
            onLogout();
          }}
        >
          <span style={{ display: "none" }}>예매 다시하기</span>
        </Rereserve>
      </Right>
    </Nav>
  );
};

export default TopButton;

const Nav = styled.div`
  position: relative;
  width: 996px;
  height: 74px;
  display: block;
`;

const Right = styled.span`
  position: relative;
  left: 1000px;
  top: 30px;
`;

const Schedule = styled.a`
  position: relative;
  cursor: pointer;
  display: block;
  float: left;
  margin-left: 5px;
  width: 81px;
  height: 30px;
  overflow: hidden;
  background-image: url(http://img.cgv.co.kr/CGV_RIA/Ticket/image/reservation/top_buttons.png);
  background-repeat: no-repeat;
  background-position: 0 -90px;
  width: 101px;
`;
const Rereserve = styled.a`
  position: relative;
  display: block;
  cursor: pointer;

  float: left;
  margin-left: 5px;
  width: 81px;
  height: 30px;
  overflow: hidden;
  background-image: url(http://img.cgv.co.kr/CGV_RIA/Ticket/image/reservation/top_buttons.png);
  background-repeat: no-repeat;
  background-position: 0 -120px;
  width: 130px;
`;

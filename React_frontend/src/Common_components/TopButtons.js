import React, { useState } from "react";
import styled from "styled-components";
import {
  MenuOutlined,
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LoginModal from "../Login_components/LoginModal";

const TopButtons = () => {
  // 로그인 시 뜨는 모달창 on/off용 변수 및 함수
  const [login, setlogin] = useState(false);
  const toggle_login = () => setlogin(true);

  return (
    <>
      <div>
        {/* login변수와 Login모달창을 앤드로 묶어서 상태관리 */}
        {login && <LoginModal setlogin={setlogin} />}
      </div>
      <NavBar>
        <div className="nav">
          <div className="Top_left">
            <a href="./">VIP LOUNGE</a>
            <a href="./">멤버쉽</a>
            <a href="./">고객센터</a>
          </div>
          <div className="Top_right">
            <button onClick={toggle_login}>로그인</button>
            <a href="./">회원가입</a>
          </div>
          <h2 className="logo">
            <a href="./"></a>
          </h2>
          <div className="LeftIcon">
            <Button style={{ marginRight: "5px" }}>
              <MenuOutlined
                style={{
                  fontSize: "25px",
                  marginRight: "15px",
                  color: "white",
                }}
              />
            </Button>
            <Button>
              <SearchOutlined style={{ fontSize: "25px", color: "white" }} />
            </Button>
          </div>
          <div className="Menu">
            <ul className="MenuList">
              <li className="topMenuLi">
                <a href="./">영화</a>
              </li>
              <li className="topMenuLi">
                <a href="./">예매</a>
              </li>
              <li className="topMenuLi">
                <a href="./">극장</a>
              </li>
              <li className="topMenuLi">
                <a href="./">이벤트</a>
              </li>
              <li className="topMenuLi">
                <a href="./">혜택</a>
                <div className="Black_SubMenu"></div>
              </li>
              <li className="topMenuLi">
                <a href="./">개발진</a>
              </li>
              <div className="menu_pan">
                <div className="w_1350">
                  <div className="menu_category">
                    <div className="category">영화</div>
                    <div className="category">전체영화</div>
                    <div className="category">큐레이션</div>
                    <div className="category">무비포스트</div>
                  </div>
                  <div className="menu_category">
                    <div className="category">예매</div>
                    <div className="category">빠른예매</div>
                    <div className="category">상영시간표</div>
                  </div>
                  <div className="menu_category">
                    <div className="category">극장</div>
                    <div className="category">전체극장</div>
                    <div className="category">특별관</div>
                  </div>
                  <div className="menu_category">
                    <div className="category">이벤트</div>
                    <div className="category">전체극장</div>
                    <div className="category">특별관</div>
                  </div>
                  <div className="menu_category">
                    <div className="category">혜택</div>
                    <div className="category">맴버쉽</div>
                    <div className="category">제휴할인</div>
                  </div>
                  <div className="menu_category">
                    <div className="category">개발진</div>
                    <div className="category">개발진</div>
                  </div>
                </div>
              </div>
            </ul>
          </div>

          <div className="RightIcon">
            <Button style={{ marginRight: "5px" }}>
              <CalendarOutlined
                style={{
                  fontSize: "25px",
                  marginRight: "15px",
                  color: "white",
                }}
              />
            </Button>
            <Button>
              <UserOutlined style={{ fontSize: "25px", color: "white" }} />
            </Button>
          </div>
        </div>
      </NavBar>
    </>
  );
};

const NavBar = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  color: white;
  text-align: center;
  justify-content: center;
  height: 92px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background-color: black;
  z-index: 2;
  .logo {
    position: absolute;
    left: 51.5%;
    width: 75px;
    height: 90px;
    margin: 0 0 0 -70px;
    padding: 0;
    background: url(/img/logo_black.jpg);
    background-size: cover;
    a {
      display: block;
      width: 75px;
      height: 90px;
      margin: 0;
      padding: 0;
      font-size: 0;
      line-height: 0;
    }
    // 로고 누르면 홈으로 돌아가게끔 설정, 로고 이미지는 img 안에 있음
  }

  .nav {
    position: absolute;
    background-color: black;
    width: 1150px;
  }

  .Top_left {
    position: absolute;
    top: 15px;
    left: 0;
    font-size: 0.8667em;
    font-family: NanumBarunGothic, Dotum, "돋움", sans-serif;

    a {
      color: #888;
      float: left;
      margin-right: 20px;
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }
  }

  .Top_right {
    position: absolute;
    top: 15px;
    right: 0;
    font-size: 0.8667em !important;
    font-family: NanumBarunGothic, Dotum, "돋움", sans-serif !important;

    a {
      margin-top: 1.3px;
      color: #888;
      float: left;
      margin-right: 20px;
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }

    button {
      color: #888;
      float: left;
      margin-right: 20px;
      text-decoration: none;
      background-color: black;
      padding: 0;
      border: 0;
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
    }
  }

  .LeftIcon {
    display: flex;
    position: absolute;
    top: 50px;
    width: 36px;
    margin-left: 10px;
  }

  .RightIcon {
    display: flex;
    position: absolute;
    top: 50px;
    width: 36px;
    right: 50px;
  }

  .Menu {
    position: relative;
    width: 100%;
    margin: 90px auto 0 auto;
    .MenuList {
      position: relative;
      top: -40px;
      .topMenuLi:hover ~ .menu_pan {
        display: block;
      }

      .menu_pan {
        width: 1485px;
        position: absolute;
        left: -260px;
        top: 40px;
        z-index: 1000;

        padding-left: 180px;
        font-size: 15px;
        display: none;
        background-color: black;

        &:hover {
          display: block;
        }
      }

      .menu_category {
        float: left;
        margin: 30px 0;

        transition: 0.2s ease-in-out;
        transform: translateY (-20px);
      }

      .menu_category .category {
        transition: 0.2s ease-in-out;
        transform: translateY (-20px);
      }
      .menu_category:nth-child(1) {
        position: relative;
        left: 150px;
      }

      .menu_category:nth-child(2) {
        position: relative;
        left: 170px;
      }

      .menu_category:nth-child(3) {
        position: relative;
        left: 190px;
      }

      .menu_category:nth-child(4) {
        position: relative;
        left: 210px;
      }

      .menu_category:nth-child(5) {
        position: relative;
        left: 230px;
      }

      .menu_category:nth-child(6) {
        position: relative;
        left: 250px;
      }
      .caterogy:nth-child(1) {
        font-weight: bold;
      }

      .category {
        padding: 9px 0px;
        margin-right: 100px;
      }

      .category:hover {
        text-decoration: underline;
      }
      li {
        list-style-type: none;
        width: 110px;
        position: absolute;
        height: 45px;
      }
      li:nth-child(1) {
        left: 176px;
      }
      li:nth-child(2) {
        left: 266px;
      }
      li:nth-child(3) {
        left: 356px;
      }
      li:nth-child(4) {
        left: 710px;
      }
      li:nth-child(5) {
        left: 820px;
      }
      li:nth-child(6) {
        left: 930px;
      }
      a {
        text-decoration: none;
        color: white;
      }
    }
  }

  // 서브 메뉴가 길경우 사용하면 됨
  // ex) 이벤트의 하위 메뉴는 6글자, 5글자라서 이 클래스이름 사용
`;

const Button = styled.button`
  content: "";
  cursor: pointer;
  background-color: black;
  padding: 0;
  margin: 0;
  border: 0;
`;

export default TopButtons;

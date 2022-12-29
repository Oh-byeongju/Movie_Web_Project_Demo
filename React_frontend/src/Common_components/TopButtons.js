import React from 'react';
import styled from "styled-components";
import {
  MenuOutlined,
  SearchOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";

const TopButtons = () => {
	return (
  <>
		<NavBar>
			<div className="nav">
				<div className="Top_left">
					<a href="./">VIP LOUNGE</a>
					<a href="./">멤버쉽</a>
					<a href="./">고객센터</a>
				</div>
				<div className="Top_right">
					<a href="./">로그인</a>
					<a href="./">회원가입</a>
				</div>
				<h2 className="logo">
					<a href="./">
					</a>
				</h2>

				<div className="LeftIcon">
					<MenuOutlined style={{ fontSize: "25px", marginRight: "15px" }} />
					<SearchOutlined style={{ fontSize: "25px" }} />
				</div>
				<div className="Menu">
					<ul className="MenuList">
						<li className="topMenuLi">
							<a href="./">영화</a>
								<ul class="submenu">
									<li>
										<a href="./" className="submenuLink longLink">
											전체영화
										</a>
									</li>
									<li>
										<a href="./" className="submenuLink longLink">
											큐레이션
										</a>
									</li>
									<li>
										<a href="./" className="submenuLink longLink">
											포스터
										</a>
									</li>
								</ul>
							</li>
							<li className="topMenuLi">
								<a href="./">
									예매
								</a>
								<ul class="submenu">
									<li>
										<a href="./" className="submenuLink longLink">
											영화예매
										</a>
									</li>
									<li>
										<a href="./" className="submenuLink longLink">
											상영시간
										</a>
									</li>
									<li>
										<a href="./" className="submenuLink longLink">
											3
										</a>
									</li>
								</ul>
							</li>
							<li className="topMenuLi">
								<a href="./">극장</a>
							</li>
							<li className="topMenuLi">
								<a href="./">이벤트</a>
							</li>
							<li className="topMenuLi">
								<a href="./">스토어</a>
							</li>
							<li className="topMenuLi">
								<a href="./">혜택</a>
							</li>
						</ul>
					</div>
					<div className="RightIcon">
						<CalendarOutlined
							style={{ fontSize: "25px", marginRight: "15px" }}
						/>
						<UserOutlined style={{ fontSize: "25px" }} />
					</div>
				</div>
			</NavBar>
    </>
	)
};

const NavBar = styled.div`
position: relative;
display: flex;
width: 100%;
color: white;
text-align: center;
justify-content: center;
height: 92px;
border-bottom: 1px solid rgba(255,255,255, .2);

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

	a {
		color: #888;
		float: left;
		margin-right: 20px;
		text-decoration: none;
		:hover{
 			text-decoration : underline;
		}
	}
}

.Top_right {
	position: absolute;
	top: 15px;
	right: 0;
	font-size: 0.8667em;
	a {
		color: #888;
		float: left;
		margin-right: 20px;
		text-decoration : none;
		:hover{
 			text-decoration : underline;
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

.submenuLink {
	border: solid 1px black;
	margin-right: -1px;
	font-size: 12px;
}

.submenu {
	/* 하위 메뉴 스타일 설정 */
	position: absolute;
	height: 0px;
	overflow: hidden;
	right: -305px;
	top: 48px;
	transition: height 0.2s;
	-webkit-transition: height 0.2s;
	-moz-transition: height 0.2s;
	-o-transition: height 0.2s;
	width: 550px;
	/* [변경] 가로 드랍다운 메뉴의 넓이 */
}

.submenu li {
	display: inline-block;
	margin-right: 1px;
	/* [변경] 가로로 펼쳐지도록 설정 */
}

.topMenuLi:hover .submenu {
	/* 상위 메뉴에 마우스 모버한 경우 그 안의 하위 메뉴 스타일 설정 */

	height: 32px;
	/* [변경] 높이를 32px로 설정 */
}

.submenuLink:hover {
	/* 하위 메뉴의 a 태그의 마우스 오버 스타일 설정 */
	color: red;
	background-color: #dddddd;
}
.Menu {
	position: relative;
	width: 100%;
	margin: 90px auto 0 auto;
	.MenuList {
		position: absolute;
		top: -53px;
		li {
			list-style-type: none;
			width: 60px;
			position: absolute;
			height: 38px;
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
`;

export default TopButtons;
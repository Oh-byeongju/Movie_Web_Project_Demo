import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";

const ReserveList = () => {
	return (
		<Container>
			<InnerWraps>
				<SideBar>
					<SideTitle>
						마이페이지
					</SideTitle>
					<SideUL>
						<li>
							<Link>
								예매내역
								<span>
									<RightOutlined/>
								</span>
							</Link>
						</li>
						<li>
							<Link>
								공감영화
								<span>
									<RightOutlined/>
								</span>
							</Link>
						</li>
						<li>
							<Link>
								관람평내역
								<span>
									<RightOutlined/>
								</span>
							</Link>
						</li>
						<li>
							<Link>
								회원정보수정
								<span>
									<RightOutlined/>
								</span>
							</Link>
						</li>
					</SideUL>
				</SideBar>
				<Content>
					<ContentTitle>
						<ContentLeft>
							<h2>
								예매내역
							</h2>
							<span>
								최대 6개월까지의 예매내역이 출력됩니다.
							</span>
						</ContentLeft>
					</ContentTitle>
					<ContentLine/>
					<ContentDetails>
						{/* 여기부터 map으로 넘기면 될듯 */}
						<ContentDetail>
							<ContentDetailTop>
								<span>
									예매일시 : 2023.03.09
								</span>
								<Link>
									예매내역 상세보기
								</Link>
							</ContentDetailTop>
							<ContentDetailMiddle>
								<ContentDetailMiddleInfo>
									<Poster src={"img/ranking/1.jpg"} alt="Poster" />
								</ContentDetailMiddleInfo>
								{/* 여기서 부터 다시넣기 dt dd 얘들 */}


							</ContentDetailMiddle>
						</ContentDetail>
					</ContentDetails>
				</Content>
			</InnerWraps>
		</Container>
	);
};

const Container = styled.div`
  padding: 0;
  width: 1235px;
  margin : 0 auto;
  box-sizing: border-box; 
  margin-bottom: 0;
`;

const InnerWraps = styled.div`
	display: flex;
	width: 1050px;
	padding: 50px 0px 80px;
	margin: 0px auto;
	flex-direction: row;
	-webkit-box-pack: justify;
	justify-content: space-between;
`;

const SideBar = styled.div`
	width: 200px;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
`;

const SideTitle = styled.div`
	padding: 5px 0px 35px 1px;
	font-weight: 500;
	font-size: 28px;
	line-height: 35px;
	color: rgb(51, 51, 51);
	letter-spacing: -1px;
`;

const SideUL = styled.ul`
	margin: 0;
	padding-left: 30px;
	list-style-type: none;
	border: 1px solid rgb(242, 242, 242);

	li {
		box-sizing: border-box;
    margin: 0;
		padding: 0;
		display: list-item;

		a {
			cursor: pointer;
			border-bottom: 1px solid rgb(242, 242, 242);
			padding: 14px 20px 16px;
			display: flex;
			-webkit-box-pack: justify;
			justify-content: space-between;
			-webkit-box-align: center;
			align-items: center;
			line-height: 19px;
			letter-spacing: -0.3px;
			font-size: 14px;
			color: rgb(102, 102, 102);
		}
	}
`;

const Content = styled.div`
	width: 820px;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
`;

const ContentTitle = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	padding-bottom: 27px;
	-webkit-box-pack: justify;
	justify-content: space-between;
`;

const ContentLeft = styled.div`
	display: flex;
	flex-direction: row;
	-webkit-box-align: center;
	align-items: center;

	h2 {
		font-weight: 500;
    font-size: 24px;
    color: rgb(51, 51, 51);
    letter-spacing: -0.5px;
    line-height: 48px;
		margin: 0;
	}

	span {
		padding-left: 11px;
    font-size: 14px;
    letter-spacing: -0.3px;
    color: rgb(153, 153, 153);
    line-height: 20px;
	}
`;

const ContentLine = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	-webkit-box-align: center;
	align-items: center;
	box-sizing: border-box;
	margin: 0;
	border-bottom: 2px solid rgb(51, 51, 51);
`;

const ContentDetails = styled.div`
	padding-top: 20px;
	position: relative;
	min-height : 500px;
`;

const ContentDetail = styled.div`
	width: 100%;
	padding: 16px 20px;
	margin-bottom: 14px;
	box-sizing: border-box;
	margin: 0;
`;

const ContentDetailTop = styled.div`
	display: flex;
	padding: 8px 0px 13px;
	-webkit-box-pack: justify;
	justify-content: space-between;
	border-bottom: 1px solid rgb(221, 223, 225);
	box-sizing: border-box;
  margin: 0;

	span {
		font-size: 16px;
    font-weight: 500;
    line-height: 1.2;
    color: rgb(51, 51, 51);
	}

	a {
		align-self: center;
    padding-right: 10px;
    line-height: 1.9;
    font-size: 12px;
    color: rgb(51, 51, 51);
		cursor: pointer;
	}
`;

const ContentDetailMiddle = styled.div`
	display: flex;
	flex-direction: row;
	-webkit-box-pack: justify;
	justify-content: space-between;
	padding: 14px 0px 16px;
	box-sizing: border-box;
	margin: 0;
`;

const ContentDetailMiddleInfo = styled.div`
	display: flex;
	flex-direction: row;
	-webkit-box-align: center;
	align-items: center;
`;

const Poster = styled.img`
  width: 250px;
	height: 350px;
	margin-right: 20px;
	background-color: rgb(245, 245, 245);
`;

export default ReserveList;
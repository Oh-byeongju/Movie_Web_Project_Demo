/*
 23-03-11 마이페이지 css 구축(오병주)
*/
import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Cancle = ({ data }) => {
	return (
		<ContentDetail>
			<CancleImg src='/img/cancle.png' alt = "img"/>
			<ContentDetailTop>
				<span>
					예매취소일시 : &nbsp;{data.rdate}
				</span>
				<Link to={`/Mypage/CancleDetail/${data.rid}`}>
					취소내역 상세보기
				</Link>
			</ContentDetailTop>
			<ContentDetailMiddle>
				<ContentDetailMiddleInfos>
					<Poster src={`/${data.poster}`} alt="Poster" />
					<ContentDetailMiddleInfo>
						<dl>
							<dt>
								예매번호
							</dt>
							<dd>
								{data.rid}
							</dd>
						</dl>
						<dl>
							<dt>
								영화명
							</dt>
							<dd>
								{data.mtitle}
							</dd>
						</dl>
						<dl>
							<dt>
								관람극장
							</dt>
							<dd>
								{data.cinema}
							</dd>
						</dl>
						<dl>
							<dt>
								관람일시
							</dt>
							<dd>
								{data.watchdate}
							</dd>
						</dl>
						<dl>
							<dt>
								관람좌석
							</dt>
							<dd>
								{data.seat}
							</dd>
						</dl>
						<dl>
							<dt>
								결제금액
							</dt>
							<dd>
								{data.price}원
							</dd>
						</dl>
					</ContentDetailMiddleInfo>
				</ContentDetailMiddleInfos>
			</ContentDetailMiddle>
		</ContentDetail>
	);
};

const ContentDetail = styled.div`
	position: relative;
	width: 100%;
	padding: 16px 20px;
	margin-bottom: 14px;
	box-sizing: border-box;
	margin: 0;
	border: 1px solid rgb(221, 223, 225);
	margin-top: 20px;
`;

const CancleImg = styled.img`
	position: absolute;
	top: 58%;
	left: 54%;
	transform: translate(-54%, -58%);
	text-align: center;
	width: 260px;
  height: 132px;
  object-fit: fill;
	border: 0;
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
		text-decoration: none;
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
	opacity: 0.2;
`;

const ContentDetailMiddleInfos = styled.div`
	display: flex;
	flex-direction: row;
	-webkit-box-align: center;
	align-items: center;
`;

const Poster = styled.img`
  width: 175px;
	height: 260px;
	margin-right: 30px;
	background-color: rgb(245, 245, 245);
`;

const ContentDetailMiddleInfo = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	padding-bottom: 20px !important;
	z-index: 2;

	dl {
		display: flex;
    padding-top: 20px !important;
    flex-direction: row;
    color: rgb(0, 0, 0);
    line-height: 20px;
		margin: 0;
		padding: 0;
		box-sizing: border-box;

		dt {
			width: 50px;
			margin-right: 30px !important;
			font-size: 12px;
			color: #99a0a6;
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			margin-top: 2px;
		}

		dd {
			flex: 1 1 0%;
			font-weight: 400;
			color: #99a0a6;
			line-height: 1.36;
			display: -webkit-box;
			overflow: hidden;
			word-break: break-all;
			white-space: normal;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			letter-spacing: 1px;
		}
	}
`;

export default Cancle;
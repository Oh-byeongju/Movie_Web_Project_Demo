/*
 23-03-10 마이페이지 css 구축(오병주)
*/
import React from 'react';
import styled from 'styled-components';
import Reserve from './Reserve';
import { InfoCircleOutlined } from '@ant-design/icons';

const datas = [
	{
		rid: "1",
		mtitle: "타이타닉",
		cinema: "서울-강남점 2관",
		rdate: "2023.03.09",
		watchdate: "2023-03-10 (금) 17:00",
		seat: "A1, A2",
		price: "100",
		poster: "img/ranking/5.jpg"
	},
	{
		rid: "50",
		mtitle: "상견니",
		cinema: "서울-홍대점 7관",
		rdate: "2023.03.09",
		watchdate: "2023-03-10 (금) 17:00",
		seat: "G7, G8",
		price: "500",
		poster: "img/ranking/8.jpg"
	},
	{
		rid: "50",
		mtitle: "상견니",
		cinema: "서울-홍대점 7관",
		rdate: "2023.03.09",
		watchdate: "2023-03-10 (금) 17:00",
		seat: "G7, G8",
		price: "500",
		poster: "img/ranking/8.jpg"
	},
	{
		rid: "50",
		mtitle: "상견니",
		cinema: "서울-홍대점 7관",
		rdate: "2023.03.09",
		watchdate: "2023-03-10 (금) 17:00",
		seat: "G7, G8",
		price: "500",
		poster: "img/ranking/8.jpg"
	},
]

const ReserveList = () => {
	return (
		<Content>
			<ContentTitle>
				<ContentLeft>
					<h2>
						예매내역
					</h2>
					<span>
						최대 6개월까지의 예매 내역이 출력됩니다.
					</span>
				</ContentLeft>
			</ContentTitle>
			<ContentLine/>
			<ContentDetails>
				{datas.length !== 0 ? datas.map((data, index) => <Reserve data={data} key={index} />) : 
				<NoContent>
					<span>
						<InfoCircleOutlined/>
					</span>
						예매내역이 존재하지 않습니다.						
				</NoContent>
				}
			</ContentDetails>
		</Content>
	);
};

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
	padding-bottom: 25px;
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
		padding-left: 13px;
    font-size: 14px;
    letter-spacing: -0.3px;
    color: rgb(153, 153, 153);
    line-height: 30px;
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
	position: relative;
	min-height : 400px;
`;

const NoContent = styled.div`
	display: flex;
	flex-direction: column;
	-webkit-box-align: center;
	align-items: center;
	font-size: 18px;
	font-weight: 400;
	color: rgb(181, 181, 181);
	text-align: center;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	padding-top: 180px;

	span {
		display: block;
    margin: 0px auto 16px;
    height: 28px;
		font-size: 30px;
	}
`;

export default ReserveList;
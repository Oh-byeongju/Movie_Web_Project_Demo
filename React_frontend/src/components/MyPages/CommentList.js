/*
 23-03-11 마이페이지 css 구축(오병주)
*/
import React from 'react';
import styled from 'styled-components';
import CommentMovie from './CommentMovie';
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
]

const CommentList = () => {
	return (
		<Content>
			<ContentTitle>
				<ContentLeft>
					<h2>
						관람평 내역
					</h2>
				</ContentLeft>
			</ContentTitle>
			<ButtonList>
				<Button>
					작성 가능 영화
				</Button>
				<Button>
					작성한 관람평
				</Button>
			</ButtonList>

			{/* 여기서 버튼에 따라 랜더링 다르게 넣기  하나는 작성가능, 하나는 작성한거*/}


			<ContentDetails>
				<span className='total'>
					총 {datas.length}개
				</span>
				{datas.length !== 0 ? datas.map((data, index) => <CommentMovie data={data} key={index} />) : 
				<NoContent>
					<span className='None'>
						<InfoCircleOutlined/>
					</span>
						작성 가능한 영화가 존재하지 않습니다.						
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

const ButtonList = styled.div`
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	height: 60px;
	background-color: rgb(250, 250, 250);
`;

const Button = styled.button`
	flex: 1 1 0%;
	border: 1px solid rgb(244, 244, 244);
	font-weight: 500;
	font-size: 16px;
	line-height: 21px;
	cursor: pointer;
`;

const ContentDetails = styled.div`
	position: relative;
	min-height : 350px;
	margin-top: 65px;
	border-top: 1px solid rgb(51, 51, 51);

	.total {
		position: absolute;
    top: -8%;
    left: 0px;
    font-size: 14px;
    font-weight: 550;
    line-height: 17px;
	}
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

	.None {
    margin: 0px auto 16px;
    height: 28px;
		font-size: 30px;
	}
`;

export default CommentList;
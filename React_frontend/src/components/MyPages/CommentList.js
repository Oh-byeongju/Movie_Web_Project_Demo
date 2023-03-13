/*
 23-03-11 마이페이지 css 구축(오병주)
*/
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import CommentMovie from './CommentMovie';
import CommentReview from './CommentReview';
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
		rid: "1",
		mtitle: "타이타닉",
		cinema: "서울-강남점 2관",
		rdate: "2023.03.09",
		watchdate: "2023-03-10 (금) 17:00",
		seat: "A1, A2",
		price: "100",
		poster: "img/ranking/5.jpg"
	}
]

const datas2 = [
	{
		rid: "1",
		mtitle: "타이타닉",
		cinema: "서울-강남점 2관",
		rdate: "2023.03.09",
		watchdate: "2023-03-10 (금) 17:00",
		seat: "A1, A2",
		price: "100",
		comment: '관람평을 위한 유령 관람평(작성예시는 id : temp1, pw : temp123456 으로 진행 --> 타이타닉, 카운트, 상견니 가능)',
		poster: "img/ranking/5.jpg"
	},
	{
		rid: "1",
		mtitle: "상견니",
		cinema: "서울-강남점 2관",
		rdate: "2023.03.09",
		watchdate: "2023-03-10 (금) 17:00",
		seat: "A1, A2",
		price: "100",
		comment: '와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요! 와 재밌어요!',
		poster: "img/ranking/3.jpg"
	},
	{
		rid: "1",
		mtitle: "두다다쿵",
		cinema: "서울-강남점 2관",
		rdate: "2023.03.09",
		watchdate: "2023-03-10 (금) 17:00",
		seat: "A1, A2",
		price: "100",
		comment: '와 재밌어요!',
		poster: "img/ranking/8.jpg"
	}
	
]

const CommentList = () => {

	// 메뉴 버튼 변수
	const [possiblebutton, setpossiblebutton] = useState(true);
	const [reviewbutton, setreviewbutton] = useState(false);

	// 작성 가능 영화 버튼 누를 때
	const clickpossible = useCallback(()=> {
		
		setpossiblebutton(true);
		setreviewbutton(false);
		console.log("작성버튼");
    
	}, [])

	// 작성한 관람평 버튼 누를 때
	const clickreview = useCallback(()=> {
		
		setpossiblebutton(false);
		setreviewbutton(true);
		console.log("관람평버튼");
    
	}, [])



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
				<button className={"btn" + (possiblebutton ? " active" : "")} onClick={clickpossible}>
					작성 가능 영화
				</button>
				<button className={"btn" + (reviewbutton ? " active" : "")} onClick={clickreview}>
					작성한 관람평
				</button>
			</ButtonList>

			{/* 여기서 버튼에 따라 랜더링 다르게 넣기  하나는 작성가능, 하나는 작성한거*/}

			{possiblebutton ?  
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
			</ContentDetails>:
			 <ContentDetails>
				<span className='total'>
					총 {datas2.length}개
				</span>
				{datas2.length !== 0 ? datas2.map((data, index) => <CommentReview data={data} key={index} />) : 
				<NoContent>
					<span className='None'>
						<InfoCircleOutlined/>
					</span>
					작성한 관란평이 존재하지 않습니다.						
				</NoContent>
				}
			</ContentDetails>}



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

	.btn {
		flex: 1 1 0%;
		border: 1px solid rgb(240, 240, 240);
		font-weight: 600;
		font-size: 17px;
		line-height: 21px;
		background-color: rgb(248, 249, 251);
		cursor: pointer;

		&.active {
      background-color: #fff;
    }
	}
`;

const ContentDetails = styled.div`
	position: relative;
	min-height : 350px;
	margin-top: 65px;
	border-top: 1px solid rgb(51, 51, 51);

	.total {
		position: absolute;
    top: -32px;
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
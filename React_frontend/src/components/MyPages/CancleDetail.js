/*
 23-03-11 마이페이지 css 구축(오병주)
*/
import React from 'react';
import styled from 'styled-components';


const CancleDetail = () => {

	const datas = {
		rid: "3",
		mtitle: "두다다쿵",
		cinema: "서울-강남점 2관",
		rdate: "2023.03.09",
		watchdate: "2023-03-10 (금) 17:00",
		people: "성인 1명, 아동 1명",
		price: "100",
		poster: "img/ranking/8.jpg",
		paytype: "테스트15",
		moviestart: "2023-03-11 02:34:00",
		movieend: "2023-03-11 02:34:00"
	}

	
	

	return (
		<Content>
			<ContentTitle>
				<ContentLeft>
					<h2>
						취소내역상세
					</h2>
				</ContentLeft>
			</ContentTitle>
			<ContentDetailTop>
				<h3>
					예매번호 
					<span>
						1
					</span>
				</h3>
			</ContentDetailTop>
			<ContentLine/>
			<ContentDetails>
				<ContentDetailMiddleInfos>
				<Poster src='/img/ranking/9.jpg' alt="Poster" />
					<ContentDetailMiddleInfo>
						<dl>
							<dt>
								영화명
							</dt>
							<dd>
								두다다쿵
							</dd>
						</dl>
						<dl>
							<dt>
								관람극장
							</dt>
							<dd>
								서울-강남점 2관
							</dd>
						</dl>
						<dl>
							<dt>
								영화시작시간
							</dt>
							<dd>
								2023-01-30 10:20:00
							</dd>
						</dl>
						<dl>
							<dt>
								영화종료시간
							</dt>
							<dd>
								2023-01-30 12:00:00
							</dd>
						</dl>
						<dl>
							<dt>
								관람등급
							</dt>
							<dd>
								15세 이용가
							</dd>
						</dl>
						<dl>
							<dt>
								관람좌석
							</dt>
							<dd>
								G1, G2
							</dd>
						</dl>
						<dl>
							<dt>
								관람인원
							</dt>
							<dd>
								성인 1명, 청소년 1명
							</dd>
						</dl>
					</ContentDetailMiddleInfo>
				</ContentDetailMiddleInfos>
				<ContentTitle style={{marginTop: "25px"}}>
					<h3>
						결제정보
					</h3>
				</ContentTitle>
				<ContentList>
					<ContentListElement>
						<span className='title'>
							티켓매수
						</span>
						<span className='content'>
							2 매
						</span>
					</ContentListElement>
					<ContentListElement>
						<span className='title'>
							결제일시
						</span>
						<span className='content'>
							2023-03-10 20:27:51
						</span>
					</ContentListElement>
					<ContentListElement>
						<span className='title'>
							결제유형
						</span>
						<span className='content'>
							{datas.paytype}
						</span>
					</ContentListElement>
					<ContentListElement>
						<span className='title'>
							결제금액
						</span>
						<span className='content'>
							{datas.price}원
						</span>
					</ContentListElement>
				</ContentList>



				



				<ContentTitle>
					<h3>
						회원정보
					</h3>
				</ContentTitle>
				<ContentList>
					<ContentListElement>
						<span className='title'>
							성함
						</span>
						<span className='content'>
							오병주
						</span>
					</ContentListElement>
					<ContentListElement>
						<span className='title'>
							이메일
						</span>
						<span className='content'>
							dhqudwn0@naver.com
						</span>
					</ContentListElement>
					<ContentListElement>
						<span className='title'>
							휴대전화
						</span>
						<span className='content'>
							010-3333-2222
						</span>
					</ContentListElement>
				</ContentList>


				<ContentTitle>
					<h3>
						결제취소정보
					</h3>
				</ContentTitle>
				<ContentList>
					<ContentListElement>
						<span className='title'>
							취소일시
						</span>
						<span className='content'>
							2023-03-10 20:27:51
						</span>
					</ContentListElement>
					<ContentListElement>
						<span className='title'>
							환불유형
						</span>
						<span className='content'>
							{datas.paytype}
						</span>
					</ContentListElement>
					<ContentListElement>
						<span className='title'>
							환불금액
						</span>
						<span className='content'>
							{datas.price}원
						</span>
					</ContentListElement>
				</ContentList>





			</ContentDetails>
			<Notice>
				결제취소 후 환불은 결제취소일 기준 3일 이내에 지급됩니다.
			</Notice>
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
	padding-bottom: 20px;
	-webkit-box-pack: justify;
	justify-content: space-between;

	h3 {
		font-weight: 500;
    font-size: 20px;
    color: rgb(51, 51, 51);
    letter-spacing: -0.43px;
		margin:0;
	}
`;

const ContentDetailTop = styled.div`
	display: flex;
	padding: 0px 0px 13px;
	-webkit-box-pack: justify;
	justify-content: space-between;
	box-sizing: border-box;
  margin: 0;

	h3 {
		font-weight: 500;
    font-size: 20px;
    color: rgb(51, 51, 51);
    letter-spacing: -0.43px;
		margin:0;
		
		span {
		font-size: 20px;
    font-weight: 500;
    color: rgb(0, 0, 0);
		margin-left: 10px;
		}
	}

	a {
		align-self: center;
    padding-right: 10px;
    line-height: 1.9;
    font-size: 12px;
    color: #aaacac;
		cursor: pointer;
		text-decoration: none;
	}
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

const ContentDetailMiddleInfos = styled.div`
	display: flex;
	flex-direction: row;
	-webkit-box-align: center;
	align-items: center;
	margin-top: 10px;
`;

const Poster = styled.img`
  width: 205px;
	height: 290px;
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
			width: 80px;
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
			font-weight: 550;
			color: rgb(51, 51, 51);
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

const ContentList = styled.ul`
	list-style-type: none;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	border-top: 2px solid rgb(51, 51, 51);

	li {
    &:first-child {
      padding-top: 24px;
    }

		&:last-child {
			padding-bottom: 28px;
			margin-bottom: 40px;
			border-bottom: 1px solid rgb(221, 223, 225);
		}
	}
`;

const ContentListElement = styled.li`
	display: flex;
	-webkit-box-pack: justify;
	justify-content: space-between;
	padding-bottom: 24px !important;
	font-size: 17px;
	box-sizing: border-box;
	margin: 0;
	padding: 0;

	.title {
		flex: 1 1 0%;
    color: rgb(102, 102, 102);
	}

	.content {
		font-weight: 500;
    color: rgb(51, 51, 51);
	}
`;

const Notice = styled.span`
	display: block;
	line-height: 1.43;
	text-align: center;
	color: rgb(102, 102, 102);
`;

export default CancleDetail;
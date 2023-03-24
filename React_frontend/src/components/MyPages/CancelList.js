/*
 23-03-11 마이페이지 css 구축(오병주)
 23-03-24 사용자가 예매취소한 영화 내역 조회 구현(오병주)
*/
import React, { useEffect }  from 'react';
import styled from 'styled-components';
import Cancel from './Cancel';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { USER_RESERVE_CANCEL_SEARCH_REQUEST } from '../../reducer/R_mypage_reserve';

const CancelList = () => {
	const dispatch = useDispatch();

	// 리덕스에 있는 예매 취소내역 상태
	const { RESERVE_CANCEL_SEARCH } = useSelector((state) => state.R_mypage_reserve);

	// 예매 취소내역 조회 useEffect
	useEffect(()=> {
		dispatch({
      type: USER_RESERVE_CANCEL_SEARCH_REQUEST
    });
	}, [dispatch])

	return (
		<Content>
			<ContentTitle>
				<ContentLeft>
					<h2>
						예매 취소내역
					</h2>
					<span>
						최대 6개월까지의 예매취소내역이 출력됩니다.
					</span>
				</ContentLeft>
			</ContentTitle>
			<ContentLine/>
			<ContentDetails>
				{RESERVE_CANCEL_SEARCH.length !== 0 ? RESERVE_CANCEL_SEARCH.map((reserve, index) => <Cancel reserve={reserve} key={index} />) : 
				<NoContent>
					<span>
						<InfoCircleOutlined/>
					</span>
						예매 취소내역이 존재하지 않습니다.						
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

export default CancelList;
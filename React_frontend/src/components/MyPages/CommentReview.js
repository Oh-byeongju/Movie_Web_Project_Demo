/*
 23-03-12 마이페이지 css 구축(오병주)
*/
import React, { useState } from 'react';
import styled from 'styled-components';
import { Rate } from 'antd';
import { SmileFilled, MehFilled, FrownFilled, DeleteOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';

const CommentReview = () => {

	// 사용자가 보이는 like UI 변경을 위한 변수
  const [like, setlike] = useState(false);
  const [likes, setlikes] = useState(7);

	const comment = {
		umscore: 9,
		uid: '오늘 밤, 세계에서 이 사랑이 사라진다 해도',
		umcommenttime: '2023-03-12 08:11:21',
		umcomment: '관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평',
	};

	const LOGIN_data = {
		uid: 'temp1'
	};

	return (
		<>

		<CommentElement>
			<span className='img'>
				{comment.umscore > 6 ? <SmileFilled style={{fontSize: "40px", color: "#4a4321"}}/> 
				: comment.umscore > 3 ? <MehFilled style={{fontSize: "40px", color: "#4a4321"}} /> : <FrownFilled style={{fontSize: "40px", color: "#4a4321"}}/>}
			</span>
			<div className='top'>
				<span className='name'>
					{comment.uid}
				</span>
				<span className='score'>
					<RateCustom allowHalf value={comment.umscore/2}/> 
					<span className='score_num'>
						{comment.umscore}
					</span>
				</span>
				<span className='date'>
					{comment.umcommenttime}
				</span>
			</div>
			<div className='middle'>
				{comment.umcomment}
			</div>
			<div className='bottom'>
				{/* 공백을 넣어줘서 간격을 벌림 */}
				<span>
					&nbsp;
				</span>
				<ButtonCustom style={{paddingLeft: "1px"}} >
					<span className='cnt'>
						{likes}
					</span>
					{like ? <LikeFilled style={{color: "#e61919"}}/> : <LikeOutlined/>}
				</ButtonCustom>			
				{comment.uid === LOGIN_data.uid && <ButtonCustom style={{marginLeft: "2px"}}>
					<DeleteOutlined/>
				</ButtonCustom>}
			</div>
		</CommentElement>
		</>
	);
};

const CommentElement = styled.div`
	position: relative;
	padding: 22px 0 17px 68px;
	border-bottom: 1px solid #eee;

	.img {
		display: block;
    position: absolute;
    top: 25px;
    left: 10px;
    width: 42px;
    height: 42px;
	}

	.top {
		position: relative;
    margin-bottom: 10px;

		.name {
			display: block;
			font-size: 14px;
			margin-bottom: 1px;
			font-weight: 600;
		}

		.score {
			position: relative;
			font-size: 14px;
    	margin-right: 11px;

			.score_num {
				margin-left: 5px;
				font-weight: 600;
				vertical-align: bottom;
			}
		}

		.date {
			position: absolute;
			top: 0;
			right: 10px;
			font-family: "Roboto";
			font-size: 14px;
			color: #999;
		}
	}

	.middle {
		margin-bottom: 0;
    line-height: 20px;
		font-size: 13px;
	}

	.bottom {
		margin-top: 12px;
		margin-bottom: 0;
    line-height: 20px;
    font-size: 13px;

		.cnt {
			float: right;
			vertical-align: top;
			line-height: 16px;
			margin-left: 8px;
		}
	}
`;

const RateCustom = styled(Rate)`
	pointer-events: none;
	color: #fea408;
	font-size: 16px;

	.ant-rate-star{
		margin-inline-end: 2px !important;
	}
`;

const ButtonCustom = styled.button`
	float: right;
  content: "";
  cursor: pointer;
  background-color: white;
  border: 0;
	padding: 0;
	margin-right: 12px;
`;

export default CommentReview;
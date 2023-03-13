/*
 23-03-12 마이페이지 css 구축(오병주)
*/
import React from 'react';
import styled from 'styled-components';
import { Rate } from 'antd';
import { DeleteOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';

const CommentReview = ({ data }) => {


	const comment = {
		umscore: 9,
		uid: 'temp1',
		umcommenttime: '2023-03-12 08:11:21',
		umcomment: ' 람평을 관람평 관람평을 관람평 관람평을 관람평관람평람평을 관람평 관람평을 관람평 관람평을 관람평 관람asdasda평을 관람평 관람평을 관람평 관람평을 관람평 관람평을 관람평',
	};

	const LOGIN_data = {
		uid: 'temp1'
	};

	return (
		<>

		<CommentElement>
			<div className='img'>
				<Poster src={`/${data.poster}`} alt="Poster">

				</Poster>
			</div>
			<div className='top'>
				<span className='name'>
					영화 : {data.mtitle}
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
				{data.comment}
			</div>
			<div className='bottom'>
				{/* 공백을 넣어줘서 간격을 벌림 */}
				<span>
					&nbsp;
				</span>
				<ButtonCustom style={{paddingLeft: "1px"}} >
					<span className='cnt'>
						7
					</span>
					{false ? <LikeFilled style={{color: "#e61919"}}/> : <LikeOutlined/>}
				</ButtonCustom>			
				{comment.uid === LOGIN_data.uid && <ButtonCustom style={{marginLeft: "2px"}}>
					<DeleteOutlined/>
				</ButtonCustom>}
			</div>
		</CommentElement>
		</>
	);
};


const Poster = styled.img`
  display: block;
  width: 91px;
  height: 150px;
`;




const CommentElement = styled.div`
	position: relative;
	padding: 15px 0 14px 110px;
	border-bottom: 1px solid #eee;
	min-height: 143px;

	.img {
		display: block;
    position: absolute;
    top: 11px;
    left: 0px;
    width: 91px;
    height: 150px;
	}

	.top {
		position: relative;
    margin-bottom: 10px;

		.name {
			display: block;
			font-size: 15px;
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
		font-size: 14px;
		letter-spacing: 0.4px;
		word-spacing: 1.3px;
	}

	.bottom {
		position: absolute;
		right: 0;
		bottom: 8px;

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
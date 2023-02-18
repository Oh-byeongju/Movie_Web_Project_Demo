/*
	23-02-18 영화 상세정보 댓글창 분리(오병주)
*/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Rate } from 'antd';
import { SmileFilled, MehFilled, FrownFilled, DeleteOutlined, LikeOutlined  } from '@ant-design/icons';

const DetailComment = ({ data }) => {

	// 사용자가 보이는 like UI 변경을 위한 변수
  const [like, setlike] = useState(false);
  const [likes, setlikes] = useState(7);

	// like true 색깔 먹이기

  // useEffect(() => {
  //   setlike(movie.like);
  //   setlikes(movie.likes);
  // }, [movie]);

	return (
		<>
			{data ? <CommentElement>
				<span className='img'>
					{data.score > 6 ? <SmileFilled style={{fontSize: "40px", color: "#4a4321"}}/> 
					: data.score > 3 ? <MehFilled style={{fontSize: "40px", color: "#4a4321"}} /> : <FrownFilled style={{fontSize: "40px", color: "#4a4321"}}/>}
				</span>
				<div className='top'>
					<span className='name'>
						{data.id}
					</span>
					<span className='score'>
						<RateCustom allowHalf value={data.score/2}/> 
						<span className='score_num'>
							{data.score}
						</span>
					</span>
					<span className='date'>
						{data.date}
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
					<span className='cnt'>
						{data.up_cnt}
					</span>
					<ButtonCustom style={{paddingLeft: "2px"}}>
						<LikeOutlined/>
					</ButtonCustom>			
					{data.id === 'temp2' && <ButtonCustom>
						<DeleteOutlined/>
					</ButtonCustom>}
				</div>
			</CommentElement> : <NoElement>작성된 관람평이 없습니다.</NoElement>}
		</>
	);
};

export default DetailComment;

const NoElement = styled.li`
	position: relative;
	border-top: 1px solid #eee;
	list-style: none;
	padding: 140px 0;
	text-align: center;
	font-size: 15px;
`;

const CommentElement = styled.li`
	position: relative;
	padding: 20px 0 17px 68px;
	border-top: 1px solid #eee;
	list-style: none;

	.img {
		display: block;
    position: absolute;
    top: 22px;
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
			padding-right: 7px;
			vertical-align: top;
			line-height: 14px;
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
	margin-right: 3px;
`;
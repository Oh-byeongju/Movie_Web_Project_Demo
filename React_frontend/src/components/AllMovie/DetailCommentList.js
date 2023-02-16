import React, { useState } from 'react';
import styled from 'styled-components';
import { Rate } from 'antd';
import { StarFilled, SmileFilled, MehFilled, FrownFilled, DeleteOutlined, LikeOutlined } from "@ant-design/icons";

const DetailCommentList = () => {

	const [data, setdata] = useState({
		id: 'temp1',
		comment: '너무 재밌네요 너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요',
		date: '2023-02-16',
		score: '0',
		up_cnt: '7',
	});

	console.log(data.id)

	return (
		<Layout>
			<CommentSection>
				<h4>
					평점 및 관람평
				</h4>
				<CommentHeader>
					<div className='StarCheck'>
						<span>
							<StarFilled style={{color:"#fea408"}}/> 관람평점
						</span>
					</div>
					<div>
						<span>
							관람평 178개
						</span>
						<button>
							최신순
						</button>
						<button>
							추천순
						</button>
					</div>
				</CommentHeader>
				<CommentList>
					<CommentElement>
						<span className='img'>
							{data.up_cnt > 6 ? <SmileFilled style={{fontSize: "40px", color: "#4a4321"}}/> 
							: data.up_cnt > 3 ? <MehFilled style={{fontSize: "40px", color: "#4a4321"}} /> : <FrownFilled style={{fontSize: "40px", color: "#4a4321"}}/>}
						</span>
						<div className='top'>
							<span className='name'>
								{data.id}
							</span>
							<span className='score'>
								<RateCustom allowHalf value={data.up_cnt/2}/> 
								<span>
									{data.up_cnt}
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
							<span>
								&nbsp;
							</span>
							
							<span className='cnt'>
								{data.up_cnt}
							</span>
							<ButtonCustom>
								<LikeOutlined/>
							</ButtonCustom>
							
							<ButtonCustom>
								<DeleteOutlined/>
							</ButtonCustom>
							

						</div>

					</CommentElement>
					<CommentElement>
						2
					</CommentElement>
					<CommentElement>
						3
					</CommentElement>
				</CommentList>
			</CommentSection>
			
		</Layout>
	);
};

export default DetailCommentList;

const Layout = styled.div`
	overflow: hidden;
	position: relative;
	width: 100%;
	margin: 0;
	padding: 0;
	border: 0;
	vertical-align: baseline;
	word-break: break-all;
	margin-top: 20px;
`;

const CommentSection = styled.div`
	background: #f8f8f8;
	margin: 0 auto;
	width: 1050px;
	margin-top: 8px;
	background-color: #fff;
	box-shadow: 0 1px 3px 0 rgb(0 0 0 / 15%);

	h4 {
		padding-top: 18px;
    font-size: 20px;
    text-align: center;
		margin: 0;
	}
`;

const CommentHeader = styled.div`
	position: relative;
	padding: 16px;
	display: flex;
	justify-content: space-between;
`;

const CommentList = styled.ul`
	padding: 25px;
	background: #f8f8f8;
	margin: 0 auto;
	margin-bottom: 8px;
	background-color: #fff;
	box-shadow: 0 1px 3px 0 rgb(0 0 0 / 15%);
`;

const CommentElement = styled.li`
	position: relative;
	padding: 20px 0 15px 68px;
	border-top: 1px solid #eee;
	list-style: none;

	.img {
		display: block;
    position: absolute;
    top: 20px;
    left: 10px;
    width: 42px;
    height: 42px;
	}

	.top {
		position: relative;
    margin-bottom: 6px;

		.name {
			display: block;
			font-size: 14px;
			padding-bottom: 1px;
		}

		.score {
			position: relative;
			font-size: 14px;
    	margin-right: 11px;
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
		margin-top: 8px;
		margin-bottom: 0;
    line-height: 20px;
    font-size: 13px;

		.cnt {
			float: right;
			padding-right: 7px;
			vertical-align: top;
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
	margin-right: 5px;
`;
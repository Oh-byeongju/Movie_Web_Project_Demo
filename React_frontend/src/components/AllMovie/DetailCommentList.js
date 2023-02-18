/*
  23-02-16 영화 상세정보 댓글창 구현(오병주)
	23-02-18 영화 상세정보 댓글창 분리(오병주)
*/
import React, { useState } from 'react';
import styled from 'styled-components';
import { StarFilled, UnorderedListOutlined, LikeOutlined } from "@ant-design/icons";
import DetailComment from './DetailComment';
import { useCallback } from 'react';

const DetailCommentList = () => {

	// const datas = ['']
	const datas = [
		{
			id: 'temp1',
			comment: '너무 재밌네요 너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요',
			date: '2023-02-16',
			score: '7',
			up_cnt: '7',
		},
		{
			id: 'temp2',
			comment: '너무 재밌네요 너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요',
			date: '2023-02-16',
			score: '3',
			up_cnt: '5',
		},
		{
			id: 'temp3',
			comment: '너무 재밌네요 너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌123123123네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요너무 재밌네요',
			date: '2023-02-16',
			score: '5',
			up_cnt: '1',
		}
	];

	// 관람평 더보기 limit 이거 조금 더 고민해보기
	const [limit, setlimit] = useState(6); 
	const L = 8;

	// 정렬 버튼 css 변수
	const [newbutton, setnewbutton] = useState(true);
	const [likebutton, setlikebutton] = useState(false);

	const clicknew = useCallback(()=> {
		setnewbutton(true);
		setlikebutton(false);
	}, [])

	const clicklike = useCallback(()=> {
		setlikebutton(true);
		setnewbutton(false);
	}, [])

	return (
		<Layout>
			<CommentSection>
				<h4>
					평점 및 관람평
				</h4>
				<CommentHeader>
					<div className='StarCheck'>
						<span>
							<StarFilled style={{color:"#fea408"}}/> &nbsp;관람객 평점
						</span>
					</div>
					<div className='right'>
						<span className='cnt_num'>
							관람평
							<strong> 178</strong>
							개
						</span>
						<ButtonList>
							<ButtonWrap>
								<button className={"btn" + (newbutton ? " active" : "")} onClick={clicknew}>
									<UnorderedListOutlined/> 최신순
								</button>
							</ButtonWrap>
							<ButtonWrap>
								<button style={{marginLeft: "7px"}} className={"btn" + (likebutton ? " active" : "")} onClick={clicklike}>
									<LikeOutlined/> 공감순
								</button>
							</ButtonWrap>
						</ButtonList>
					</div>
				</CommentHeader>
				<CommentList>
					{datas.map((data, index) => (
    				<DetailComment data={data} key={index} />
  				))}
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
	box-shadow: 0px 1px 4px 0px rgb(0 0 0 / 15%);

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

	.StarCheck {
		color: #999;
		font-size: 14px;
		margin-left: 14px;
		padding-top: 5px;
	}

	.right {
		display: flex;
    align-items: center;
    margin-left: auto;

		.cnt_num {
			font-size: 14px;
		}
	}
`;

const ButtonList = styled.ul`
	position: relative;
	margin-left: 5px !important;
	list-style: none;
	margin: 0;
	padding: 0;
	margin-right: 11px;
	margin-top: 1px;

	::before{
		content: '';
    display: block;
    position: absolute;
    left: 5px;
    top: 2px;
    width: 1px;
    height: 16px;
    background-color: #ccc;
	}

	li:first-child {
		margin-left: 15px;
	}

`;

const ButtonWrap = styled.li`
	margin-left: 10px;
	list-style: none;
	display: list-item;
	float: left;

	.btn {
		content: "";
		cursor: pointer;
		background-color: white;
		display: block;
		position: relative;
		color: #999;
		font-size: 14px;
		border: 0;
		padding: 0;

		&.active {
      color: #000;
    }
	}
`;

const CommentList = styled.ul`
	padding: 0px 25px 0px 25px;
	background: #f8f8f8;
	margin: 0 auto;
	margin-bottom: 8px;
	background-color: #fff;

	li:first-child {
		border-color: #ccc;
	}
`;
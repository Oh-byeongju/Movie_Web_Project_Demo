import React from 'react';
import styled from 'styled-components';
import { StarFilled } from "@ant-design/icons";

const DetailCommentList = () => {
	return (
		<Layout>
			<CommentSection>
				<CommentHeader>
					<div className='StarCheck'>
						<span>
							<StarFilled style={{color:"#fea408"}}/> 관람평점
						</span>
					</div>
					<div>
						<span>
							총 댓글수
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
					여기서 더 내려가야함ㅌ 위에 패딩은 없애야할듯
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
	margin-top: 50px;
`;

const CommentSection = styled.div`
	padding: 25px;
	background: #f8f8f8;
	margin: 0 auto;
	width: 1000px;
	margin-top: 8px;
	margin-bottom: 8px;
	background-color: #fff;
	box-shadow: 0 1px 3px 0 rgb(0 0 0 / 15%);
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
	margin-top: 8px;
	margin-bottom: 8px;
	background-color: #fff;
	box-shadow: 0 1px 3px 0 rgb(0 0 0 / 15%);
`
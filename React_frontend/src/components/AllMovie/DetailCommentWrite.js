/*
 23-02-12 유저 관람평 작성 구현(오병주)
*/
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const DetailCommentWrite = () => {

	// 별점 표시를 위한 배열
	const [value, setValue] = useState(5);
	const desc = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

	// textarea 내용 변수
	const [comment, setcomment] = useState("");
	const handleCommentChange = e => {
    setcomment(e.target.value);
		console.log(comment);
  };

	// 로그인 상태확인용 리덕스 상태
  const dispatch = useDispatch();
  const { LOGIN_data } = useSelector((state) => state.R_user_login);

	// 관람평 작성 버튼을 누르면 실행되는 함수
	const onSubmit = useCallback(() => {

		// 로그인 상태 확인
		if (LOGIN_data.uid === 'No_login') {
      alert("로그인이 필요한 서비스입니다.")
      return;
    }

		// 관람평이 빈칸인지 확인
		if (comment === '') {
			alert("관람평을 작성해 주세요!")
			return;
		}


		console.log(comment);
		console.log(value * 2);


	},[LOGIN_data.uid, comment, value])

	return (
		<Layout>
			<Form>
				<StarForm>
					<h4 style={{paddingTop: "8px"}}>
						평점 및 관람평 작성
					</h4>
					<RateLine>
						<Rate allowHalf onChange={setValue} value={value} style={{fontSize: "50px"}}/>
						{value ? <span className="rate-text">{desc[(value * 2) - 1]}</span> : ''}
					</RateLine>
				</StarForm>
				<ReviewBox>
					<TextBox>
						<textarea placeholder='로그인 한 회원분들 중에서 예매하신 영화가 끝난 이후 평점 및 관람평을 작성하실 수 있습니다.' 
						spellCheck={false} maxLength="149" value={comment} onChange={handleCommentChange}>
						</textarea>
						<span className='text_info'>
							<strong style={{marginRight: "2px"}}>
								{comment.length}
							</strong>
							/
							<em>
								150
							</em>
						</span>
					</TextBox>
					<ReviewSubmit onClick={onSubmit}>
						관람평 작성
					</ReviewSubmit>
				</ReviewBox>		
			</Form>
		</Layout>
	)
};

export default DetailCommentWrite;

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

const Form = styled.div`
	padding: 15px 35px 15px 35px;
	background: #f8f8f8;
	margin: 0 auto;
	width: 980px;
`;

const StarForm = styled.div`
	display: block;
	h4{
    font-size: 20px;
    text-align: center;
		margin:0;
	}
`;

const RateLine = styled.div`
	margin-right: 35px;
	position: relative;
	text-align: center;
	
	.rate-text{
		position: absolute;
		display: inline-block;
		line-height: normal;
		font-size: 40px;
  	padding: 13px;
	}
`;

const ReviewBox = styled.div`
	margin-left: 38px;
	margin-top: 25px;
	height: 100px;
	margin-bottom: 20px;
	box-sizing: border-box;
`;

const TextBox = styled.div`
	width: 799px;
	background: #fff;
	border: 1px solid #ccc;
	float: left;
	height: 100px;

	textarea {
		height: 78px;
    border: none !important;
		width: 100%;
    line-height: 1.5;
    box-sizing: border-box;
    padding: 13px 18px;
    border: 1px solid #DDD;
    resize: none;
    font-size: 14px;
		font-family: 'Raleway', sans-serif;
		font-weight: 700;
		color: #000;
		:focus {
  		outline: none;
		}
	}

	.text_info {
		display: block;
    margin: 0 10px 10px 0;
    text-align: right;
    color: #666;
		font-size: 12px;
	}
`;

const ReviewSubmit = styled.button`
	background: #414141;
	float: left;
	width: 115px;
	height: 103px;
	border: none;
	margin: -1px -1px 0 0;
	padding: 0;
	color: #fff;
	font-size: 15px;
	cursor: pointer;
`;
/*
 23-03-12 마이페이지 css 구축(오병주)
 23-03-18 영화 상세정보 관람평 백엔드 연결(오병주)
*/
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Rate } from 'antd';
import { DeleteOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { USER_COMMENT_LIKE_REQUEST, USER_COMMENT_DELETE_REQUEST } from '../../reducer/R_user_movie';

const CommentReview = ({ comment }) => {
	const dispatch = useDispatch();
	const location = useLocation();

	// 사용자가 보이는 like UI 변경을 위한 변수
  const [like, setlike] = useState(false);
  const [likes, setlikes] = useState(0);

  useEffect(() => {
    setlike(comment.like);
    setlikes(comment.upcnt);
  }, [comment]);

	// 사용자가 관람평의 좋아요를 누를 때 호출되는 함수
  const LikeChange = useCallback(() => {

    dispatch({
      type: USER_COMMENT_LIKE_REQUEST,
      data: {
        umid: comment.umid,
        like: like
      },
    });

    // 백엔드를 한번 더 호출하지 않고 like와 likes의 변수만 변경하여 사용자가 보고 있는 브라우저 UI를 변경
    if (like) {
      setlike(false);
      setlikes(likes - 1);
    } else {
      setlike(true);
      setlikes(likes + 1);
    }
  }, [comment.umid, like, likes, dispatch]);

	// 관람평 삭제 버튼 누르면 실행되는 함수
	const CommentDelete = useCallback(() => {
		if (!window.confirm("관람평을 삭제하시겠습니까?")) {
      return;
    };

		dispatch({
      type: USER_COMMENT_DELETE_REQUEST,
			data: comment.umid
    });
		
		window.location.replace(location.pathname);
	}, [dispatch, comment.umid, location.pathname]);

	return (
		<>
		<CommentElement>
			<div className='img'>
				<Poster src={`/${comment.mimagepath}`} alt="Poster"/>
			</div>
			<div className='top'>
				<span className='name'>
					영화 : {comment.mtitle}
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
				<ButtonCustom style={{paddingLeft: "1px"}} onClick={LikeChange}>
					<span className='cnt'>
						{likes}
					</span>
					{like ? <LikeFilled style={{color: "#e61919"}}/> : <LikeOutlined/>}
				</ButtonCustom>			
				<ButtonCustom style={{marginLeft: "2px"}} onClick={CommentDelete}>
					<DeleteOutlined/>
				</ButtonCustom>
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
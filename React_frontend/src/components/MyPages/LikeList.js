/*
 23-03-11 마이페이지 css 구축(오병주)
*/
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Like from './Like';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { USER_MY_MOVIE_SEARCH_REQUEST } from '../../reducer/movie';

const LikeList = () => {
	const dispatch = useDispatch();

	// 좋아요 누른 영화 상태
	const { likeMovie } = useSelector((state) => state.movie);

	// 찜한 영화 요청
  useEffect(() => {
    dispatch({
      type: USER_MY_MOVIE_SEARCH_REQUEST
    });
  }, [dispatch]);

	return (
		<Content>
			<ContentTitle>
				<ContentLeft>
					<h2>
						찜한 영화 ({likeMovie.length})
					</h2>
				</ContentLeft>
			</ContentTitle>
			<ContentLine/>
			<ContentDetails>
				{likeMovie.length !== 0 ? likeMovie.map((movie, index) => <Like movie={movie} key={index}/>) : 
				<NoContent>
					<span>
						<InfoCircleOutlined/>
					</span>
						찜한 영화가 존재하지 않습니다.						
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

export default LikeList;
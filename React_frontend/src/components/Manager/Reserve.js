import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import { useDispatch, useSelector } from "react-redux";
import { MANAGER_MOVIE_LIST_REQUEST, MANAGER_MOVIE_SELECT } from '../../reducer/R_manager_user';
import { ALLTHEATER_REQUEST } from "../../reducer/ticket";

const Reserve = () => {
	const dispatch = useDispatch();

	// 로그인 리덕스 상태
	const { LOGIN_data } = useSelector((state) => state.R_user_login);
	// 리덕스에 있는 영화 리스트
  const { MOVIE_LIST } = useSelector((state) => state.R_manager_user);
	const { MOVIE } = useSelector((state) => state.R_manager_user);
	

	const { allTheater
} = useSelector((state) => state.ticket);

	// 모든 영화 및 상영관 조회 useEffect
  useEffect(() => {
		 // 백엔드로 부터 로그인 기록을 받아온 다음 백엔드 요청
		 if (LOGIN_data.uid !== 'No_login') {
      dispatch({
        type: MANAGER_MOVIE_LIST_REQUEST
      });
    }

		dispatch({
			type:ALLTHEATER_REQUEST
		})
  }, [LOGIN_data.uid, dispatch])

	// css를 위한 버튼 변수
	const [moviebutton, setmoviebutton] = useState(true);
	const [theaterbutton, settheaterbutton] = useState(false);

	// 영화별 버튼 누를때
	const onMovie = useCallback(() => {
		setmoviebutton(true);
		settheaterbutton(false);
	}, []);

	// 극장별 버튼 누를때
	const onTheater = useCallback(() => {
		setmoviebutton(false);
		settheaterbutton(true);
	}, [])

	// 영화 목록들 중 하나를 클릭할때
	const MovieClick = useCallback((movie) => {
		dispatch({
			type: MANAGER_MOVIE_SELECT,
			data: movie
		})
	}, [dispatch])



	return (
		<Container>
      <InnerWraps>
        <div className="titleMenu">
          <h1>
            예매기록조회
          </h1>
        </div>
				<MovieAreaChoice>
					<TabLeft>
						<ul>
							<li className={moviebutton ? "hover tab" : "tab"} onClick={onMovie}>
								<a href="#!">
									<i>
										<MovieOutlinedIcon style={{width:'40px' ,height:'40px'}}/>
									</i>
									영화별
								</a>
							</li>
							<li className={theaterbutton ? "hover tab" : "tab"} onClick={onTheater}>
								<a href="#!">
									<i>
										<CoPresentOutlinedIcon style={{width:'40px' ,height:'40px'}} />
									</i>
									극장별
								</a>
							</li>	
						</ul>
					</TabLeft>
					<TabCenter>
						{moviebutton ? 
						<MovieWrapper>
              <ListSection>
								<ScrollBar>
									<MovieContainer>
										<ul>
										{MOVIE_LIST.map((movie)=> 
											<Movies key={movie.mid} movie={movie.mid} movieData={MOVIE}>
												<button onClick={()=> MovieClick(movie)}>       
													{movie.mtitle}
												</button>
											</Movies>)}
										</ul>
										</MovieContainer>
								</ScrollBar>
							</ListSection>
							<Poster>
								<Table> 
									<img src={`/${MOVIE.mimagepath}`} style={{width:"100%" ,height:"100%"}} alt ='Poster'/>
								</Table>
							</Poster>
						</MovieWrapper> :
						<TheaterWrapper>
							<Wrapper>
								<ListChoice>
									<ul>
										<li className={true ? "tab menu"  : ""}>
											서울(11)
										</li>
										<li className={false ? "tab menu"  : ""}>
											경기(5)
										</li>
										<li className={false ? "tab menu"  : ""}>
											인천(5)
										</li>
										<li className={false ? "tab menu"  : ""}>
											부산(5)
										</li>
									</ul>
								</ListChoice>
								<ListSectionT>
									<ScrollBarT>
										<TheaterContainer>
											<ul>
												{allTheater.map((t)=>
													<TheaterLi  cityName={t.tid}>
														{t.tname}
													</TheaterLi>)} 
							 				</ul>
										</TheaterContainer>
									</ScrollBarT>
								</ListSectionT>
							</Wrapper>
						</TheaterWrapper> }
					</TabCenter>
				</MovieAreaChoice>  
      </InnerWraps>
     </Container>
	);
};

const Container = styled.div`
  padding: 0;
  width: 1235px;
  margin : 0 auto;
  box-sizing: border-box; 
  margin-bottom: 0;
  min-height: 820px;
`;

const InnerWraps = styled.div`
  width: 100%;
  padding-left: 10px;

  .titleMenu {
    position: relative;
    top: 18px;
		margin-bottom: 35px;
  }
`;

const MovieAreaChoice = styled.div`
	overflow: hidden;
	position: relative;
	width: 100%;
	height: 300px;
	margin: 0;
	border: 3px solid #686571;
	border-radius: 10px;
	padding: 0;
`;

const TabLeft = styled.div`
	float: left;
	width: 145px;
	height: 100%;

	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;

		.hover {
		background-color: #fff;
		border-right: none;
		}

    li {
			cursor:pointer;
			display: block;
			text-align: center;
			width: 100%;
			height: 149px;
			line-height: 160px;
			border: 1px solid #d8d9db;
			border-width: 0 1px 1px 0;
			background-color: #f2f4f5;

			a {
				display: block;
				color: #444;
				font-size: 1.2em;
				font-weight: 400;
				text-decoration: none;

				i {
					width: 39px;
					height: 32px;
					overflow: hidden;
					display: inline-block;
					margin-bottom:10px;
					margin-right:5px;
					padding: 0;
					font-size: 0;
					line-height: 0;
					vertical-align: middle;
					background-position: 0 0;
					background-repeat: no-repeat;
				}
			}
    }
  }
`;

const TabCenter = styled.div`
`;

const MovieWrapper = styled.div`
	position: absolute;
	left: 180px;
	top: 0;
	display: block;
	width: calc(100% - 180px);
	height: 300px;
	padding: 0;
`;

const ListSection = styled.div`
	overflow: hidden;
	width: 800px;
	height: 240px;
	padding: 20px 0;
`;

const ScrollBar = styled.div`
	height: 200px;
	position: relative;
	overflow: hidden;
	height: 100%;
	max-width: 100%;
	outline: 0;
	direction: ltr;   
	max-height: none;
`;

const MovieContainer = styled.div`
	position: relative;
	top: 0;
	left: 0;
	overflow:auto;
	height:100%;

	ul {
		overflow: hidden;
		position: relative;
		display: block;
		min-height: 145px;
		list-style-type: none;
		margin: 0;
		padding: 0;
  }
`;

const Movies = styled.li`
	float: left;
	width: 25%;
	padding: 0;
	background-color: ${(props) => props.movieData.mid === props.movie ? "#E2E2E2" : "white"};

	button {
    display: block;
    width: 100%;
    height: 50px;
    margin: 0;
    padding: 0 28px 0 10px;
    color: #444;
    border: 0;
    text-align: left;
    background-color: transparent;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    letter-spacing: -.5px;
    font-weight: 400;
	}
`;

const Poster = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	width: 206px;
	height: 100%;
`;

const Table =styled.div`
	display: block;
	width: 100%;
	height: 100%;
`

const TheaterWrapper = styled.div`
	position: absolute;
	left: 180px;
	top: 0;
	display: block;
	width: calc(100% - 180px);
	height: 300px;
	padding: 0;
`;

const Wrapper = styled.div`
	float: left;
	position: relative;
	width: 100%;
	height: 100%;
`;

const ListSectionT = styled.div`
	overflow: hidden;
	height: 240px;
	padding: 20px 0;
`;

const ScrollBarT = styled.div`
	height: 200px;
	position: relative;
	overflow: hidden;
	height: 100%;
	max-width: 100%;
	outline: 0;
	direction: ltr;   
	max-height: none;
`;

const TheaterContainer = styled.div`
	position: relative;
	top: 0;
	left: 0;
	overflow:auto;
	height:100%;

	ul {
		overflow: hidden;
		position: relative;
		display: block;
		min-height: 138px;
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
`;

const ListChoice = styled.div`
	width: 100%;
	height: 54px;
	border-bottom: 1px solid #d8d9db;

	ul {
    position:relative;
    right:30px;
    list-style-type: none;
    padding-top:24px;

    .menu {
			border-bottom: 
			2px solid #555;
			font-weight: 400;
    }

    li {
			cursor:pointer;
			float: left;font-size: .9333em;
			margin-right: 15px;
			text-decoration: none;
			color: #555;
			border-bottom: 2px solid #fff;
			padding-bottom: 9px;
			letter-spacing: -1px;
    }
	}
`;

const TheaterLi = styled.li`
	background-color: ${(props) => props.cityName ===  props.city? "grey" : "white"};
	float: left;
	width: 25%;
	padding: 0;
	cursor:pointer;

	button{
		display: block;
		width: 100%;
		height: 50px;
		margin: 0;
		padding: 0 28px 0 10px;
		color: #444;
		border: 0;
		text-align: left;
		background-color: transparent;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		cursor: pointer;
		letter-spacing: -.5px;
		font-weight: 400;
		font-family: NanumBarunGothic,Dotum,'돋움',sans-serif;
	}
`;

export default Reserve;
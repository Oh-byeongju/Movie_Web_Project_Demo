import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { MANAGER_MOVIE_LIST_REQUEST, 
	MANAGER_MOVIE_SELECT, 
	MANAGER_THEATER_LIST_REQUEST, 
	MANAGER_THEATER_SELECT, 
	MANAGER_RESERVE_MOVIE_LIST_REQUEST, 
	MANAGER_RESERVE_THEATER_LIST_REQUEST } from '../../reducer/R_manager_user';
import ReserveMovie from './ReserveMovie';
import ReserveTheater from './ReserveTheater';

const Reserve = () => {
	const dispatch = useDispatch();

	// 필요한 리덕스 상태들
  const { LOGIN_data, MOVIE_LIST, MOVIE, THEATER_LIST, THEATER, RESERVE_MOVIE_LIST, RESERVE_THEATER_LIST } = useSelector(
    state => ({
      LOGIN_data: state.R_user_login.LOGIN_data,
      MOVIE_LIST: state.R_manager_user.MOVIE_LIST,
      MOVIE: state.R_manager_user.MOVIE,
      THEATER_LIST: state.R_manager_user.THEATER_LIST,
      THEATER: state.R_manager_user.THEATER,
			RESERVE_MOVIE_LIST: state.R_manager_user.RESERVE_MOVIE_LIST,
      RESERVE_THEATER_LIST: state.R_manager_user.RESERVE_THEATER_LIST
    }),
    shallowEqual
  );

	// 모든 영화 및 상영관 조회 useEffect
  useEffect(() => {
		// 백엔드로 부터 로그인 기록을 받아온 다음 백엔드 요청
		if (LOGIN_data.uid !== 'No_login' && MOVIE_LIST.length === 0 && THEATER_LIST.length === 0) {
      dispatch({
        type: MANAGER_MOVIE_LIST_REQUEST
      });
			dispatch({
				type: MANAGER_THEATER_LIST_REQUEST
			})
    }

		// 페이지 탈출 시 초기화
		return () => {
			if (MOVIE_LIST.length !== 0) {
				dispatch({
					type: MANAGER_MOVIE_SELECT,
					data: MOVIE_LIST[0]
				});
			}

			if (THEATER_LIST.length !== 0) {
				dispatch({
					type: MANAGER_THEATER_SELECT,
					data: THEATER_LIST[0]
				});
			}
		}
  }, [LOGIN_data.uid, MOVIE_LIST, THEATER_LIST, dispatch])

	// 예매기록 조회 useEffect (영화 선택)
  useEffect(()=> {
    // 영화 선택시 백엔드 호출
    if (MOVIE !== '') {
      dispatch({
        type: MANAGER_RESERVE_MOVIE_LIST_REQUEST,
        data: {
          mid: MOVIE.mid,
					page: 0,
					size: 10
        }
      });
    }
  }, [MOVIE, dispatch])

	// 예매기록 조회 useEffect (극장 선택)
  useEffect(()=> {
    // 극장 선택시 백엔드 호출
    if (THEATER !== '') {
      dispatch({
        type: MANAGER_RESERVE_THEATER_LIST_REQUEST,
        data: {
          tid: THEATER.tid,
					page: 0,
					size: 10
        }
      });
    }
  }, [THEATER, dispatch])

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
		});
	}, [dispatch])

	// 선택된 지역 버튼 useState
	const [selectArea, setselectArea] = useState('seoul');

	// 극장 관리 useState
	const [theater, setTheater] = useState({
		seoul: 0,
		gyeonggi: 0,
		incheon: 0,
		busan: 0
  });
	const { seoul, gyeonggi, incheon, busan } = theater;

	// 극장 목록들 중 하나를 클릭할때
	const TheaterClick = useCallback((theater) => {
		dispatch({
			type: MANAGER_THEATER_SELECT,
			data: theater
		})
	}, [dispatch])

	// 지역별 극장 개수 설정하는 useEffect
	useEffect(()=> {
		var temp_seoul = 0;
		var temp_gyeonggi = 0;
		var temp_incheon = 0;
		var temp_busan = 0;
	
		for (var i = 0; i < THEATER_LIST.length; i++) {
			if (THEATER_LIST[i].tarea === "서울") { temp_seoul++; }
			else if(THEATER_LIST[i].tarea === "경기") { temp_gyeonggi++; }
			else if(THEATER_LIST[i].tarea === "인천") { temp_incheon++; }
			else { temp_busan++; }
		}

		setTheater(t=> ({
			...t,
			seoul: temp_seoul,
			gyeonggi: temp_gyeonggi,
			incheon: temp_incheon,
			busan: temp_busan
		}));
	}, [THEATER_LIST]);
	
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
								<Info> 
									<img src={`/${MOVIE.mimagepath}`} style={{width:"100%" ,height:"100%"}} alt ='Poster'/>
								</Info>
							</Poster>
						</MovieWrapper> :
						<TheaterWrapper>
							<Wrapper>
								<ListChoice>
									<ul>
										<li onClick={()=> setselectArea('seoul')} className={selectArea === 'seoul' ? "tab menu"  : ""}>
											서울 ({seoul})
										</li>
										<li onClick={()=> setselectArea('gyeonggi')} className={selectArea === 'gyeonggi' ? "tab menu"  : ""}>
											경기 ({gyeonggi})
										</li>
										<li onClick={()=> setselectArea('incheon')} className={selectArea === 'incheon' ? "tab menu"  : ""}>
											인천 ({incheon})
										</li>
										<li onClick={()=> setselectArea('busan')} className={selectArea === 'busan' ? "tab menu"  : ""}>
											부산 ({busan})
										</li>
									</ul>
								</ListChoice>
								<ListSectionT>
									<ScrollBarT>
										<TheaterContainer>
											<ul>
                       	{selectArea === 'seoul' ? THEATER_LIST.map((theater)=> 
												theater.tarea === '서울' ? <TheaterLi key={theater.tid} onClick={()=> TheaterClick(theater)} tName={theater.tid} theater={THEATER.tid}> {theater.tname} </TheaterLi> 
												: null) : null}

												{selectArea === 'gyeonggi' ? THEATER_LIST.map((theater)=> 
												theater.tarea === '경기' ? <TheaterLi  key={theater.tid} onClick={()=> TheaterClick(theater)} tName={theater.tid} theater={THEATER.tid}> {theater.tname} </TheaterLi> 
												: null) : null}

												{selectArea === 'incheon' ? THEATER_LIST.map((theater)=> 
												theater.tarea === '인천' ? <TheaterLi  key={theater.tid} onClick={()=> TheaterClick(theater)} tName={theater.tid} theater={THEATER.tid}> {theater.tname} </TheaterLi> 
												: null) : null}

												{selectArea === 'busan' ? THEATER_LIST.map((theater)=> 
												theater.tarea === '부산' ? <TheaterLi  key={theater.tid} onClick={()=> TheaterClick(theater)} tName={theater.tid} theater={THEATER.tid}> {theater.tname} </TheaterLi> 
												: null) : null}
							 				</ul>
										</TheaterContainer>
									</ScrollBarT>
								</ListSectionT>
							</Wrapper>
						</TheaterWrapper> }
					</TabCenter>
				</MovieAreaChoice>
				{moviebutton ? 
				<>
					<Notice>
						* 검색결과 <strong>{RESERVE_MOVIE_LIST.totalElements}</strong>건이 검색되었습니다. (현재 영화는 {MOVIE.reserve ? <strong>상영중인</strong> : <strong>상영예정</strong>} 영화입니다.)
					</Notice> 
					<ReserveMovie/>
				</> :
				<>
					<Notice>
						* 검색결과 <strong>{RESERVE_THEATER_LIST.totalElements}</strong>건이 검색되었습니다. (상영 예정 영화포함)
					</Notice>
					<ReserveTheater/>
				</>}
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
	margin-bottom: 50px;
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

const Info = styled.div`
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
    position: relative;
    right: 39px;
    list-style-type: none;
    padding-top: 24px;

    .menu {
			border-bottom: 2px solid #555;
    }

    li {
			cursor: pointer;
			float: left;
			font-size: .9333em;
			margin-right: 20px;
			text-decoration: none;
			color: #555;
			padding-bottom: 9px;
			letter-spacing: -0.5px;
    }
	}
`;

const TheaterLi = styled.li`
	background-color: ${(props) => props.tName ===  props.theater? "#E2E2E2" : "white"};
	float: left;
	width: 25%;
	padding: 0;
	font-size: 20px;
	line-height: 30px;
	cursor: pointer;

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

const Notice = styled.div`
	float: right;
	margin-bottom: 8px;
	font-size: 17px;
`;

export default Reserve;
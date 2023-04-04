import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { MANAGER_MOVIEINFO_LIST_REQUEST } from '../../reducer/R_manager_movieinfo';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as date from "../../lib/date.js";
import { Table, Modal, Button, Form, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import "dayjs/locale/ko";
import locale from 'antd/lib/locale/ko_KR';
import { ConfigProvider } from 'antd';

const MovieInfoTable = ({ selectMovie, selectArea, selectTheater, days, seoulTheater, gyeonggiTheater, incheonTheater, busanTheater }) => {
  const dispatch = useDispatch();

  // 필요한 리덕스 상태들
  const { MOVIEINFO_LIST_loading, MOVIEINFO_LIST, MOVIEINFO_MOVIE_LIST, MOVIEINFO_CINEMA_LIST} = useSelector(
    state => ({
      MOVIEINFO_LIST_loading: state.R_manager_movieinfo.MOVIEINFO_LIST_loading,
      MOVIEINFO_LIST: state.R_manager_movieinfo.MOVIEINFO_LIST,
      MOVIEINFO_MOVIE_LIST: state.R_manager_movieinfo.MOVIEINFO_MOVIE_LIST,
      MOVIEINFO_CINEMA_LIST: state.R_manager_movieinfo.MOVIEINFO_CINEMA_LIST
    }),
    shallowEqual
  );

  // 테이블에 있는 페이지네이션 누를 때
	const handleTableChange = useCallback((pagination) => {
    // 사용자가 고른 날짜가 있을경우 처리
		var start = null;
		var end = null;
		if (days) {
			start = date.DateToString(days[0].$d);
			end = date.DateToString(days[1].$d)
		}

		// 사용자가 고른 지역이 있을경우 처리
		var area = null;
		if (selectArea === 'seoul') {
			area = '서울';
		}
		else if (selectArea === 'gyeonggi') {
			area = '경기';
		}
		else if (selectArea === 'incheon') {
			area = '인천';
		}
		else if (selectArea === 'busan') {
			area = '부산';
		}

		dispatch({
			type: MANAGER_MOVIEINFO_LIST_REQUEST,
			data: {
				mid: selectMovie,
				tarea: area,
				tid: selectTheater,
				startDay: start,
        endDay: end,
				page: pagination.current - 1,
        size: pagination.pageSize
			}
		});
  }, [selectMovie, selectArea, selectTheater, days, dispatch]);

  // antd css 설정
  const columns = [
    {
      title: '상영번호',
      width: 90,
      dataIndex: 'miid',
      fixed: 'left'
    },
    {
      title: '영화이름',
      width: 160,
      dataIndex: 'mtitle',
      ellipsis: true,
      fixed: 'left'
    },
    {
      title: '상영극장',
      width: 180,
      render: (text, row) => <div> {row["tarea"]}-{row["tname"]}점 {row["cname"]}</div>,
    },
		{
      title: '상영날짜',
      width: 150,
      render: (text, row) => <div> {row["miday"].substr(0, 10)} ({date.getDayOfWeek(row["miday"])}) </div>,
      sorter: (a, b) => new Date(a.miday) - new Date(b.miday)
    },
		{
      title: '상영시작시간',
      width: 180,
      render: (text, row) => <div> {row["mistarttime"].substr(0, 10)} ({date.getDayOfWeek(row["mistarttime"])}) {row["mistarttime"].substr(10, 6)} </div>,
      sorter: (a, b) => new Date(a.mistarttime) - new Date(b.mistarttime)
    },
		{
      title: '상영종료시간',
      width: 180,
      dataIndex: 'miid',
			render: (text, row) => <div> {row["miendtime"].substr(0, 10)} ({date.getDayOfWeek(row["miendtime"])}) {row["miendtime"].substr(10, 6)} </div>,
      sorter: (a, b) => new Date(a.miendtime) - new Date(b.miendtime)
    },
		{
      title: '상영상태',
      width: 90,
			render: (text, row) => <div> {movieState(row["mistarttime"], row["miendtime"])} </div>,
    },
		{
      title: '예매현황',
      width: 100,
      render: (text, row) => <div> &nbsp; {row["count"]} / {row["allcount"]}</div>,
    },
    {
      title: '관리자',
      fixed: 'right',
      width: 90,
      render: (text, row) => <TableButton onClick={()=> Clickbutton(row)}>modify</TableButton>
    },
  ];  

  // 상영상태 표현하는 함수
  const movieState = useCallback((mistarttime, miendtime) => {
    var now = new Date();
    var start = new Date(mistarttime);
    var end = new Date(miendtime);

    if (start > now) {
      return '상영예정';
    }

    if (start <= now && now < end) {
      return '상영중';
    }

    if (end <= now) {
      return '상영종료';
    }
  }, []);

  // 모달 내용 및 상태관리
	const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // 선택된 영화, 지역, 극장, 상영관, 날짜버튼 useState
	const [selectMovieModal, setselectMovieModal] = useState();
	const [selectAreaModal, setselectAreaModal] = useState();
	const [selectTheaterModal, setselectTheaterModal] = useState();
  const [selectCinemaModal, setselectCinemaModal] = useState();
  const [openDay, setopenDay] = useState();
	const [dayStartModal, setdayStartModal] = useState();
  const [dayEndModal, setdayEndModal] = useState();

  // modify 버튼을 누를때 실행되는 함수
	const Clickbutton = useCallback((data) => {
    if (data.count !== 0) {
      alert('예매가 없는 상영정보만 수정이 가능합니다.');
      return;
    }
    
    // 모달창에 정보 입력
    setselectMovieModal(data.mid);
    if (data.tarea === '서울') {
			setselectAreaModal('seoul');
		}
		else if (data.tarea === '경기') {
      setselectAreaModal('gyeonggi');
		}
		else if (data.tarea === '인천') {
      setselectAreaModal('incheon');
		}
		else if (data.tarea === '부산') {
			setselectAreaModal('busan');
		}
    setselectTheaterModal(data.tid);
    setselectCinemaModal(data.cid);
    setopenDay(data.mdate);
    setdayStartModal(data.mistarttime);
    setdayEndModal(data.miendtime);

    setIsModalOpen(true);

    console.log(data);
	}, []);


  // 모달창 영화 교체할 때
	const handleMovieChangeModal = useCallback((value) => {
		setselectMovieModal(value);
    setopenDay(MOVIEINFO_MOVIE_LIST.filter(movie => movie.mid === value)[0].mdate);

    setdayStartModal(MOVIEINFO_MOVIE_LIST.filter(movie => movie.mid === value)[0].mdate + " 07:00:00");

    // 이거 아래 시간은 위에꺼에서 + 영화시간으로 해서 해주면될듯
    setdayEndModal(MOVIEINFO_MOVIE_LIST.filter(movie => movie.mid === value)[0].mdate + " 07:00:00");


	}, [MOVIEINFO_MOVIE_LIST]);
  
  // 모달창 지역 교체할 때
	const handleAreaChangeModal = (value) => {
		setselectAreaModal(value);

    if (value === 'seoul') {
			setselectTheaterModal(seoulTheater[0].tid);
      setselectCinemaModal(MOVIEINFO_CINEMA_LIST.filter(cinema => cinema.tid === seoulTheater[0].tid)[0].cid);
		}
		else if (value === 'gyeonggi') {
			setselectTheaterModal(gyeonggiTheater[0].tid);
      setselectCinemaModal(MOVIEINFO_CINEMA_LIST.filter(cinema => cinema.tid === gyeonggiTheater[0].tid)[0].cid);
		}
		else if (value === 'incheon') {
			setselectTheaterModal(incheonTheater[0].tid);
      setselectCinemaModal(MOVIEINFO_CINEMA_LIST.filter(cinema => cinema.tid === incheonTheater[0].tid)[0].cid);
		}
		else if (value === 'busan') {
			setselectTheaterModal(busanTheater[0].tid);
      setselectCinemaModal(MOVIEINFO_CINEMA_LIST.filter(cinema => cinema.tid === busanTheater[0].tid)[0].cid);
		}
	};

  // 모달창 극장 교체할 때
	const handleTheaterChangeModal = useCallback((value) => {
		setselectTheaterModal(value);
    setselectCinemaModal(MOVIEINFO_CINEMA_LIST.filter(cinema => cinema.tid === value)[0].cid);
	}, [MOVIEINFO_CINEMA_LIST]);

  // 모달창 상영관 교체할 때
	const handleCinemaChangeModal = useCallback((value) => {
    console.log(value)
		setselectCinemaModal(value);
	}, []);


  // 날짜 교체할때도 만들어줘야함 함수
  // 시작 시간을 적으면 끝시간이 뙇 나와야함(내일 이거 진행)
  // 삭제는 그냥 삭제하면 되는데 수정할때는 앞뒤 시간 체크
  // 삽입할때도 앞뒤 시간 체크
  // 삽입, 삭제, 수정 메소드 날릴 떄 전부 마지막으로 예매한거 있는지 확인하고 해야함
  //달력 바꾸는거 onchange 넣어야함

 

	return (
		<>
			<TableWrap rowKey="miid"
        loading={MOVIEINFO_LIST_loading}
        columns={columns}
        dataSource={MOVIEINFO_LIST.content}
        pagination={{current: MOVIEINFO_LIST.number ? MOVIEINFO_LIST.number + 1 : 1, total: MOVIEINFO_LIST.totalElements, pageSize: MOVIEINFO_LIST.size}}
        onChange={handleTableChange}
				scroll={{x: 550}}
				locale={{ 
          triggerDesc: '내림차순 정렬하기',
          triggerAsc: '오름차순 정렬하기', 
          cancelSort: '정렬해제하기'
      	}}
      />
			<Modal title="상영정보관리" open={isModalOpen} onOk={handleOk} onCancel={()=> setIsModalOpen(false)} destroyOnClose>
        <Form>
          <Form.Item label="영화">
            <Select 
            defaultValue={selectMovieModal}
            onChange={handleMovieChangeModal} 
            options={MOVIEINFO_MOVIE_LIST.map((movie) => ({
              value: movie.mid,
              label: movie.mtitle + " (상영시간 : " + movie.mtime + "분, 개봉일 : " + movie.mdate + ")"
            }))}
            />
          </Form.Item>  
          <Form.Item label="지역">
            <Select 
            defaultValue={selectAreaModal}
            onChange={handleAreaChangeModal} 
            options={[
              {
                value: 'seoul',
                label: '서울',
              },
              {
                value: 'gyeonggi',
                label: '경기',
              },
              {
                value: 'incheon',
                label: '인천',
              },
              {
                value: 'busan',
                label: '부산',
              }
            ]}
            />
          </Form.Item> 
          <Form.Item label="극장">
            <Select 
            value={selectAreaModal ? selectTheaterModal : null}
            onChange={handleTheaterChangeModal}
            options={seoulTheater && selectAreaModal === 'seoul' ? seoulTheater.map((theater) => ({
              value: theater.tid,
              label: theater.tname
            })) : gyeonggiTheater && selectAreaModal === 'gyeonggi' ? gyeonggiTheater.map((theater) => ({
              value: theater.tid,
              label: theater.tname
            })) : incheonTheater && selectAreaModal === 'incheon' ? incheonTheater.map((theater) => ({
              value: theater.tid,
              label: theater.tname
            })) : busanTheater && busanTheater.map((theater) => ({
              value: theater.tid,
              label: theater.tname
            }))}
            />
          </Form.Item>
          <Form.Item label="상영관">
            <Select
            value={selectCinemaModal}
            onChange={handleCinemaChangeModal}
            options={MOVIEINFO_CINEMA_LIST.filter(cinema => cinema.tid === selectTheaterModal).map((cinema) => ({
              value: cinema.cid,
              label: cinema.cname
            }))}
            />
          </Form.Item>
          <Form.Item label="상영시작시간">
            <ConfigProvider locale={locale}>
              <DatePicker 
              disabledDate={(current) => {
                return current && current < new Date(openDay);
              }} 
              allowClear={false} 
              showTime format="YYYY-MM-DD HH:mm:ss" 
              value={dayjs(dayStartModal, 'YYYY-MM-DD HH:mm:ss')}/>
						</ConfigProvider>
          </Form.Item>

          <Form.Item label="상영종료시간">
            <ConfigProvider locale={locale}>
              <DatePicker disabled 
              showTime format="YYYY-MM-DD HH:mm:ss" 
              value={dayjs(dayEndModal, 'YYYY-MM-DD HH:mm:ss')}/>
						</ConfigProvider>
          </Form.Item>


          {true ?
          <Form.Item style={{position:'relative', top:'57px'}}>
            <Button type="primary" danger onClick={()=>console.log('fdasfsda')}>
              삭제
            </Button>      
          </Form.Item> : null}
        </Form>
      </Modal>
		</>
	);
};

const TableWrap = styled(Table)`
  margin-bottom: 30px;
  min-height: 693px;

  .ant-table-placeholder {
    .ant-table-expanded-row-fixed{
      min-height: 603px !important;
    }
    .css-dev-only-do-not-override-acm2ia {
      position:absolute;
      top: 45%;
      left: 50%;
      transform:translate(-50%, -45%); /* translate(x축,y축) */
    }
  }
`;

const TableButton = styled.button`
  color: #1677ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  border: none;
`;

export default MovieInfoTable;
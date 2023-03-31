import React from 'react';
import styled from 'styled-components';
import * as date from "../../lib/date.js";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { MANAGER_RESERVE_THEATER_LIST_REQUEST } from '../../reducer/R_manager_user.js';
import { Table } from 'antd';

const ReserveTheater = ({ currentT, setCurrentT }) => {
	const dispatch = useDispatch();

	// 필요한 리덕스 상태들
	const { RESERVE_THEATER_LIST_loading, RESERVE_THEATER_LIST, THEATER } = useSelector(
		state => ({
			RESERVE_THEATER_LIST_loading: state.R_manager_user.RESERVE_THEATER_LIST_loading,
			RESERVE_THEATER_LIST: state.R_manager_user.RESERVE_THEATER_LIST,
			THEATER: state.R_manager_user.THEATER
		}),
		shallowEqual
	);

	// antd css 설정
  const columns = [
    {
      title: '계정',
      width: 110,
      dataIndex: 'uid',
      fixed: 'left',
    },
    {
      title: '예매번호',
      width: 100,
      dataIndex: 'rid',
      fixed: 'left',
    },
		{
      title: '영화이름',
      width: 140,
      dataIndex: 'mtitle',
			ellipsis: true,
      fixed: 'left',
    },
    {
      title: '예매일시',
      width: 170,
      dataIndex: 'rdate',
      sorter: (a, b) => new Date(a.rdate) - new Date(b.rdate)
    },
    {
      title: '관람극장',
      width: 180,
      render: (text, row) => <div> {row["tarea"]}-{row["tname"]}점 {row["cname"]}</div>,
    },
    {
      title: '관람일시',
      width: 190,
      render: (text, row) => <div> {row["mistarttime"].substr(0, 10)} ({date.getDayOfWeek(row["mistarttime"])}) {row["mistarttime"].substr(10, 6)} </div>,
    },
    {
      title: '관람인원',
      width: 270,
			render: (text, row) => <div> {row["rpeople"]} (총 {row["rticket"]}매) </div>,
    },
		{
      title: '결제유형', 
      width: 105,
      dataIndex: 'rpaytype',
    },
		{
      title: '결제금액', 
      width: 100,
			render: (text, row) => <div> {row["rprice"]}원 </div>,
    },
    {
      title: '예매상태',
      fixed: 'right',
      width: 90,
      render: (text, row) => <div> 예매완료 </div>,
    },
  ];  

	// 테이블에 있는 페이지네이션 누를 때
	const handleTableChange = (pagination) => {
		setCurrentT(pagination.current);
		dispatch({
			type: MANAGER_RESERVE_THEATER_LIST_REQUEST,
			data: {
				tid: THEATER.tid,
				page: pagination.current - 1,
        size: pagination.pageSize
			}
		});
  };

	return (
		<>
			<TableWrap rowKey="rid"
				loading={RESERVE_THEATER_LIST_loading}
        columns={columns}
				dataSource={RESERVE_THEATER_LIST.content}
				pagination={{current: currentT, total: RESERVE_THEATER_LIST.totalElements, pageSize: RESERVE_THEATER_LIST.size}}
				scroll={{x: 1350}}
				onChange={handleTableChange}
        locale={{ 
          triggerDesc: '내림차순 정렬',
          triggerAsc: '오름차순 정렬', 
          cancelSort: '정렬해제'
      	}}
			/>
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

export default ReserveTheater;
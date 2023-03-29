import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import * as date from "../../lib/date.js";
import { Table } from 'antd';

const ReserveMovie = () => {
	const dispatch = useDispatch();

	// 리덕스에 있는 예매기록 리스트
	const { RESERVE_LIST } = useSelector((state) => state.R_manager_user);
	const { RESERVE_LIST_loading } = useSelector((state) => state.R_manager_user);

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
      title: '예매일시',
      width: 170,
      dataIndex: 'rdate',
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
      width: 105	,
      dataIndex: 'rpaytype',
    },
		{
      title: '결제금액', 
      width: 100,
			render: (text, row) => <div> {row["rprice"]}원 </div>,
    },
		{
      title: '취소일시',
      width: 170,
      render: (text, row) => <div> {row["rcanceldate"] ? row["rcanceldate"] : "-"} </div>,
    },
    {
      title: '예매상태',
      fixed: 'right',
      width: 90,
      render: (text, row) => <div> {row["rstate"] ? "예매완료" : "예매취소"} </div>,
    },
  ];  


	return (
		<>
			<TableWrap rowKey="rid"
          loading={RESERVE_LIST_loading}
          columns={columns}
          dataSource={RESERVE_LIST}
          scroll={{
          x: 1350,
        }}/>
		</>
	);
};

const TableWrap = styled(Table)`
  margin-bottom: 30px;

  .ant-table-placeholder {
    .ant-table-expanded-row-fixed{
      min-height: 600px !important;
    }
    .css-dev-only-do-not-override-acm2ia {
      position:absolute;
      top: 45%;
      left: 50%;
      transform:translate(-50%, -45%); /* translate(x축,y축) */
    }
  }
`;

export default ReserveMovie;
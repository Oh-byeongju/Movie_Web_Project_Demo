import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { MANAGER_MOVIE_COMMENT_LIST_REQUEST, MANAGER_MOVIE_COMMENT_DELETE_REQUEST } from '../../reducer/R_manager_user.js';
import { Table, Modal } from 'antd';

const MovieInfoTable = () => {
  const dispatch = useDispatch();

  // 필요한 리덕스 상태들
  const { MOVIE_COMMENT_LIST_loading, MOVIE_COMMENT_LIST, MOVIE_COMMENT, MOVIE_COMMENT_DELETE_loading } = useSelector(
    state => ({
      MOVIE_COMMENT_LIST_loading: state.R_manager_user.MOVIE_COMMENT_LIST_loading,
      MOVIE_COMMENT_LIST: state.R_manager_user.MOVIE_COMMENT_LIST,
			MOVIE_COMMENT: state.R_manager_user.MOVIE_COMMENT,
      MOVIE_COMMENT_DELETE_loading: state.R_manager_user.MOVIE_COMMENT_DELETE_loading
    }),
    shallowEqual
  );



	const { MOVIEINFO_LIST } = useSelector((state)=> state.R_manager_movieinfo);





  // 테이블에 있는 페이지네이션 누를 때
	const handleTableChange = (pagination) => {
		dispatch({
			type: MANAGER_MOVIE_COMMENT_LIST_REQUEST,
			data: {
				mid: MOVIE_COMMENT.mid,
				page: pagination.current - 1,
        size: pagination.pageSize
			}
		});
  };

	// 모달 내용 및 상태관리
	const [selectRow, setSelectRow] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (row) => {
		setSelectRow(row);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  // 관람평 삭제 버튼 누르면 실행되는 함수
	const CommentDelete = useCallback((data) => {
    if (!window.confirm("관람평을 삭제하시겠습니까? (삭제된 관람평은 복구되지 않습니다)")) {
      return;
    };

    dispatch({
			type: MANAGER_MOVIE_COMMENT_DELETE_REQUEST,
			data: {
        umid: data,
				mid: MOVIE_COMMENT.mid,
				page: MOVIE_COMMENT_LIST.number,
        size: MOVIE_COMMENT_LIST.size
			}
		});
	}, [MOVIE_COMMENT.mid, MOVIE_COMMENT_LIST, dispatch]);

  // antd css 설정
  const columns = [
    {
      title: '상영번호',
      width: 90,
      dataIndex: 'miid'
    },
    {
      title: '영화이름',
      width: 140,
      dataIndex: 'mtitle'
    },
    {
      title: '상영극장',
      width: 180,
      dataIndex: 'miid'
    },
		{
      title: '상영날짜',
      width: 180,
			ellipsis: true,
      dataIndex: 'miid'
    },
		{
      title: '상영시작시간',
      width: 150,
      dataIndex: 'miid',
			sorter: (a, b) => a.upcnt - b.upcnt,
    },

		{
      title: '상영종료시간',
      width: 150,
      dataIndex: 'miid',
			sorter: (a, b) => a.upcnt - b.upcnt,
    },

		// 아래 상태는 상영중 상영예정 상영종료 표시하는것
		// 영화시작시간이랑 종료시간으로 만들면될듯
		{
      title: '상태',
      width: 150,
      dataIndex: 'miid',
			sorter: (a, b) => a.upcnt - b.upcnt,
    },

		{
      title: '수정가능여부',
      width: 150,
      dataIndex: 'miid',
			sorter: (a, b) => a.upcnt - b.upcnt,
    },


    {
      title: '관리자',
      fixed: 'right',
      width: 90,
      render: (text, row) => <TableButton onClick={()=> CommentDelete(row.miid)}>delete</TableButton>
    },
  ];  

	return (
		<>
			<TableWrap rowKey="miid"
        loading={MOVIE_COMMENT_DELETE_loading || MOVIE_COMMENT_LIST_loading}
        columns={columns}
        dataSource={MOVIEINFO_LIST.content}
        pagination={{current: MOVIE_COMMENT_LIST.number ? MOVIE_COMMENT_LIST.number + 1 : 1, total: MOVIE_COMMENT_LIST.totalElements, pageSize: MOVIE_COMMENT_LIST.size}}
        onChange={handleTableChange}
				onRow={(record, rowIndex) => {
					return {
						onDoubleClick: event => { showModal(record.umcomment); }
					};
				}}
				scroll={{x: 100}}
				locale={{ 
          triggerDesc: '내림차순 정렬하기',
          triggerAsc: '오름차순 정렬하기', 
          cancelSort: '정렬해제하기'
      	}}
      />
			<Modal title="관람평 전체내용" okText="확인" open={isModalOpen} onCancel={handleOk} onOk={handleOk} cancelButtonProps={{ style: { display: 'none' } }} >
        <p>{selectRow}</p>
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
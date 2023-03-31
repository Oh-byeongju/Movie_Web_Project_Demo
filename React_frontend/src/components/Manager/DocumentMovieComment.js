import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { MANAGER_MOVIE_COMMENT_LIST_REQUEST } from '../../reducer/R_manager_user.js';
import { Table, Modal } from 'antd';

const DocumentMovieComment = ({ currentM, setCurrentM }) => {
  const dispatch = useDispatch();

  // 필요한 리덕스 상태들
  const { MOVIE_COMMENT_LIST_loading, MOVIE_COMMENT_LIST, MOVIE_COMMENT } = useSelector(
    state => ({
      MOVIE_COMMENT_LIST_loading: state.R_manager_user.MOVIE_COMMENT_LIST_loading,
      MOVIE_COMMENT_LIST: state.R_manager_user.MOVIE_COMMENT_LIST,
			MOVIE_COMMENT: state.R_manager_user.MOVIE_COMMENT
    }),
    shallowEqual
  );

  // 테이블에 있는 페이지네이션 누를 때
	const handleTableChange = (pagination) => {
    console.log(pagination);

		setCurrentM(pagination.current);
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


    console.log(Math.ceil(1/50));

		if (!window.confirm("관람평을 삭제하시겠습니까?")) {
      return;
    };

    // 일단 여기서 부터 진행하면됨
    // 삭제하면서 메모장에 기록해둔 내용으로 값 불러오게 하면 될듯
    // 제일 끝에놈 기준으로 오류 안나게 들고오기

    console.log(data);

		// dispatch({
    //   type: USER_COMMENT_DELETE_REQUEST,
		// 	data: comment.umid
    // });
		
	}, []);

  // antd css 설정
  const columns = [
    {
      title: '계정',
      width: 60,
      dataIndex: 'uid'
    },
    {
      title: '관람평번호',
      width: 60,
      dataIndex: 'umid'
    },
    {
      title: '작성일시',
      width: 90,
      dataIndex: 'umcommenttime'
    },
		{
      title: '관람평 내용',
      width: 320,
			ellipsis: true,
      dataIndex: 'umcomment'
    },
		{
      title: '공감개수',
      width: 60,
      dataIndex: 'upcnt',
			sorter: (a, b) => a.upcnt - b.upcnt,
    },
    {
      title: '관리자',
      fixed: 'right',
      width: 50,
      render: (text, row) => <TableButton onClick={()=> CommentDelete(row.umid)}>delete</TableButton>
    },
  ];  

	return (
		<>
			<TableWrap rowKey="umid"
        loading={MOVIE_COMMENT_LIST_loading}
        columns={columns}
        dataSource={MOVIE_COMMENT_LIST.content}
        pagination={{current: currentM, total: MOVIE_COMMENT_LIST.totalElements, pageSize: MOVIE_COMMENT_LIST.size}}
        onChange={handleTableChange}
				onRow={(record, rowIndex) => {
					return {
						onDoubleClick: event => { showModal(record.umcomment); }
					};
				}}
				scroll={{x: 100}}
				locale={{ 
          triggerDesc: '내림차순 정렬',
          triggerAsc: '오름차순 정렬', 
          cancelSort: '정렬해제'
      	}}
      />
			<Modal title="관람평 전체내용" okText="확인" open={isModalOpen} onOk={handleOk} cancelButtonProps={{ style: { display: 'none' } }} >
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

export default DocumentMovieComment;
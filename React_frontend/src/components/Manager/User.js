import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Table, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { MANAGER_USER_LIST_REQUEST, MANAGER_USER_DROP_REQUEST } from '../../reducer/R_manager_user';
const { Search } = Input;

const User = () => {
  const dispatch = useDispatch();

	// 모든 유저 정보
	const { USER_LIST } = useSelector((state) => state.R_manager_user);
  const { USER_LIST_loading } = useSelector((state) => state.R_manager_user);

	// 리덕스 로그인 상태 정보
  const { LOGIN_data } = useSelector((state) => state.R_user_login);

  // 모든 유저 조회 useEffect
  useEffect(()=> {
    // 백엔드로 부터 로그인 기록을 받아온 다음 백엔드 요청
    if (LOGIN_data.uid !== 'No_login') {
      dispatch({
        type: MANAGER_USER_LIST_REQUEST,
        data: {
          search: '', 
          sort : 'name'
        }
      });
    }
  }, [LOGIN_data.uid, dispatch])

  // 검색칸 내용 변수
  const [search, setsearch] = useState('');
  const handleSearchChange = e => {
    setsearch(e.target.value);
  };

  // 정렬 버튼 css 변수
	const [namebutton, setnamebutton] = useState(true);
	const [joinbutton, setjoinbutton] = useState(false);

   // 이름순 버튼을 누를 때 함수
	const clickname = useCallback(()=> {

    // 백엔드를 다시 요청
    dispatch({
      type: MANAGER_USER_LIST_REQUEST,
      data: {
        search: search.trim(),
        sort : 'name'
      }
    });
    
		setnamebutton(true);
		setjoinbutton(false);

	}, [search, dispatch])

	// 가입순 버튼을 누를 때 함수
	const clickjoin = useCallback(()=> {

    // 백엔드를 다시 요청
    dispatch({
      type: MANAGER_USER_LIST_REQUEST,
      data: {
        search: search.trim(),
        sort : 'join'
      }
    });
		
		setnamebutton(false);
		setjoinbutton(true);
	}, [search, dispatch])

  // 검색 버튼 누를때 실행되는 함수
  const onSearch = useCallback(() => {

    // 이름순 버튼이 활성화 되있을경우
    if (namebutton) {
      dispatch({
        type: MANAGER_USER_LIST_REQUEST,
        data: {
          search: search.trim(),
          sort : 'name'
        }
      });
    }
    // 가입순 버튼이 활성화 되있을경우
    else {
      dispatch({
        type: MANAGER_USER_LIST_REQUEST,
        data: {
          search: search.trim(),
          sort : 'join'
        }
      });
    }
  }, [namebutton, search, dispatch]);

  // 삭제 버튼 누를때 실행되는 함수
  const onDelete = useCallback((uid) => {
    if (!window.confirm("사용자를 제거하시겠습니까? (삭제된 사용자는 복구되지 않습니다)")) {
      return;
    };

    dispatch({
      type: MANAGER_USER_DROP_REQUEST,
      data: {uid: uid}
    });
  }, [dispatch])

  // antd css 설정
  const columns = [
    {
      title: '계정',
      width: 110,
      dataIndex: 'uid',
      fixed: 'left',
    },
    {
      title: '이름',
      width: 120,
      dataIndex: 'uname',
      fixed: 'left',
    },
    {
      title: '이메일',
      width: 210,
      dataIndex: 'uemail',
    },
    {
      title: '전화번호',
      width: 120,
      dataIndex: 'utel',
    },
    {
      title: '주소',
      width: 340,
      dataIndex: ['uaddr', 'uaddrsecond'],
      render: (text, row) => <div> {row["uaddr"]} {row["uaddrsecond"]} </div>,
    },
    {
      title: '생년월일',
      width: 130,
      dataIndex: 'ubirth',
    },
    {
      title: '가입일자',
      width: 110,
      dataIndex: 'ujoindate',
      fixed: 'right',
    },
    {
      title: '관리자',
      fixed: 'right',
      width: 85,
      render: (text, row) => <TableButton onClick={()=> onDelete(row.uid)}>delete</TableButton>,
    },
  ];  

	return (
		<Container>
      <InnerWraps>
        <div className="titleMenu">
          <h1>
            회원관리
          </h1>
        </div>
        <div className="search">
          <p>
            {USER_LIST.length}명의 회원이 검색되었습니다.
          </p>
            <ButtonList>
              <ButtonWrap>
                <button className={"btn" + (namebutton ? " active" : "")} onClick={clickname}>
                  이름순
                </button>
              </ButtonWrap>
              <ButtonWrap>
                <button className={"btn" + (joinbutton ? " active" : "")} onClick={clickjoin}>
                  가입순
                </button>
              </ButtonWrap>
            </ButtonList>
            <div className="search_button">
            <SearchWarp
              placeholder="계정명 검색"
              allowClear
              onSearch={onSearch}
              value={search}
              onChange={handleSearchChange}
              style={{
                width: 200,
                height: 10,
              }}
            />
          </div>
        </div>
        <TableWrap rowKey="uid"
          loading={USER_LIST_loading}
          columns={columns}
          dataSource={USER_LIST}
          scroll={{
          x: 1350,
        }}/>
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
  }
  .search {
    position: relative;
    width: 100%;
    border-bottom: 3px solid #241d1e;
    padding-bottom: 5px;
    margin-top: 30px;

    p {
      font-weight: 1000;
      padding-top: 8px;
    }

    .search_button {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;

const ButtonList = styled.ul`
	position: absolute;
	margin-left: 5px !important;
	list-style: none;
	margin: 0;
	padding: 0;
  top: 16%;
  right: 18%;

	::after{
		content: '';
    display: block;
    position: absolute;
    left: 60px;
    top: 3px;
    width: 1px;
    height: 16px;
    background-color: #ccc;
	}

	li:first-child {
		margin-left: 0px;
	}
`;

const ButtonWrap = styled.li`
	margin-left: 23px;
	list-style: none;
	display: list-item;
	float: left;

	.btn {
		content: "";
		cursor: pointer;
		background-color: white;
		display: block;
		position: relative;
		color: #999;
		font-size: 16px;
		border: 0;
		padding: 0;

		&.active {
      color: #000;
    }
	}
`;

const SearchWarp = styled(Search)`
  span {
    .ant-input-clear-icon {
      display: none;
    }
    .ant-input-affix-wrapper {
      border-color: #a0a0a0;
    }
    .ant-input-group-addon {
      border-color: #a0a0a0;
    }
    .ant-btn {
      border-color: #a0a0a0;
    }
    .ant-input::placeholder {
      color: #a0a0a0;
    }
  }
`;

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

const TableButton = styled.button`
  color: #1677ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  border: none;
`;

export default User;
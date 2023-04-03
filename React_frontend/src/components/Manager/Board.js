import React,{useEffect, useState} from "react";
import { useDispatch ,useSelector} from "react-redux";
import { Table, Input ,Modal,Form} from 'antd';
import { BOARD_DELETE_LOADING, BOARD_READ_LOADING, BOARD_SELECT_LOADING, COMMENT_READ_REQUEST } from "../../reducer/R_manager_board";
import styled from "styled-components";
const { Search } = Input;

const Board = () =>{
    const dispatch = useDispatch();
   
    const { board,board_delete_done,comment} = useSelector((state)=>state.R_manager_board)
    useEffect(()=>{
        dispatch({
            type: BOARD_READ_LOADING
        })
    },[board_delete_done])
/*
    useEffect(()=>{
        dispatch({
            type:COMMENT_READ_REQUEST,
            data{
                bid:
                type:"new"
            }
        })
    },[])
    */
    const [search, setsearch] = useState('');
    const handleSearchChange = e => {
      setsearch(e.target.value);
      console.log(search)
    };
      // 정렬 버튼 css 변수
	const [namebutton, setnamebutton] = useState(true);
	const [joinbutton, setjoinbutton] = useState(false);

    const clickname = ()=> {
            setnamebutton(true);
            setjoinbutton(false);
    
        }
    
    const clickjoin = ()=> {
            setnamebutton(false);
            setjoinbutton(true);
        }

        const onSearch = () => {
            // 이름순 버튼이 활성화 되있을경우
            if (namebutton) {
                dispatch({
                    type:BOARD_SELECT_LOADING,
                    data:{
                        text:search,
                        state:"uid"
                    }
                })
            }
            // 가입순 버튼이 활성화 되있을경우
            else {
                dispatch({
                    type:BOARD_SELECT_LOADING,
                    data:{
                        text:search,
                        state:"title"
                    }
                })
            }
          }

    const onDelete = (data) =>{
        dispatch({
                type:BOARD_DELETE_LOADING,
                data:{
                    bid:data
                }
        })
    }  
    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = (data) => {
        dispatch({
            type:COMMENT_READ_REQUEST,
            data:{
                bid:data,
                type:"new"
            }
        })
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
        
    const columns = [
        {
          title: '계정',
          width: 110,
          dataIndex: 'uid',
          fixed: 'left',
        },
        {
          title: '제목',
          width: 120,
          dataIndex: 'btitle',
          fixed: 'left',
        },
        {
          title: '날짜',
          width: 210,
          dataIndex: 'bdate',
          fixed:'left'
        },
        {
            title: '카테고리',
            width: 210,
            dataIndex: 'bcategory',
            fixed:'left'
          },
        {
          title: '관리자',
          fixed: 'right',
          width: 85,
          render: (text, row) => <TableButton onClick={()=>{
            
            onDelete(row.bid)
            console.log(row.bid)}}>delete</TableButton>,
        },
      ];  
    return(
        <Container>
      <InnerWraps>
        <div className="titleMenu">
          <h1>
            게시판관리
          </h1>
        </div>
        <div className="search">
          <p>
            {board.length}명의 회원이 검색되었습니다.
          </p>
            <ButtonList>
              <ButtonWrap>
                <button className={"btn" + (namebutton ? " active" : "")} onClick={()=>{clickname()}}>
                  제목
                </button>
              </ButtonWrap>
              <ButtonWrap>
                <button className={"btn" + (joinbutton ? " active" : "")} onClick={()=>{clickjoin()}}>
                  작성자
                </button>
              </ButtonWrap>
            </ButtonList>
            <div className="search_button">
            <SearchWarp
              placeholder="게시물 검색"
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
        <TableWrap rowKey="bid"
          columns={columns}
          dataSource={board}
          scroll={{x: 1350}}
          onRow={(record, rowIndex) => {
            return {
               // click row
              onDoubleClick: event => {                 
                showModal(record.bid)
              }, // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}
        />
      </InnerWraps>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {comment.length!=0 ? 
          comment.mapper.map((data)=>{
return(
    <Form.Item >
           {data.bccomment}
        {data.child.map((data)=>
        <div>{data.bccomment}</div>
        )}
    </Form.Item>
)
          })
          
        :
        ""
        }
      </Modal>
    
     </Container>
    )
    }

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
export default Board;

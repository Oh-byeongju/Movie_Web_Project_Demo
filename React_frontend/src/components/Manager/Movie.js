
import React, { useState, useEffect, useCallback,useMemo ,useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Table, Input ,Button,Modal,Form,Select,message,Space, Tag, Tooltip, theme} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { MOVIES_REQUEST, MOVIE_INSERT_LOADING } from '../../reducer/R_manager_theater';
import ReactQuill from 'react-quill';
import useInput from '../../hooks/useInput';
import { http } from "../../lib/http";
import Actor from './Actor';
import 'react-quill/dist/quill.snow.css';
const { Search } = Input;
const Movie = () =>{
    const dispatch = useDispatch();
	const { LOGIN_data } = useSelector((state) => state.R_user_login);
    const { movie ,movie_insert_done} = useSelector((state) => state.R_manager_theater);
    const [messageApi, contextHolder] = message.useMessage();

    const [main , setMain ] = useState([])
    const [sub, setSub] = useState([]);
    const [voice, setVoice]= useState([]);
    useEffect(()=>{
        dispatch({
            type:MOVIES_REQUEST,
            data:LOGIN_data.uid
        })
    },[movie_insert_done])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modify , setModify] = useState(false);

  //추가
  const [insert, setInsert] = useState(false);
 const [mid ,setMid] = useState('');
  const [name, onChangeName, setName] = useInput(''); //제목
  const [dir, onChangeDir, setDir] = useInput('');    //감독
  const [genre, onChangeGenre, setGenre] = useInput(''); //장르
  const [time, onChangeTime, setTime] = useInput(''); //상영시간
  const [date, onChangeDate, setDate] = useInput(''); //개봉일

    const [file, setFile ] = useState(null);
    const [filechange, setFileChange] = useState(false);
      const onChangeImg = e => {
        setFile(e.target.files);
        setFileChange(true);
        };

   
    
      //수정
      const [update, setUpdate] = useState(false);
  const showModal = (id,name,dir,genre,time,date,content,main,sub,voice) => {
    setMid(id)
    setName(name)
    setDir(dir)
    setGenre(genre)
    setTime(time)
    setDate(date)
    setContent(content)
    setMain(main)
    setSub(sub)
    setVoice(voice)
    setFileChange(false)
    setIsModalOpen(true);
    setUpdate(true);
  };

  const showModdal = () => {
    setMid("")
    setName("")
    setDir("")
    setGenre("")
    setTime("")
    setDate("")
    setContent("")
    setMain([])
    setSub([])
    setVoice([])
    setFileChange(false)
    setIsModalOpen(true);
    setUpdate(false);
  };
  //확인
  const handleOk = async () => {

    if(name!="" && dir !="" && genre!="" && time!="" && date !="" && Board_Content !="" ){
    const mainactor = main.join()
    const subactor = sub.join()
    const voiceactor = voice.join()

    const fd = new FormData();  
    const updatedata ={
      id:mid,
      name:name,
      dir:dir,
      genre:genre,
      time:time,
      date:date,
      rating:"12",
      story:Board_Content,
      main:mainactor,
      sub:subactor,
      voice:voiceactor,
      state:"update"
      }
      const insertdata ={
        id:mid,
        name:name,
        dir:dir,
        genre:genre,
        time:time,
        date:date,
        rating:"12",
        story:Board_Content,
        main:mainactor,
        sub:subactor,
        voice:voiceactor,
        state:"insert"
        }

   //이미지
    if(update){
      if(filechange){
      if(file){
        fd.append("multipartFiles", file[0]); 
      }
    }
    fd.append("data", new Blob([JSON.stringify(updatedata)], {   //데이터
      type: "application/json"
    }))
  }
  //insert
  else if(!update){
    if(file){
      fd.append("multipartFiles", file[0]); 
    }
    fd.append("data", new Blob([JSON.stringify(insertdata)], {   //데이터
      type: "application/json"
    }))
  }
    dispatch({
      type:MOVIE_INSERT_LOADING,
      fd
    })
    setIsModalOpen(false);    

  }
  else{
    messageApi.open({
      type: 'warning',
      content: '데이터를 전부 입력해야합니다.',
    });
  }
    
  }
  //창 닫을 시 초기화
  const handleCancel = () => {
    setContent('');
    setIsModalOpen(false)
  };
  const quillRef = useRef();

	const [Board_Content, setContent] = useState("");

	const onEditorChange = (value) => {
		setContent(value);
    console.log(value);
	};

  const columns = [
    {
      title: '영화명',
      width: 10,
      dataIndex: 'mtitle',
      fixed: 'left',
        
    },
    {
      title: '감독',
      width: 5,
      dataIndex: 'mdir',
      fixed: 'left',
    },
    {
      title: '주연',
      width: 7,
      dataIndex: 'mainactor',
      fixed: 'left',
      render: (mainactor) => mainactor.map(main => main).join(),
    },
    {
      title: '조연',
      width: 7,
      dataIndex: 'subactor',
      fixed: 'left',
      render: (subactor) => subactor.map(main => main).join(),

    },
    {
      title: '성우',
      width: 7,
      dataIndex: 'voiceactor',
      fixed: 'left',
      render: (voiceactor) => voiceactor.map(main => main).join(),

    },
    {
      title: '장르',
      width: 5,
      dataIndex: 'mgenre',
      fixed: 'left',

    },
    {
      title: '상영시간',
      width: 5,
      dataIndex: 'mtime',
      fixed: 'left',
      
    },
    {
      title: '개봉일',
      width: 10,
      dataIndex: 'mdate',
      fixed: 'left',
    },
    
  ]; 
  const modules = useMemo (
    () => ({
      toolbar: {
        
        container : [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          ['clean']
        ],

       
      }, 
      
  }),
  []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background',        
  ]


    return(
        <Container>{contextHolder}
      <InnerWraps>
        <div className="titleMenu">
          <h1>
             영화 관리
          </h1>
        </div>
      
        <div className="search">
        <p>
            {movie.length}개의 영화관이 검색되었습니다.
            더블클릭하면 수정할 수 있음.
          </p>
          
            <div className="search_button">
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size={"20"} 
            onChange={()=>{}}
            onClick={showModdal}></Button>
          </div>
        </div>
        <TableWrap rowKey="cienma"
          dataSource={movie}
          columns={columns}
          dangerouslySetInnerHTML={{__html:movie.mstory}}
          onRow={(record, rowIndex) => {
            return {
               // click row
              onDoubleClick: event => {   
                showModal(
                  record.mid,record.mtitle, record.mdir, record.mgenre, record.mtime, record.mdate,
                  record.mstory,record.mainactor,record.subactor, record.voiceactor
                  )
              }, // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}
          scroll={{
          x: 1350,
        }}/>
      </InnerWraps>
      <Modal 
     width={1200}
      title="영화관 추가" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
        <Form>
        <Form.Item label="영화명" onChange={onChangeName}>
        <Input value={name}/>
      </Form.Item>  
      <Form.Item label="감독&nbsp;&nbsp;&nbsp;" onChange={onChangeDir}>
        <Input value={dir}/>
      </Form.Item>

      <Form.Item label="장르&nbsp;&nbsp;&nbsp;" onChange={onChangeGenre}>
        <Input value={genre}/>
      </Form.Item>

      <Form.Item label="상영시간" onChange={onChangeTime}>
        <Input value={time}/>
      </Form.Item>

      <Form.Item label="개봉일" onChange={onChangeDate}>
        <Input value={date}/>
      </Form.Item>
      <Form.Item label="주연&nbsp;&nbsp;&nbsp;">
      
      <Actor tags ={main} setTags={setMain}/>
      </Form.Item>
      <Form.Item label="조연&nbsp;&nbsp;&nbsp;">
      <Actor tags ={sub} setTags={setSub}/>
      </Form.Item> 

      <Form.Item label="성우&nbsp;&nbsp;&nbsp;">
      
      <Actor tags ={voice} setTags={setVoice}/>
      </Form.Item> 

      <Form.Item label="포스터" >
        <input type="file" id="file" onChange={onChangeImg} 
        multiple="multiple" /> {update ?"파일을 선택하면 교체 놔두면 교체 안함" :"" } 
      </Form.Item>
      <Form.Item label="줄거리" >
      <CustomReactQuill
        ref={quillRef}
        value={Board_Content}
        onChange={onEditorChange}
        modules={modules}
        formats={formats}
                    />   
            </Form.Item>
      {modify ?
      <Form.Item style={{position:'relative', top:'57px'}}>
      <Button type="primary" danger onClick={()=>{}}>
      삭제
      </Button>      </Form.Item>
:""}
    </Form>
      </Modal>     </Container>
    )
}


const Container = styled.div`
  padding: 0;
  width: 1150px;
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
const CustomModal = styled(Modal)`
width:1200px;
`
const CustomReactQuill = styled(ReactQuill)`
    width:1020px;
    height: 200px;
    padding-bottom:50px;
`
export default Movie;
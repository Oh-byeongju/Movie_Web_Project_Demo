import React, {useState, useEffect, useCallback} from 'react';
// import axios from 'axios';
import { USER_INFO_REQUEST } from '../reducer/temp';
import { useDispatch, useSelector } from "react-redux";

const DB = () => {

	// 임시로 쓰고 있음 건들 ㄴㄴㄴ
	// 이 파일 지금 수정 중 
	const baseUrl = "http://localhost:8080";
	const dispatch = useDispatch(); //useDispatch를 dispatch로 선언

	// const [datas, setdata] = useState([{
	// 	ID: '',
	// 	MEMO_TEXT: '',
	// }]);

	const { Infos } = useSelector((state) => state.temp);

	useEffect(() => {
    dispatch({
      type: USER_INFO_REQUEST,
    });
  }, []);

	// async function getData() {
	// 	await axios.get(baseUrl + "/Search/select")
	// 		.then((response) => {
	// 			const _data = response.data.map((rowData) => ({
	// 				TITLE: rowData.id,
	// 				MEMO_TEXT: rowData.memo_text
	// 			})
	// 		)
	// 		setdata(state => state.concat(_data))
	// 		console.log(response.data);
	// 		})
	// 		.catch((error)=>{
	// 				console.log(error);
	// 		})
	// 	};

	const getData = useCallback(() => {
    console.log(Infos);
  }, []);
	


	return (
		<div>
			<h1>디비 예제</h1>
			<button onClick={getData}>
				누르고 console 확인
			</button>
		</div>
	);
};

export default DB;
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import { USER_INFO_REQUEST } from '../reducer/temp';
import { useDispatch, useSelector } from "react-redux";

const DB = () => {

	// 임시로 쓰고 있음 건들 ㄴㄴㄴ
	// 이 파일 지금 수정 중 
	const baseUrl = "http://localhost:8080";

	const [datas, setdata] = useState([{
		MID: '',
		MTITLE: '',
		MDIR: '',
		MACTOR: '',
		MSUPACTOR: '',
		MGENRE: '',
		MTIME: '',
		MDATE: '',
		MRATING: '',
		MSTORY: ''
	}]);

	async function getData() {
		await axios.get(baseUrl + "/res/movie")
			.then((response) => {
				const _data = response.data.map((rowData) => ({
					MID: rowData.mid,
					MTITLE: rowData.mtitle,
					MDIR: rowData.mdir,
					MACTOR: rowData.mactor,
					MSUPACTOR: rowData.msupactor,
					MGENRE: rowData.mgenre,
					MTIME: rowData.mtime,
					MDATE: rowData.mdate,
					MRATING: rowData.mrating,
					MSTORY: rowData.mstory
				})
			)
			setdata(state => state.concat(_data))
			console.log(response.data);
			})
			.catch((error)=>{
					console.log(error);
			})
		};

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
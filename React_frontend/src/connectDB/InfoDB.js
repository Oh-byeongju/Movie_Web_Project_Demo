import React, { useState } from "react";
import axios from 'axios';

const InfoDB = () => {
	
const baseUrl = "http://localhost:8080";


// 이 파일 지금 수정 중 
// 이 파일 지금 수정 중 

const [datas, setdata] = useState([{
	ID: '',
	MEMO_TEXT: '',
}]);

// 디비에서 데이터 select 하고 바로 리턴해줌
async function getData() {
	await axios.get(baseUrl + "/Search/select")
	.then((response) => {
			const _data = response.data.map((rowData) => ({
				TITLE: rowData.id,
				MEMO_TEXT: rowData.memo_text
			})
		)
		setdata(state => state.concat(_data))
		})
		.catch((error)=>{
				console.log(error);
		})
		return datas;
	};
};

export default InfoDB;
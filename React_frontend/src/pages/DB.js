import React, {useState} from 'react';
import axios from 'axios';

const DB = () => {

	const baseUrl = "http://localhost:8080";

	const [datas, setdata] = useState([{
		ID: '',
		MEMO_TEXT: '',
	}]);

	async function getData() {
		await axios.get(baseUrl + "/Search/select")
			.then((response) => {
				const _data = response.data.map((rowData) => ({
					TITLE: rowData.id,
					MEMO_TEXT: rowData.memo_text
				})
			)
			setdata(state => state.concat(_data))
			console.log(response);
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
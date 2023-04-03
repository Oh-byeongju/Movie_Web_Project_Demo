// 요일 구해주는 함수
export const getDayOfWeek = (day) => {
	const week = ['일', '월', '화', '수', '목', '금', '토'];
	const dayOfWeek = week[new Date(day).getDay()];
	return dayOfWeek;
}

// js 날짜를 String으로 변경하는 함수
export const DateToString = (date) => {

	if (date === null) {
		console.log("비었다.");
		return;
	}

	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	
	month = month >= 10 ? month : '0' + month;
	day = day >= 10 ? day : '0' + day;

	return year + '-' + month + '-' + day;
}
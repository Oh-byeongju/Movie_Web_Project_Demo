// 요일 구해주는 함수
export const getDayOfWeek = (day) => {
	const week = ['일', '월', '화', '수', '목', '금', '토'];
	const dayOfWeek = week[new Date(day).getDay()];
	return dayOfWeek;
}
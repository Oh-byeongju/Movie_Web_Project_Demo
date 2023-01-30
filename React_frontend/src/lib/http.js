import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
// axios instance 생성
export const http = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 주소
	withCredentials: true
});


// // 원래의 요청에서 반환된 failedRequest를 파라미터로 받아 새 액세스 토큰을 적용한 후 Promise 객체를 반환하는 함수
// const refreshAuthLogic = failedRequest => http.get('/member/normal/reissue', {
//   headers: { Authorization: undefined }, withCredentials: true // 해당 설정을 적용하여 액세스 토큰 재발급 요청
// }).then(resp => {
// 	console.log(resp);
//   const bearer = `Bearer ${resp.data.accessToken}`;
//   /* 새 액세스 토큰을 브라우저용 instance 및 failedRequest에 적용 */
//   http.defaults.headers.Authorization = bearer;
//   failedRequest.response.config.headers['Authorization'] = bearer;

//   return Promise.resolve();
// }).catch(() => Promise.reject());



// const refreshAuthLogic = (failedRequest) => {
// 	console.log(failedRequest.response.status)
// 	if (failedRequest.response.status === 400 && failedRequest.response.data.code === "S002") {
// 		http.get("/member/normal/reissue")
// 		.then((response) => {
// 			console.log(response);
// 			return Promise.resolve();
// 		})
// 		.catch((error)=>{
// 			console.log(error);
// 			Promise.reject()
// 		})
// 	}
// }

// createAuthRefreshInterceptor(http, refreshAuthLogic);
	// 
		

	// .then((response) => {
  //   return response;
  // })
  // .catch((error)=>{
  //   console.log(error.response);
  //   return error.response;
  // })


	// }


 










// var isTokenRefreshing = false;
// var refreshSubscribers = [];

// const onTokenRefreshed = () => {
//   refreshSubscribers.map((callback) => callback());
// };

// const addRefreshSubscriber = (callback) => {
//   refreshSubscribers.push(callback);
// };

// // 토큰이 만료돼서 재발급 요청을 하는경우 사용
// http.interceptors.response.use(
// 	// 오류가 없을경우(200번대) 일반적인 리턴
//   (response) => {
// 		console.log(response);
//     return response;
//   },
// 	// 오류가 발생하였을 경우
//   async (error) => {
// 		// 오류가 발생하기 이전의 요청, 오류의 상태, 오류의 코드번호를 할당
// 		const config = error.config;
// 		const status = error.response.status;
// 		const code_num = error.response.data.code;
//     const originalRequest = config;

// 		// status가 401번이고 에러 코드가 S002(토큰만료)일 경우에만 재발급 요청
//     if (status === 401) {
// 			if (code_num === "S002") {
// 				console.log("돌아유");
// 				// isTokenRefreshing이 false인 경우에만 token refresh 요청
// 				if (!isTokenRefreshing) {
// 					isTokenRefreshing = true;
// 					// 토큰 재발급 요청
// 					const result = await http.get("/member/normal/reissue");

// 					console.log("axiso 결과괎");
// 					console.log(result);

// 					isTokenRefreshing = false;
// 					// 새로운 토큰으로 지연되었던 요청 진행
// 					onTokenRefreshed();
// 				}        
// 				// token이 재발급 되는 동안의 axios 요청은 refreshSubscribers에 저장
// 				const retryOriginalRequest = new Promise((resolve) => {
// 					addRefreshSubscriber(() => {
// 						resolve(axios(originalRequest));
// 					});
// 				});
// 				return retryOriginalRequest;
//       }
//     }
//     return Promise.reject(error);
//   }
// );
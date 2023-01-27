import axios from "axios";

// 브라우저용 instance 생성
export const http = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 주소
  withCredentials: true,
});

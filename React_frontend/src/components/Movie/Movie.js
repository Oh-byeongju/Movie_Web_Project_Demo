/* 
  23-02-02 css 수정 및 Like수 적용(오병주)
  23-02-08 사용자가 누른 Like 적용(오병주)
  23-02-15 페이지 css 수정(오병주)
*/
import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_MLIKE_REQUEST } from "../../reducer/movie";
import { useLocation } from "react-router-dom";
import {
  SELECT_DAY_REQUEST,
  SELECT_THEATER_REQUEST,
  MOVIE_DATA,
} from "../../reducer/ticket";

const Movie = ({ movie }) => {
  // 반올림 없이 소수점 생성해주는 함수
  const getNotRoundDecimalNumber = (number, decimalPoint = 1) => {
    let num = typeof number === "number" ? String(number) : number;
    const pointPos = num.indexOf(".");

    if (pointPos === -1) return Number(num).toFixed(decimalPoint);

    const splitNumber = num.split(".");
    const rightNum = splitNumber[1].substring(0, decimalPoint);
    return Number(`${splitNumber[0]}.${rightNum}`).toFixed(decimalPoint);
  };

  // 리덕스 로그인 상태 정보
  const { LOGIN_data } = useSelector((state) => state.R_user_login);
  const dispatch = useDispatch();
  const location = useLocation();

  // 영화 좋아요 실패 여부 상태
  const { MLIKE_error } = useSelector((state) => state.movie);

  const OnClickReserve = (data) => {
    //allmovie(태초상태)
    //영화 클릭시 날짜 극장 검색해주면 됨
    dispatch({
      type: SELECT_THEATER_REQUEST,
      data: data.mid,
    });
    dispatch({
      type: SELECT_DAY_REQUEST,
      data: data.mid,
    });
    dispatch({
      type: MOVIE_DATA,
      data: data,
    });
  };

  // 사용자가 영화의 좋아요를 누를 때 호출되는 함수
  const LikeChange = useCallback(() => {
    if (LOGIN_data.uid === "No_login") {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    dispatch({
      type: USER_MLIKE_REQUEST,
      data: {
        mid: movie.mid,
      }
    });

  }, [movie.mid, LOGIN_data.uid, dispatch]);

  // UI에는 변경되지 않았지만 삭제된 영화 좋아요 누를 경우
  useEffect(()=> {

    if (MLIKE_error === movie.mid) {
      alert("존재하지 않는 영화입니다.");
      window.location.replace(location.pathname);
    }

  }, [MLIKE_error, movie.mid, location.pathname])

  return (
    <LI>
      <div className="Image">
        <div className="banner_img">
          <Link to={`/Moviedetail/${movie.mid}`}>
            <Img className="img2" src={movie.mimagepath} alt="영화" />
          </Link>
          <div className="middle">
            <Link to={`/Moviedetail/${movie.mid}`}>
              <Text className="hover_text">상세정보</Text>
              <TextScore>
                관람평 : &nbsp;
                <span>
                  {movie.mscore ? movie.mscore.toFixed(1) : (0.0).toFixed(1)}
                </span>
              </TextScore>
            </Link>
          </div>
        </div>
        <Des>
          <div className="title">
            <img
              className="rating"
              src={`img/age/${movie.mrating}.png`}
              alt="rating"
              style={{ width: "30px", height: "30px" }}
            />
            <span>{movie.mtitle}</span>
          </div>
          <div className="infomation">
            <span className="rate">
              예매율 {movie.reserveRate ? movie.reserveRate.toFixed(1) : (0.0).toFixed(1)}%
            </span>
            <span className="date">개봉일 {movie.mdate}</span>
          </div>
        </Des>
        <Button>
          <Like onClick={LikeChange}>
            <span>
              {movie.mlike === true ? (
                <HeartFilled style={{ color: "red" }} />
              ) : (
                <HeartOutlined />
              )}
            </span>
            <span>
              {movie.mlikes > 999
                ? getNotRoundDecimalNumber(movie.mlikes / 1000) + "K"
                : movie.mlikes}
            </span>
          </Like>
          <Link to="/reserve" state={{ state: location.pathname }}>
            <Ticket disabled={!movie.reserve} reserve={movie.reserve} onClick={() => OnClickReserve(movie)}>
              {movie.reserve ? '예매' : '상영예정'}
            </Ticket>
          </Link>
        </Button>
      </div>
    </LI>
  );
};

const LI = styled.li`
  float: left;
  padding-right: 83px;
  width: 245px;
  height: 450px;
  padding-bottom: 15px;
  .banner_img {
    position: relative;
    .middle {
      transition: 0.5s ease;
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      text-align: center;
    }
    &:hover .img2 {
      filter: brightness(0.3);
    }
    &:hover .middle {
      opacity: 1;
    }
  }
`;

const Img = styled.img`
  opacity: 1;
  display: block;
  width: 230px;
  height: 331px;
  transition: 0.5s ease;
  backface-visibility: hidden;
  cursor: pointer;
`;

const Text = styled.div`
  position: absolute;
  width: 180px;
  top: -45px;
  left: -127px;
  color: white;
  font-size: 18px;
  padding: 16px 32px;
  cursor: pointer;
  border-color: #fff;
  text-decoration: underline;
`;

const TextScore = styled.div`
  position: absolute;
  width: 180px;
  top: -10px;
  left: -130px;
  color: white;
  font-size: 1em;
  padding: 16px 32px;
  cursor: pointer;
  border-color: #fff;
  font-weight: 500;
  span {
    font-size: 1.5em;
    color: #00cccc;
  }
`;
const Des = styled.div`
  .title {
    display: block;
    padding-top: 10px;
    span {
      display: inline-block;
      overflow: hidden;
      width: 180px;
      font-size: 1.2222em;
      font-weight: 400;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 2px 0 0 1px;
      margin-left: 10px;
      position: relative;
      top: -2px;
    }
  }
  .infomation {
    display: block;
    .rate {
      position: relative;
      display: inline-block;
      font-size: 14.5px;
      font-weight: 400;
      margin: 0 7px 0 0;
      padding: 0 8px 0 0;
      ::after {
        content: "";
        display: block;
        position: absolute;
        right: 0;
        top: 50%;
        width: 1px;
        height: 13px;
        margin: -6px 0 0 0;
        background-color: #d8d9db;
      }
    }
    .date {
      position: relative;
      display: inline-block;
      font-size: 14.5px;
      font-weight: 400;
    }
  }
`;

const Button = styled.div`
  position: absolute;
  display: flex;
  padding-top: 10px;
  width: 230px;
`;

const Like = styled.div`
  position: absolute;
  cursor: pointer;
  text-align: center;
  width: 60px;
  height: 31px;
  border: 1px solid;
  font-size: 11pt;
  line-height: 31px;
  border-radius: 4px;
  span:first-child {
    margin-right: 3px;
  }
`;

const Ticket = styled.button`
  position: absolute;
  right: 0px;
  top: 8px;
  margin-left: 10px;
  text-align: center;
  width: 70%;
  padding-left: 10px;
  border-radius: 4px;
  height: 36px;
  text-align: center;
  background: ${props => props.reserve ? '#503396' : '#adadad'};
  cursor: ${props => props.reserve ? 'pointer' : 'default'};
  color: white;
  border: 0;
  font-weight: 400;
  font-size: 16px;
`; // 예매하기 버튼

export default Movie;

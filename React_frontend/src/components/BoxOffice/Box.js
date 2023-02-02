/*
 23-02-02 css 수정 및 Like수 적용(오병주)
*/
import React from "react";
import styled from "styled-components";
import { HeartOutlined } from "@ant-design/icons";

const Box = ({ movie }) => {

  // 반올림 없이 소수점 생성해주는 함수
  const getNotRoundDecimalNumber = (number, decimalPoint = 1) => {
    let num = typeof number === "number" ? String(number) : number;
    const pointPos = num.indexOf(".");
  
    if (pointPos === -1) return Number(num).toFixed(decimalPoint);
  
    const splitNumber = num.split(".");
    const rightNum = splitNumber[1].substring(0, decimalPoint);
    return Number(`${splitNumber[0]}.${rightNum}`).toFixed(decimalPoint);
  };

  return (
    <LI>
      <div className="Image">
        <div className="banner_img">
          <Img
            className="imggg"
            src={`${movie.imagepath}`}
            alt="영화"
          />
          <div className="middle">
            <Text className="hover_text">{movie.story}</Text>
          </div>
        </div>
        <Button>
          <Like>
            <HeartOutlined /> {movie.like > 999 ? getNotRoundDecimalNumber(movie.like / 1000) + "K" : movie.like} 
          </Like>
          <Ticket
            onClick={() => {
              console.log(movie);
            }}
          >
            예매
          </Ticket>
        </Button>
      </div>
    </LI>
  );
};

const LI = styled.li`
  float: left;
  padding-right: 65px;
  width: 250px;
  height: 420px;

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

    &:hover .imggg {
      filter: brightness(0.5);
    }

    &:hover .middle {
      opacity: 1;
    }
  }
`;

const Img = styled.img`
  opacity: 1;
  display: block;
  width: 100%;
  height: 370px;
  transition: 0.5s ease;
  backface-visibility: hidden;
  cursor: pointer;
  border-radius: 10px;
`;

const Text = styled.div`
  position: absolute;
  width: 200px;
  top: -180px;
  left: -134px;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
  cursor: pointer;
`;

const Button = styled.div`
  position: absolute;
  display: flex;
  padding-top: 15px;
  width: 250px;
`;

const Like = styled.div`
  position: absolute;
  cursor: pointer;
  text-align: center;
  width: 64px;
  height: 33.4px;
  border: 1px solid;
  vertical-align: middle;
  margin: 0;
  line-height: 33.4px;
  border-radius: 4px;
`;

const Ticket = styled.button`
  margin: 0;
  padding-top: 0 !important;
  border-top: 0 !important;
  position: absolute;
  right: 0; 
  margin-left: 10px;
  text-align: center;
  width: 72%;
  padding-left: 10px;
  border-radius: 4px;
  height: 36px;
  text-align: center;
  background-color: white;
  cursor: pointer;
`; //예매하기 버튼
export default Box;

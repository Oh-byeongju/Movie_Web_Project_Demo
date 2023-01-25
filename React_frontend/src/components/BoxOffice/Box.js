import React, { useEffect } from "react";
import styled from "styled-components";
import { HeartOutlined } from "@ant-design/icons";

const Box = ({ movie }) => {
  return (
    <LI>
      <div className="Image">
        <div className="banner_img">
          <Img
            className="imggg"
            src={`img/ranking/${movie.id}.jpg`}
            alt="영화"
          />
          <div className="middle">
            <Text className="hover_text">{movie.story}</Text>
          </div>
        </div>
        <Button>
          <Like>
            <HeartOutlined /> 0
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
`; //하나의 div

/* .Image {
    position: relative;
    .banner_img:hover:after,
    .banner_img:hover > .hover_text {
      display: block;
    }

    .banner_img:after,
    .hover_text {
      display: none;
    }
  } */
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
  padding-top: 10px;
  width: 250px;
`;
const Like = styled.div`
  position: absolute;
  cursor: pointer;
  text-align: center;
  width: 45px;
  height: 30px;
  border: 1px solid;
`;

const Ticket = styled.button`
  position: absolute;
  right: 0;
  top: 8px;
  margin-left: 10px;
  text-align: center;
  width: 80%;
  padding-left: 10px;
  border-radius: 4px;
  height: 36px;
  text-align: center;
  background-color: white;
  cursor: pointer;
`; //예매하기 버튼
export default Box;

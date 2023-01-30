import React from "react";
import styled from "styled-components";
import { HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  return (
    <LI>
      <div className="Image">
        <div className="banner_img">
          <Link
            to={{
              pathname: `/moviedetail/${movie.id}`,
              state: { form: true },
            }}
          >
            <Img
              className="imggg"
              src={movie.imagepath} //수정 완
              alt="영화"
            />
          </Link>

          <div className="middle">
            <Text className="hover_text">{movie.story}</Text>
          </div>
        </div>
        <Des>
          <div className="title">
            <img
              className="rating"
              src={`img/age/${movie.rating}.png`}
              alt="rating"
              style={{ width: "30px", height: "30px" }}
            />
            <span>{movie.title}</span>
          </div>
          <div className="infomation">
            <span>예매율 {}%</span>
            <span>개봉일 {movie.date}</span>
          </div>
        </Des>
        <Button>
          <Like>
            <HeartOutlined /> 0
          </Like>
          <Link to="/reserve">
            <Ticket
              onClick={() => {
                console.log(movie);
              }}
            >
              예매
            </Ticket>
          </Link>
        </Button>
      </div>
    </LI>
  );
};

const LI = styled.li`
  float: left;
  padding-right: 82px;
  width: 230px;
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
  width: 230px;
  height: 331px;
  transition: 0.5s ease;
  backface-visibility: hidden;
  cursor: pointer;
`;

const Text = styled.div`
  position: absolute;
  width: 200px;
  top: -160px;
  left: -133px;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
  cursor: pointer;
`;

const Des = styled.div`
  .title {
    display: block;
    padding-top: 10px;
    span {
      overflow: hidden;
      width: 100%;
      font-size: 1.2222em;
      font-weight: 400;
      text-overflow: ellipsis;
      padding: 2px 0 0 1px;
      margin-left: 10px;
      position: relative;
      top: -6px;
    }
    .infomation {
      span {
        display: block;
        float: left;
        font-size: 15px;
      }
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
  width: 45px;
  height: 30px;
  border: 1px solid;
`;

const Ticket = styled.button`
  position: absolute;
  right: 10px;
  top: 8px;
  margin-left: 10px;
  text-align: center;
  width: 70%;
  padding-left: 10px;
  border-radius: 4px;
  height: 36px;
  text-align: center;
  background: #503396;
  cursor: pointer;
  color: white;
  border: 0;
  font-weight: 400;
  font-size: 16px;
`; //예매하기 버튼

export default Movie;

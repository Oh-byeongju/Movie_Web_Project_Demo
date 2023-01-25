import React, { useEffect } from "react";
import Box from "./Box";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { ALLMOVIE_REQUEST } from "../../reducer/ticket";
/*onst MovieList = [
  {
    id: 1,
    src: "img/ranking/av.jpg",
    description:
      "<아바타:물의 길>은 판도라 행성에서 '제이크 설리'와 '네이티리'가 이룬 가족이 겪게 되는 무자비한 위협과 살아남기 위해 떠나야 하는 긴 여정과 전투",
  },
  {
    id: 2,
    src: "img/ranking/dunk.jpg",
    description: "슬램덩크",
  },
  {
    id: 3,
    src: "img/ranking/gentel.jpg",
    description: "젠틀맨",
  },
  {
    id: 4,
    src: "img/ranking/hero.jpg",
    description: "영웅",
  },
];*/

//이미지는 public 폴더에 넣어서 주소를 가져옴
const BoxList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ALLMOVIE_REQUEST,
    });
  }, []);
  const { allMovie } = useSelector((state) => state.ticket);

  return (
    <CardList>
      <div style={{ paddingBottom: "30px" }}>
        <Title>박스오피스</Title>
        <More>
          더 많은 영화보기 <PlusOutlined />
        </More>
      </div>
      <UL>
        {allMovie.slice(0, 4).map((movie) => (
          <Box movie={movie} key={movie.id} />
        ))}
      </UL>
    </CardList>
  );
};

const CardList = styled.div`
  color: #fff;
  position: relative;
  margin-top: 30px;
`;
const Title = styled.div`
  position: absolute;
  top: 0;
  left: 720px;
  width: 80px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;
const More = styled.div`
  position: absolute;
  font-size: 13px;
  top: 10px;
  right: 50px;
  color: #808080;
  cursor: pointer;
`;
const UL = styled.ul`
  align-items: center;
  list-style-type: none;
  padding-left: 160px;

  &:after {
    content: "";
    clear: both;
    display: block;
  }
`;

export default BoxList;

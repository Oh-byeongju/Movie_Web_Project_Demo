import React from "react";
import styled from "styled-components";
import { HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
// &nbsp; 공백 한칸
// import Parser from "html-react-parser"; 이 함수에 <br />이 들어있는 텍스를 넣음
// 그 다음   white-space: "pre-wrap"; css해주면 <br />이 사라지고 띄어쓰기가 가능.
//일단 필요한 데이터만 띄어두고
//나중에 코멘트랑 그래프 추가 수정필요**
const Details = ({ movie }) => {
  return (
    <Container>
      <Content>
        <Wrapper>
          <BaseMovie>
            <BoxImage>
              <Poster src={`/${movie.imagepath}`} alt="포스터" />
            </BoxImage>

            <BoxContent>
              <Title>
                <strong>{movie.title}</strong>
              </Title>
              <Spec>
                <dl>
                  <dt>감독 : &nbsp;</dt>
                  <dd>{movie.dir} &nbsp;</dd>
                  <dd></dd>
                  <dt>/ 배우 : &nbsp;</dt>
                  <dd>{movie.actor} </dd>
                  <br />
                  <dt>장르 : &nbsp; </dt>
                  <dd>{movie.genre} &nbsp;</dd>
                  <dt> / 기본 : &nbsp;</dt>
                  <dd>
                    {movie.rating}, {movie.time}
                  </dd>
                  <br />
                  <dt>개봉일 : &nbsp;</dt>
                  <dd>{movie.date}</dd>
                </dl>
              </Spec>
              <Like>
                <Likes>
                  <HeartOutlined /> {movie.likes.toLocaleString()}
                </Likes>
                <Link to="/reserve">
                  <Ticket
                    onClick={() => {
                      console.log(movie);
                    }}
                  >
                    예매
                  </Ticket>
                </Link>
              </Like>
            </BoxContent>
          </BaseMovie>
          <ColsContent>
            <ColsDetails>
              <Story>{Parser(movie.story)}</Story>
            </ColsDetails>
          </ColsContent>
        </Wrapper>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;

  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  word-break: break-all;
`;
const Content = styled.div`
  clear: both;
  padding-bottom: 50px;
  position: relative;
  width: 980px;
  margin: 0 auto;
`;
const Wrapper = styled.div``;
const BaseMovie = styled.div`
  padding-top: 40px;
`;
const BoxImage = styled.div`
  margin-right: 30px;
  width: 185px;
  height: 260px;
  float: left;
`;
const Poster = styled.img`
  display: block;
  width: 185px;
  height: 260px;
`;
const BoxContent = styled.div`
  width: 765px;
  float: left;
  position: relative;
`;
const Title = styled.div`
  display: block;
  color: #333333;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border-bottom: 1px solid #d9d6c8;
  padding-bottom: 10px;
  strong {
    color: #1a1919;
    font-size: 25px;
    vertical-align: middle;
  }
`;

const Spec = styled.div`
  padding-top: 18px;
  line-height: 1.6;
  color: #333333;
  font-size: 13px;
  font-weight: 700;
  dd {
    white-space: normal;
    text-overflow: clip;
    overflow: visible;
    float: left;

    margin: 0;
  }
  dt {
    float: left;
  }
`;
const Like = styled.span`
  margin-top: 30px;
  display: inline-block;
  margin-right: 3px;
  position: absolute;
  left: 0;
`;

const Likes = styled.div`
  width: 104px;
  height: 33px;
  border: 1px solid #222222;
  line-height: 33px;
  text-align: center;
  display: inline-block;
  border-radius: 4px;
  margin-right: 2px;
  color: #222222;
  font-size: 14px;
  font-weight: 400;
`;

const Ticket = styled.button`
  width: 130px;
  height: 34.6px;
  border: 1px solid #222222;
  background: #503396;

  line-height: 33px;
  text-align: center;
  display: inline-block;
  border-radius: 4px;
  margin-right: 2px;
  color: white;
  font-size: 14px;
  font-weight: 400;
`;

const ColsContent = styled.div`
  margin-top: 30px;
`;

const ColsDetails = styled.div`
  float: left;
  position: relative;
  width: 800px;
`;

const Story = styled.div`
  padding-top: 40px;
  margin-top: 35px;
  color: #333333;
  white-space: "pre-wrap";
  font-size: 14px;
  font-weight: 400;
  line-height: 1.8;
`;
export default Details;

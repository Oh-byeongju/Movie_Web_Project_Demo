/*
 23-03-11 마이페이지 css 구축(오병주)
*/
import React from 'react';
import styled from 'styled-components';
import { HeartOutlined, HeartFilled, StarFilled } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const Like= ({ data }) => {
	return (
		<ContentDetail>
			<ContentDetailMiddle>
				<BoxImage>
          <Poster src='/img/ranking/5.jpg' alt="Poster" />
        </BoxImage>
        <BoxContent>
          <Title>
          	<strong>
              타이타닉
            </strong>
						<span className="reservation">
							예매율&nbsp; {data.reserveRate ? data.reserveRate.toFixed(1) : (0.0).toFixed(1)}%
						</span>
						<span className="rate">
							관람객 평점 
							<StarFilled style={{color :"#fea408", marginLeft: "7px", marginRight: "7px"}}/>
							{data.mscore ? data.mscore.toFixed(1) : 0.0.toFixed(1)}
						</span>	
						<span className="more">
							{/* 링크넣기 */}
							<Link> 
								영화 상세정보 보기
							</Link>
						</span>
					</Title>
					<Spec>
						<dl>
							<dt>
								감독 : &nbsp;
							</dt>
							<dd>
								제임스 카메론	
							</dd>
							<br/>
							<dt>
								장르 : &nbsp; 
							</dt>
							<dd>
								로맨스
							</dd>
							<br/>
							<dt>
								상영 시간 : &nbsp;
							</dt>
							<dd>
								180분
							</dd>
							<br/>
							<dt> 
								상영 등급 : &nbsp;
							</dt>
							<dd>
								15세 이용가
							</dd>
							<br />
							<dt>
								개봉일 : &nbsp;
							</dt>
							<dd>
								2023-02-17
							</dd>
						</dl>
					</Spec>
					<Buttons>
						<Likes>
							<div>
								<span>
									<HeartFilled style={{color: "red"}} />
								</span>
								<span>
									11
								</span> 
							</div>
						</Likes>
						<Ticket disabled={!data.reserve} reserve={data.reserve}>
							{data.reserve ? '예매' : '상영예정'}
						</Ticket>         
					</Buttons>
				</BoxContent>
			</ContentDetailMiddle>
		</ContentDetail>
	);
};

const ContentDetail = styled.div`
	width: 100%;
	padding: 0 20px;
	margin-bottom: 14px;
	box-sizing: border-box;
	margin: 0;
	border: 1px solid rgb(221, 223, 225);
	margin-top: 15px;
`;

const ContentDetailMiddle = styled.div`
	display: flex;
	flex-direction: row;
	-webkit-box-pack: justify;
	justify-content: space-between;
	padding: 14px 0px 16px;
	box-sizing: border-box;
	margin: 0;
`;

const BoxImage = styled.div`
  margin-right: 25px;
  width: 148px;
  height: 224px;
  float: left;
`;

const Poster = styled.img`
  display: block;
  width: 148px;
  height: 224px;
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
  border-bottom: 1.5px solid #d9d6c8;
  padding-bottom: 10px;

  strong {
    color: #1a1919;
    font-size: 21px;
    vertical-align: middle;
  }

	.reservation {
	font-size: 13px;
	position: relative;
	vertical-align: middle;
	margin: 0 13px 0 16px;
	padding: 0 13px 0 0;

	::after {
		content: '';
		display: block;
		position: absolute;
		right: 0;
		top: 50%;
		width: 1px;
		height: 14px;
		margin: -6px 0 0 0;
		background-color: #d9d6c8;
		}
	}

	.rate {
		font-size: 13px;
		position: relative;
		vertical-align: middle;
	}
  
	.more {
		font-size: 12px;
		position: relative;
		vertical-align: middle;
		margin-left: 182px;

		a {
			text-decoration: none;
			color: rgb(170, 172, 172);
		}
	}
`;

const Spec = styled.div`
  padding-top: 2px;
  line-height: 1.8;
  color: #333333;
  font-size: 14px;
  font-weight: 700;

	dl {
		margin-top: 8px;
	}

  dd {
    white-space: normal;
    text-overflow: clip;
    overflow: visible;
    float: left;
    margin: 0;
    a:link {
      color : #6a6a6a;
    }
    a:visited {
      color : #6a6a6a;
    }
    a:hover {
      color : #000080;
      text-decoration: underline;
    }
    a:active {
      color : #000080;
      text-decoration: underline;
    }
  }
  dt {
    float: left;
  }
`;

const Buttons = styled.div`
  margin-top: 21px;
  display: inline-block;
  margin-right: 3px;
  position: absolute;
  left: 0;
`;

const Likes = styled.div`
  width: 90px;
  height: 36px;
  border: 1px solid #222222;
  line-height: 36px;
  text-align: center;
  display: inline-block;
  border-radius: 4px;
  margin-right: 2px;
  color: #222222;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  span:first-child {
    margin-right: 4px;
  }
`;

const Ticket = styled.div`
  margin-left: 4px;
  width: 106px;
  height: 36px;
  border: ${props => props.reserve ? '1px solid #222222' : '1px solid #adadad'};
  background: ${props => props.reserve ? '#503396' : '#adadad'};
  line-height: 36px;
  text-align: center;
  display: inline-block;
  border-radius: 4px;
  margin-right: 2px;
  color: white;
  font-size: 14px;
  font-weight: 400;
  cursor: ${props => props.reserve ? 'pointer' : 'default'};
`;

export default Like;
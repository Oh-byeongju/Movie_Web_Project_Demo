import React, {useState } from 'react';
import styled from 'styled-components';
import Post from './Post';

const JoinForm = () => {

	const [popup, setpopup] = useState('fasle');
	
	return (
		<div>
			<Layout>
				<Title>
					회원가입
				</Title>
				<Form>
					<CheckText>
						<CheckStar style={{marginRight: "5px"}}>
							*	
						</CheckStar>
						필수입력사항
					</CheckText>
					<InfoForm>
						<InfoTextForm>
							<InfoLeft>
								<label>
									아이디
								</label>
								<CheckStar>
									*
								</CheckStar>
							</InfoLeft>
							<InfoCenter>
								<InputText type="text" placeholder='아이디를 입력해주세요'>
								</InputText>
							</InfoCenter>
							<InfoCheck>
								중복확인
							</InfoCheck>
						</InfoTextForm>
						<InfoTextForm>
							<InfoLeft>
								<label>
									비밀번호
								</label>
								<CheckStar>
								*
								</CheckStar>
							</InfoLeft>
							<InfoCenter>
								<InputText type="password" placeholder='비밀번호를 입력해주세요'>
								</InputText>
							</InfoCenter>
						</InfoTextForm>
						<InfoTextForm>
							<InfoLeft>
								<label>
									비밀번호확인
								</label>
								<CheckStar>
								*
								</CheckStar>
							</InfoLeft>
							<InfoCenter>
								<InputText type="password" placeholder='비밀번호를 한번 더 입력해주세요'>
								</InputText>
							</InfoCenter>
						</InfoTextForm>
						<InfoTextForm>
							<InfoLeft>
								<label>
									이름
								</label>
								<CheckStar>
								*
								</CheckStar>
							</InfoLeft>
							<InfoCenter>
								<InputText type="text" placeholder='이름을 입력해 주세요'>
								</InputText>
							</InfoCenter>
						</InfoTextForm>
						<InfoTextForm>
							<InfoLeft>
								<label>
									이메일
								</label>
								<CheckStar>
								*
								</CheckStar>
							</InfoLeft>
							<InfoCenter>
								<InputText type="text" placeholder='이메일을 입력해주세요'>
								</InputText>
							</InfoCenter>
							<InfoCheck>
								중복확인
							</InfoCheck>
						</InfoTextForm>
						<InfoTextForm>
							<InfoLeft>
								<label>
									전화번호
								</label>
								<CheckStar>
								*
								</CheckStar>
							</InfoLeft>
							<InfoCenter>
								<InputText type="text" placeholder='숫자만 입력해주세요'>
								</InputText>
							</InfoCenter>
							<InfoCheck>
								인증번호 받기
							</InfoCheck>
						</InfoTextForm>
						<InfoTextForm>
							<InfoLeft>
								<label>
									주소
								</label>
								<CheckStar>
								*
								</CheckStar>
							</InfoLeft>
							<InfoCenter>
								<InputText type="text" placeholder='주소를 입력해주세요' readOnly>
								</InputText>
							</InfoCenter>
							<InfoCheck onClick={()=>{setpopup(!popup); console.log("돈다")}}>
								주소검색
							</InfoCheck>
							<div>
								{popup ? <div><Post address={popup} setAddress={setpopup}/></div> : null}
								{/* 이거 주소를 받아 왔을때 Post를 강제로 한번 더 돌게 해보자 내일 */}
							</div>
						</InfoTextForm>

					</InfoForm>
				</Form>
			</Layout>
		</div>
	);
};

export default JoinForm;

const Layout = styled.div`
	min-width: 1050px;
	margin-top: 50px;
	margin-bottom: 60px;
	background-color: #e9ecef;
`;

const Title = styled.div`
	margin-bottom: 50px;
	font-size: 28px;
	line-height: 35px;
	font-weight: 550;
	text-align: center;
	letter-spacing: -1px;
	color: rgb(51, 51, 51);
`;

const Form = styled.div`
	width: 640px;
  margin: 0px auto;
`;

const CheckText = styled.div`
	padding-bottom: 10px;
	border-bottom: 2px solid rgb(51, 51, 51);
	font-size: 13px;
	color: rgb(102, 102, 102);
	line-height: 17px;
	text-align: right;
`;

const CheckStar = styled.span`
	color: rgb(238, 106, 123);
	margin-left: 2px;
`;

const InfoForm = styled.div`
	padding: 0px;
`;

const InfoTextForm = styled.div`
	display: inline-flex;
	width: 100%;
	padding: 10px 20px;
`;

const InfoLeft = styled.div`
	width: 139px;
	padding-top: 12px;

	label{
		font-weight: 500;
    color: rgb(51, 51, 51);
    line-height: 20px;
		font-size: 15px;
	}
`;

const InfoCenter = styled.div`
	flex: 1 1 0%;
	padding-bottom: 0px;
	position: relative;
	height: 48px;
`;

const InputText = styled.input`
	width: 340px;
	height: 46px;
	padding: 2px 11px 1px 15px;
	border-radius: 4px;
	border: 1px solid rgb(221, 221, 221);
	font-weight: 400;
	font-size: 16px;
	line-height: 1.5;
	color: rgb(51, 51, 51);
	outline: none;
	box-sizing: border-box;
`;

const InfoCheck = styled.button`
	height: 44px;
	border-radius: 3px;
	display: block;
	padding: 0px 10px;
	text-align: center;
	overflow: hidden;
	width: 120px;
	height: 44px;
	border-radius: 3px;
	color: rgb(95, 0, 128);
	background-color: rgb(255, 255, 255);
	border: 1px solid rgb(95, 0, 128);
	margin-right: 20px;
	cursor: pointer;
	font-size: 14px;
`;

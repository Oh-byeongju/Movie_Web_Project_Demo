import React, {useState } from 'react';
import styled from 'styled-components';
import Post from './Post';
import TermofService from './TermofService';
import PrivacyofService from './PrivacyofService';


const JoinForm = () => {

	// 주소검색 팝업창 관리
	const [popup, setpopup] = useState(false);

	// 주소 관리를 위한 변수
	const [M_address, setM_address] = useState("");
	
	// 팝업창에서 주소 선택시 기본주소 Input에 주소 값 넣어주는 것
	const InsertAddress = (value) => {
		setM_address(value);
	}

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
								메일인증하기
								{/* 이미 사용된 메일이면 사용된 메일입니다 출력, 아니면 입력된 메일로 인증메일이 전송되었습니다 출력 */}
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
								<InputTextDiv>
								</InputTextDiv>
								<InputTextDiv>
								</InputTextDiv>
								<InputTextDiv>
								</InputTextDiv>
							</InfoCenter>
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
								<InputText type="text" placeholder='주소를 검색해주세요' readOnly value={M_address}>
								</InputText>
							</InfoCenter>
							<InfoCheck onClick={()=>{setpopup(!popup);}}>
								주소검색
							</InfoCheck>
							{popup && <div><Post setAddress={setpopup} M_address={M_address} InsertAddress={InsertAddress} /></div>}
						</InfoTextForm>
						{/* 주소를 선택하면 상세주소 칸이 생김 */}
						{M_address === '' ? null : 
						<InfoTextForm>
						<InfoLeft>
							<label>
								상세주소
							</label>
							<CheckStar>
							*
							</CheckStar>
						</InfoLeft>
						<InfoCenter>
							<InputText type="text" placeholder='상세주소를 입력해주세요'>
							</InputText>
						</InfoCenter>
					</InfoTextForm>
					}
					

					<InfoTextForm>
						<InfoLeft>
							<label>
								생년월일
							</label>
							<CheckStar>
							</CheckStar>
						</InfoLeft>
						<InfoCenter>
							<InputTextDiv>
							</InputTextDiv>
							<InputTextDiv>
							</InputTextDiv>
							<InputTextDiv>
							</InputTextDiv>
						</InfoCenter>
					</InfoTextForm>

					<InfoTextForm>
						<InfoLeft>
							<label>
								닉네임
							</label>
							<CheckStar>
							</CheckStar>
						</InfoLeft>
						<InfoCenter>
							<InputText type="text" placeholder='닉네임을 입력해주세요'>
							</InputText>
						</InfoCenter>
					</InfoTextForm>
					</InfoForm>
					<Line/>
				</Form>
				
				<Form>
					<InfoServiceForm style={{paddingBottom:"8px"}}>
						<ServiceLeft>
							<label>
								약관동의
								<CheckStar style={{marginLeft: "5px"}}>
									*
								</CheckStar>
							</label>
						</ServiceLeft>
						<ServiceCenter style={{paddingTop:"5px"}}>
							<ServiceSector>
								<Checks>
									<input type="checkbox" name="agree1" value="1" id="agree1"/>
									<label htmlFor="agree1">
										이용약관 동의
										<TextType>
											(필수)
										</TextType>
									</label>
								</Checks>
							</ServiceSector>
							<TermofService/>
						</ServiceCenter>
					</InfoServiceForm>			


					<InfoServiceForm style={{paddingTop:"0px"}}>
						<ServiceLeft>
						</ServiceLeft>
						<ServiceCenter>
							<ServiceSector>
								<Checks>
									<input type="checkbox" name="agree2" value="2" id="agree2"/>
									<label htmlFor="agree2">
										개인정보 수집 및 이용 동의
										<TextType>
											(필수)
										</TextType>
									</label>
								</Checks>
							</ServiceSector>
							<PrivacyofService/>
						</ServiceCenter>
					</InfoServiceForm>
					<ButtonForm>
						<JoinButton>
								<span>
									가입하기
								</span>
						</JoinButton>
					</ButtonForm>	
				</Form>
			</Layout>
		</div>
	);
};

export default JoinForm;

const Layout = styled.div`
	min-width: 1050px;
	margin-top: 50px;
	margin-bottom: 7px;
	background-color: #fff;
`;

const Title = styled.div`
	margin-bottom: 30px;
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

const InputTextDiv = styled.input`
	width: 100px;
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
	margin-right: 20px;
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

const Line = styled.div`
	padding: 10px 0px;
  border-bottom: 1px solid rgb(51, 51, 51);
`;

const InfoServiceForm = styled.div`
	display: inline-flex;
	width: 100%;
	padding: 10px 20px;
`;

const ServiceLeft = styled.div`
	width: 139px;
	padding-top: 12px;

	label{
		font-weight: 500;
    color: rgb(51, 51, 51);
    line-height: 20px;
		font-size: 15px;
	}
`;

const ServiceCenter = styled.div`
	flex: 1 1 0%;
`;

const ServiceSector = styled.div`
	
`;

const Checks = styled.div`
	position: relative;
	display: flex;
	padding: 8px 0px;
	padding-bottom: 15px;
	-webkit-box-pack: justify;
	justify-content: space-between;
	-webkit-box-align: center;
	align-items: center;

	input[type="checkbox"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;
    outline: 0;
    z-index: -1;
    overflow: hidden;
	}

	label {
		font-size: 14px;
		color: #2d2f43;
		font-weight: 400;
		letter-spacing: -0.02em;
	}

	input[type="checkbox"] + label:before {
    content: "";
    display: block;
    position: absolute;
    top: 42%;
    right: 7.5%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
	}

	input[type="checkbox"]:checked + label:before {
    background: url(/img/login/chk.png) no-repeat 50% 50% #5f0080;
    border-color: #5f0080;
	}
`;

const TextType = styled.span`
	color: #e5433e;
	font-weight: 400;
	padding-left: 5px;
`;


const ButtonForm = styled.div`
	display: flex;
	-webkit-box-pack: center;
	justify-content: center;
	border-top: 1px solid rgb(0, 0, 0);
	padding: 40px 0px;
	margin-top: 40px;
`;

const JoinButton = styled.button`
	display: block;
	padding: 0px 10px;
	text-align: center;
	overflow: hidden;
	width: 240px;
	height: 56px;
	border-radius: 3px;
	color: rgb(255, 255, 255);
	background-color: rgb(95, 0, 128);
	border: 0px none;
	cursor: pointer;

	span {
		display: inline-block;
    font-size: 16px;
    font-weight: 500;
	}
`;
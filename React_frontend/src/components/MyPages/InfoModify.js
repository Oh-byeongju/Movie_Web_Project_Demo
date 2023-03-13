/*
 23-03-13 마이페이지 css 구축(오병주)
*/
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const InfoModify = () => {

	/*
		지금 css만 완성했고 경고 뜨거나 하는거도 마무리 해야함

		현재 비밀번호랑 새 비밀번호는 다르게

		새 비밀번호랑 새 비밀번호 확인은 같게 만들고
		
		나머지들 디비에서 불러와서 처음에 값 넣어주는거도 해야할듯

		상세주소는 원래 뜨게 해놔야하긴함
	*/ 


	// 로그인 리덕스 상태
  const { LOGIN_data } = useSelector((state) => state.R_user_login);

	return (
		<>
		{/* 여기 제일위에 로딩 넣기 joinform보삼 */}
			<Layout>
				<Form>
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
							<CenterField>
								<InfoCenter>
									<InputText type="text" value={LOGIN_data.uid} disabled={true} >
									</InputText>
								</InfoCenter>
								<ErrorField>
									<ErrorText>

									</ErrorText>
								</ErrorField>
							</CenterField>
						</InfoTextForm>
						<InfoTextForm>
							<InfoLeft>
								<label>
									현재 비밀번호
								</label>
								<CheckStar>
								*
								</CheckStar>
							</InfoLeft>
							<CenterField>
								<InfoCenter>
									<InputText type="password" placeholder='비밀번호를 입력해주세요' >
									</InputText>
								</InfoCenter>
								<ErrorField>
									<ErrorText>

									</ErrorText>
								</ErrorField>
							</CenterField>
						</InfoTextForm>
						<InfoTextForm>
							<InfoLeft>
								<label>
									새 비밀번호
								</label>
								<CheckStar>
								*
								</CheckStar>
							</InfoLeft>
							<CenterField>
								<InfoCenter>
									<InputText type="password" placeholder='새 비밀번호를 입력해주세요' >
									</InputText>
								</InfoCenter>
								<ErrorField>
									<ErrorText>

									</ErrorText>
								</ErrorField>
							</CenterField>
						</InfoTextForm>
						<InfoTextForm>
							<InfoLeft>
								<label>
									새 비밀번호확인
								</label>
								<CheckStar>
								*
								</CheckStar>
							</InfoLeft>
							<CenterField>
								<InfoCenter>
									<InputText type="password" placeholder='새 비밀번호를 한번 더 입력해주세요'>
									</InputText>
								</InfoCenter>
								<ErrorField>
									<ErrorText>
	
									</ErrorText>
								</ErrorField>
							</CenterField>
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
							<CenterField>
								<InfoCenter>
									<InputText type="pass" placeholder='이름을 입력해 주세요' name="name" >
									</InputText>	
								</InfoCenter>
								<ErrorField>
									<ErrorText>

									</ErrorText>
								</ErrorField>
							</CenterField>
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
							<CenterField>
								<InfoCenter>
									<InputText type="text" placeholder='이메일을 입력해주세요' name="email" >
									</InputText>
								</InfoCenter>
								<ErrorField>
									<ErrorText>

									</ErrorText>
								</ErrorField>
							</CenterField>
							<InfoCheck style={{marginRight: "22px"}}>
								메일인증하기(현재미구현)
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
							<CenterField>
								<InfoCenter>
									<InputTextDiv type='text' value='010' readOnly>
									</InputTextDiv>
									<InputTextDiv type='text' name='phone1' maxLength={4} >
									</InputTextDiv>
									<InputTextDiv	type='text' name='phone2' maxLength={4} >
									</InputTextDiv>
								</InfoCenter>
								<ErrorField>
									<ErrorText>

									</ErrorText>
								</ErrorField>
							</CenterField>
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
								<InputText type="text" placeholder='주소를 검색해주세요' readOnly>
								</InputText>
							</InfoCenter>
							<InfoCheck >
								주소검색
							</InfoCheck>
							
						</InfoTextForm>
						{/* 주소를 선택하면 상세주소 칸이 생김 */}
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
								<InputText type="text" placeholder='상세주소를 입력해주세요' >
								</InputText>
							</InfoCenter>
						</InfoTextForm>
						
						<InfoTextForm>
							<InfoLeft>
								<label>
									생년월일
								</label>
								<CheckStar>
									*
								</CheckStar>
							</InfoLeft>
							<CenterField>
								<InfoCenter>
									<InputTextDiv type="text" placeholder='YYYY' maxLength={4} >
									</InputTextDiv>
									<InputTextDiv type="text" placeholder='MM' maxLength={2}>
									</InputTextDiv>
									<InputTextDiv type="text" placeholder='DD' maxLength={2} >
									</InputTextDiv>
								</InfoCenter>
								<ErrorField>
									<ErrorText>

									</ErrorText>
								</ErrorField>
							</CenterField>
						</InfoTextForm>
					</InfoForm>
					<Line/>
				</Form>
				<Form>
					<ButtonForm>
						<LeaveButton>
							<span>
								회원탈퇴
							</span>
						</LeaveButton>
						<JoinButton>
							<span>
								회원정보수정
							</span>
						</JoinButton>
					</ButtonForm>	
					<Notice>
						회원을 탈퇴할 경우 사용자가 대한 모든 기록이 삭제됩니다.
					</Notice>
				</Form>
			</Layout>
		</>
	);
};

const Layout = styled.div`
	width: 700px;
	margin: 0px auto;
	padding: 7px 60px 7px 60px;
	border-top: 2px solid rgb(51, 51, 51);
	margin-top: 5px !important;
`;

const Form = styled.div`
	width: 640px;
  margin: 0 auto;
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

const CenterField = styled.div`
	flex: 1 1 0%;
	box-sizing: border-box;
  margin: 0;
`;

const InfoCenter = styled.div`
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
	text-align: center;
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
	margin-left: 20px;
	cursor: pointer;
	font-size: 14px;

	:disabled {
  	border-color: rgb(221, 221, 221);
    color: rgb(221, 221, 221);
	}
`;

const Line = styled.div`
	padding: 10px 0px;
  border-bottom: 1px solid rgb(51, 51, 51);
`;

const ButtonForm = styled.div`
	display: flex;
	-webkit-box-pack: center;
	justify-content: center;
	padding: 30px 0px 25px 0px;
	margin-top: 0px;
`;

const JoinButton = styled.button`
	display: block;
	padding: 0px 10px;
	text-align: center;
	overflow: hidden;
	width: 160px;
	height: 56px;
	border-radius: 3px;
	color: rgb(255, 255, 255);
	background-color: rgb(95, 0, 128);
	border: 0px none;
	cursor: pointer;
	margin-left: 20px;

	span {
		display: inline-block;
    font-size: 16px;
    font-weight: 500;
	}
`;

const LeaveButton = styled.button`
	display: block;
	padding: 0px 10px;
	text-align: center;
	overflow: hidden;
	width: 160px;
	height: 56px;
	border-radius: 3px;
	color: rgb(95, 0, 128);
	background-color: rgb(255, 255, 255);
	border: 1px solid rgb(95, 0, 128);
	cursor: pointer;

	span {
		display: inline-block;
    font-size: 16px;
    font-weight: 500;
	}
`;

const Notice = styled.span`
	display: block;
	line-height: 1.43;
	text-align: center;
	color: rgb(102,102,102);
`

const ErrorField = styled.div`
	box-sizing: border-box;
	margin: 0;
`;

const ErrorText = styled.p`
	font-size: 13px;
	font-weight: bold;
	color: rgb(240, 63, 64);
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	margin-left: 5px;
`;

export default InfoModify;
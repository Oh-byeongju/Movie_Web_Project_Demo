import React, { useState } from "react";
import styled from "styled-components";
import { Button, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { style } from "@mui/system";
import { set } from "date-fns";
import SeatButton from "./SeatButton";

const ButtonGroup = Button.Group;
const Seat = () => {
  const [numAdult, setNumAdult] = useState(0); //어른
  const [numTeenager, setNumTeenager] = useState(0); //학생
  const [numKid, setNumKid] = useState(0); //애기
  const [selectedUser, setSelectedUser] = useState([0]); //선택한 값
  const [priceInfo, setPriceInfo] = useState([0]); //값 더하기 //여기 배열로 값을 저장
  const [rows, setRows] = useState([
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
  ]); //결국 데이터를 받아오려면 한번에 다 받아와야함 A1,A2,A3,A4,A5,A6~B1,B2,B3,B4,B5,B6 이런식
  // 열의 차이를 줘야함

  const [userType, setUserType] = useState([
    //어른 학생 유아별로 가격나눔
    { ADULT: 10000 },
    { TEENAGER: 5000 },
    { KID: 3000 },
  ]);
  const totalNumber = numTeenager + numAdult + numKid; //셋이 더해 8 이 넘으면 안됨

  const plusHandlerAdult = () => {
    if (totalNumber < rows.length) {
      setNumAdult((prev) => prev + 1);
      setSelectedUser((prev) => [...prev, "ADULT"]);
      setPriceInfo((prev) => [...prev, userType[0].ADULT]);
      console.log(priceInfo);
      console.log(selectedUser);
    }
  };

  const plusHandlerTeenager = () => {
    if (totalNumber < rows.length) {
      setNumTeenager((prev) => prev + 1);
      setSelectedUser((prev) => [...prev, "TEENAGER"]);
      setPriceInfo((prev) => [...prev, userType[1].TEENAGER]);
      console.log(priceInfo);
      console.log(selectedUser);
    }
  };

  const plusHandlerKid = () => {
    if (totalNumber < rows.length) {
      setNumKid((prev) => prev + 1);
      setSelectedUser((prev) => [...prev, "KID"]);
      setPriceInfo((prev) => [...prev, userType[2].KID]);
      console.log(priceInfo);
      console.log(selectedUser);
    }
  };

  const minusHandlerAdult = () => {
    if (numAdult) {
      setNumAdult((prev) => prev - 1);
    }
  };
  const minusHandlerTeenager = () => {
    if (numTeenager) {
      setNumTeenager((prev) => prev - 1);
    }
  };

  const minusHandlerKid = () => {
    if (numKid) {
      setNumKid((prev) => prev - 1);
    }
  };
  return (
    <SeatWrapper>
      <SeatContent>
        <Title>인원 / 좌석</Title>
        <PersonScreen>
          <NumberOfPeople>
            <NumberContainer>
              <People>
                <span>유아</span>
                <ButtonGroup style={{ marginLeft: "15px" }}>
                  <Button
                    onClick={minusHandlerKid}
                    icon={<MinusOutlined />}
                    style={{ width: "32px", height: "32px" }}
                  />
                  <Button
                    value={numKid}
                    style={{
                      width: "52px",
                      paddingLeft: "18px",
                    }}
                  >
                    {numKid}
                  </Button>
                  <Button
                    onClick={plusHandlerKid}
                    icon={<PlusOutlined />}
                    style={{ width: "32px", height: "32px" }}
                  />
                </ButtonGroup>
              </People>
              <People>
                <span>학생</span>
                <ButtonGroup style={{ marginLeft: "15px" }}>
                  <Button
                    onClick={minusHandlerTeenager}
                    icon={<MinusOutlined />}
                    style={{ width: "32px", height: "32px" }}
                  />
                  <Button
                    disable="disable"
                    value={numTeenager}
                    style={{
                      width: "52px",
                      paddingLeft: "18px",
                    }}
                  >
                    {numTeenager}
                  </Button>
                  <Button
                    onClick={plusHandlerTeenager}
                    icon={<PlusOutlined />}
                    style={{ width: "32px", height: "32px" }}
                  />
                </ButtonGroup>
              </People>
              <People>
                <span>노인</span>
                <ButtonGroup style={{ marginLeft: "15px" }}>
                  <Button
                    onClick={minusHandlerAdult}
                    icon={<MinusOutlined />}
                    style={{ width: "32px", height: "32px" }}
                  />
                  <Button
                    disable="disable"
                    value={numAdult}
                    style={{
                      width: "52px",
                      paddingLeft: "18px",
                    }}
                  >
                    {numAdult}
                  </Button>
                  <Button
                    onClick={plusHandlerAdult}
                    icon={<PlusOutlined />}
                    style={{ width: "32px", height: "32px" }}
                  />
                </ButtonGroup>
              </People>
            </NumberContainer>
          </NumberOfPeople>
          <MovieInfo>
            <Movie></Movie>
          </MovieInfo>
        </PersonScreen>
        <ScreenSelect>
          {rows.map((row, index) => {
            if (row.includes("A")) {
              return <SeatButton row={row} key={index} id={row} />;
            }
          })}
        </ScreenSelect>
        <ScreenSelect>
          {rows.map((row, index) => {
            if (row.includes("B")) {
              return <SeatButton row={row} key={index} id={row} />;
            }
          })}
        </ScreenSelect>{" "}
        <ScreenSelect>
          {rows.map((row, index) => {
            if (row.includes("C")) {
              return <SeatButton row={row} key={index} id={row} />;
            }
          })}
        </ScreenSelect>
      </SeatContent>
    </SeatWrapper>
  );
};

export default Seat;

const SeatWrapper = styled.div`
  display: block;
  min-height: 530px;
  width: 100%;
`;
const SeatContent = styled.div`
  float: none;
  width: 992px;
  min-height: 528px;
  position: relative;
  float: left;
  height: 100%;
  margin-left: 2px;
  background-color: #f2f0e5;
  overflow: hidden;
  left: 280px;
`;

const Title = styled.div`
  position: relative;
  height: 33px;
  line-height: 33px;
  text-align: center;
  background-color: #333333;
  color: white;
  font-weight: bold;
`;

const ScreenSelect = styled.div`
  display: flex;
`;

const PersonScreen = styled.div`
  position: relative;
  border-bottom: 2px solid #d4d3c9;
  display: inline-block;
  width: 100%;
`;
const MovieInfo = styled.div`
  width: 100%;
`;
const Movie = styled.div`
  min-height: 100px;
  padding: 10px 0 10px 20px;
  background-color: #f2f4f5;
  border: 1px solid #d8d9db;
`;
const NumberOfPeople = styled.div`
  width: 100%;
`;
const NumberContainer = styled.div`
  min-height: 52px;
  padding: 10px 0 10px 20px;
  background-color: #f2f4f5;
  border: 1px solid #d8d9db;
`;
const People = styled.div`
  display: block;
  float: left;
  position: relative;
  left: 200px;
  top: 10px;
  padding-right: 30px;
`;

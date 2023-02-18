import React, { useState } from "react";
import styled from "styled-components";
import { Button, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { style } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { set } from "date-fns";
import { SEAT_CHOICE, SEAT_REMOVE } from "../../reducer/seat";
import SeatButton from "./SeatButton";

const ButtonGroup = Button.Group;
const Seat = () => {
  const [numAdult, setNumAdult] = useState(0); //어른
  const [numTeenager, setNumTeenager] = useState(0); //학생
  const [numKid, setNumKid] = useState(0); //애기
  const [selectedUser, setSelectedUser] = useState([]); //선택한 값
  const [priceInfo, setPriceInfo] = useState([]); //값 더하기 //여기 배열로 값을 저장
  const [selected, setSelected] = useState([]); //선택한 자리
  const [selectedRows, setSelectedRows] = useState([]);
  const { rows, choiceSeat } = useSelector((state) => state.seat);
  //결국 데이터를 받아오려면 한번에 다 받아와야함{location: A1,A id:2}2,A3,A4,A5,A6~B1,B2,B3,B4,B5,B6 이런식
  // 열의 차이를 줘야함 그리고 점유 확인, id값을 받아오고
  const dispatch = useDispatch();
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
    }
  };

  const plusHandlerTeenager = () => {
    if (totalNumber < rows.length) {
      setNumTeenager((prev) => prev + 1);
      setSelectedUser((prev) => [...prev, "TEENAGER"]);
      setPriceInfo((prev) => [...prev, userType[1].TEENAGER]);
    }
  };

  const plusHandlerKid = () => {
    if (totalNumber < rows.length) {
      setNumKid((prev) => prev + 1);
      setSelectedUser((prev) => [...prev, "KID"]);
      setPriceInfo((prev) => [...prev, userType[2].KID]);
    }
  };

  const minusHandlerAdult = () => {
    if (totalNumber <= choiceSeat.length) {
      alert("오류");
    } else if (numAdult) {
      setNumAdult((prev) => prev - 1);
    }
  };
  const minusHandlerTeenager = () => {
    if (totalNumber <= choiceSeat.length) {
      alert("오류");
    } else if (numTeenager) {
      setNumTeenager((prev) => prev - 1);
    }
  };

  const minusHandlerKid = () => {
    if (totalNumber <= choiceSeat.length) {
      alert("오류");
    } else if (numKid) {
      setNumKid((prev) => prev - 1);
    }
  };

  const addSeats = (row) => {
    if (totalNumber > selectedRows.length) {
      setSelectedRows((prev) => [...prev, row]);

      dispatch({
        type: SEAT_CHOICE,
        data: {
          user_id: 1,
          type: selectedUser[0],
          price: priceInfo[0],
          seat_id: row.id,
          location: row.location,
        },
      });

      const copyUser = selectedUser;
      const copyPrice = priceInfo;
      copyUser.shift();

      copyPrice.shift();
      setSelectedUser(copyUser);
      console.log("selected: " + selected);
      setPriceInfo(copyPrice);
      console.log("price : " + priceInfo);
    }
  };

  const removeSeats = (seat) => {
    setSelectedRows((prev) => prev.filter((row) => row.id !== seat));
    dispatch({
      type: SEAT_REMOVE,
      data: seat,
    });
    console.log(seat);
  };
  return (
    <SeatWrapper>
      <SeatContent>
        <Title
          onClick={() => {
            console.log("selecteduser : " + selectedUser);
            console.log("princeinfo : " + priceInfo);
          }}
        >
          인원 / 좌석
        </Title>
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
          <Screen></Screen>

          <SeetReserve>
            {rows.map((row, index) => (
              <div>
                <SeatButton
                  row={row}
                  key={row.id}
                  addSeats={addSeats}
                  totalNumber={totalNumber}
                  selectedRows={selectedRows}
                  removeSeats={removeSeats}
                />
              </div>
            ))}
          </SeetReserve>
        </ScreenSelect>
      </SeatContent>
    </SeatWrapper>
  );
};

export default Seat;

const SeatWrapper = styled.div`
  display: block;
  min-height: 710px;
  width: 100%;
  height: 100%;
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
  min-height: 600px;
  width: 100%;
`;

const SeetReserve = styled.div`
  width: 460px;
  height: 100%;
  padding-left: 250px;
  position: absolute;
  top: 250px;
`;
const Screen = styled.div`
  background-color: #fff;
  position: absolute;
  margin-top: 30px;
  left: 250px;
  width: 450px;
  height: 80px;
  transform: rotateX(-20deg);
  box-shadow: 0 3px 10px rgb(255 255 255 / 70%);
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
const Movie = styled.div``;
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
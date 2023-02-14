import { style } from "@mui/system";
import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Badge, Button, Space, Switch, Input } from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

const ButtonGroup = Button.Group;

const Seat = () => {
  const [teen, setTeen] = useState(0);
  const [adult, setAdult] = useState(0);
  const [old, setOld] = useState(0);

  const increase = (data, setData) => {
    setData(data + 1);
  };
  const decline = (data, setData) => {
    let newCount = data - 1;
    if (newCount < 0) {
      newCount = 0;
    }
    setData(newCount);
  };
  return (
    <SeatWrapper>
      <SeatContent>
        <Title>인원 / 좌석</Title>
        <NumberPeople>
          <PersonScreen>
            <NumberOfPeople>
              <Space direction="vertical">
                <Space size="large">
                  <People>
                    <span>학생</span>
                    <ButtonGroup style={{ marginLeft: "15px" }}>
                      <Button
                        onClick={() => {
                          decline(teen, setTeen);
                        }}
                        icon={<MinusOutlined />}
                        style={{ width: "32px", height: "32px" }}
                      />
                      <Button
                        disable="disable"
                        value={teen}
                        style={{
                          width: "52px",
                          paddingLeft: "18px",
                        }}
                      >
                        {teen}
                      </Button>
                      <Button
                        onClick={() => {
                          increase(teen, setTeen);
                        }}
                        icon={<PlusOutlined />}
                        style={{ width: "32px", height: "32px" }}
                      />
                    </ButtonGroup>
                  </People>
                  <People>
                    <span>성인</span>
                    <ButtonGroup style={{ marginLeft: "15px" }}>
                      <Button
                        onClick={() => {
                          decline(adult, setAdult);
                        }}
                        icon={<MinusOutlined />}
                        style={{ width: "32px", height: "32px" }}
                      />
                      <Button
                        disable="disable"
                        value={adult}
                        style={{
                          width: "52px",
                          paddingLeft: "18px",
                        }}
                      >
                        {adult}
                      </Button>
                      <Button
                        onClick={() => {
                          increase(adult, setAdult);
                        }}
                        icon={<PlusOutlined />}
                        style={{ width: "32px", height: "32px" }}
                      />
                    </ButtonGroup>
                  </People>
                  <People>
                    <span>노인</span>

                    <ButtonGroup style={{ marginLeft: "15px" }}>
                      <Button
                        onClick={() => {
                          decline(old, setOld);
                        }}
                        icon={<MinusOutlined />}
                        style={{ width: "32px", height: "32px" }}
                      />
                      <Button
                        disable="disable"
                        value={old}
                        style={{
                          width: "52px",
                          paddingLeft: "18px",
                        }}
                      >
                        {old}
                      </Button>
                      <Button
                        onClick={() => {
                          increase(old, setOld);
                        }}
                        icon={<PlusOutlined />}
                        style={{ width: "32px", height: "32px" }}
                      />
                    </ButtonGroup>
                  </People>
                </Space>
              </Space>
            </NumberOfPeople>
          </PersonScreen>
        </NumberPeople>
        <ScreenSelect></ScreenSelect>
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

const NumberPeople = styled.div`
  float: left;
  width: 100%;
  height: 131px;
  position: relative;
  border-bottom: 2px solid rgb(212, 211, 201);
  display: inline-block;
  padding: 17px 0px 3px;
  width: 100%;
`;
const ScreenSelect = styled.div``;

const PersonScreen = styled.div`
  position: relative;
  border-bottom: 2px solid rgb(212, 211, 201);
  display: inline-block;
  padding: 17px 0px 3px;
  width: 100%;
`;
const NumberOfPeople = styled.div`
  float: left;
  width: 80%;
  height: 100%;
  position: relative;
  float: left;
  height: 100%;
  top: -13px;
  left: 190px;
  margin-left: 2px;
  background-color: rgb(242, 240, 229);
  overflow: hidden;
`;
const People = styled.div`
  float: left;
  margin-right: 30px;
  span {
  }
`;

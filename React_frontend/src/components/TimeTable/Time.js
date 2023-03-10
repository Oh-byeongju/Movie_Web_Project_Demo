import React from "react";
import styled from "styled-components";
const Time = ()=>{
    return(
        <TimeSchedule>
                    <Wrap>
                        <button className="btn-pre">
                            이전
                        </button>
                        <DateList>
                            <DateArea>
                                <Date>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>
                                    <button><em>11<span>월</span></em></button>


                                </Date>
                            </DateArea>
                        </DateList>
                        <button className="btn-next">
                            이후
                        </button>
                    </Wrap>
                </TimeSchedule>
    )
}

const TimeSchedule = styled.div`
width: 100%;
`
const Wrap = styled.div`
height: 73px;
    border: 1px solid #d8d9db;
    border-right: 0;
    border-left: 0;
    position: relative;
    .btn-pre{
        width: 30px;
    height: 73px;
    border: 0!important;
    background-color: transparent!important;
    float: left;
    }
    .btn-next{
        width: 30px;
        height: 73px;
        border: 0!important;
        background-color: transparent!important;
        float: left;
    }
`
const DateList = styled.div`
width: 980px;
    overflow: hidden;
    float: left;
    height: 72px;
`
const DateArea =styled.div`
height: 73px;
    float: left;
    
`
const Date = styled.div`
position: relative;
    width: 2100px;
    border: none;
    left: -70px;
    button{
        width: 70px;
    height: 72px;
    border: 0;
    background-color: transparent;
    float: left;
    border-bottom: 3px solid transparent;
    font-weight: 400;
    cursor: pointer;
    letter-spacing: -.5px;
    font-weight: 400;
    font-family: NanumBarunGothic,Dotum,'돋움',sans-serif;
    }
`
export default Time;

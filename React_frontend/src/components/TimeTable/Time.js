import React ,{useState,useRef}from "react";
import moment from "moment";
import styled from "styled-components";
import "moment/locale/ko";
const Time = ()=>{
    moment.locale('ko')
   

    const week = [];
    const day =[];
    const today = moment().format("YYYY-MM-DD")
    const tomorrow = moment().add('days',1).format("YYYY-MM-DD"); 
    for(let i = 0 ; i < 14; i++){
        week[i] = moment().add('days',i).format("YYYY-MM-DD"); 
        day[i]= moment().add('days',i).format('dddd');
        
    }
    
    return(
        <TimeSchedule>
                    <Wrap>
                        <button className="btn-pre" onClick={()=>{
                        
                        }}>
                            이전
                        </button>
                        <DateList>
                            <DateArea>
                                <Date>
                                 {week.map((week,index)=>{
                                    return(
                                      <Button
                                        className={day[index]==="토요일" ?"blue day" : day[index]==="일요일" ? "red day" : day }>
                                        <span className="month">{week}</span>
                                        <em>{week.substring(8,10)}
                                        <br />
                                        {week===today ? 
                                        <span className="day">오늘</span>
                                        :
                                        week===tomorrow?
                                            <span className="day">내일</span>:

                                        <span className="day">{day[index].substring(0,1)}</span>}
                                    </em>
                                      </Button>
                                    )
                                 })}


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
    left: 0px;
    .blue{
        color:blue;
    }
    .red{
        color:red;
    }
`

const Button = styled.button`
width: 70px;
    height: 72px;
    border: 0;
    background-color: transparent;
    float: left;
    border-bottom: 3px solid transparent;
    font-weight: 400;

    .month{
        text-indent: -9999px;
        position: fixed;
        top: -9999px;
        font-size: 1px;
        width: 1px;
        height: 1px;
        opacity: 0;
    }
    em{
        display: block;
        font-size: 1.2em;
        line-height: 1.1;
        padding: 5px 0;
        font-weight: 500;
    }
    .day{
        vertical-align: bottom;
        line-height: 1.1;
    }
`
export default Time;

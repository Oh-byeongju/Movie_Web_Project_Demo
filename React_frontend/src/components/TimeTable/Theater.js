import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  ALLTHEATER_REQUEST,
} from "../../reducer/ticket";
import { THEATER_DATAS } from "../../reducer/TimeTable";
const Theater = () =>{
    let 서울 =0;
    let 경기= 0;
    let 인천 =0;
    let 부산 =0;
    useEffect(()=>{dispatch({
        type:ALLTHEATER_REQUEST
    })
   
},[])
    const {
        allTheater
      } = useSelector((state) => state.ticket);
    const { city} =useSelector((state)=>state.TimeTable)

      const [ tab, setTab] = useState("서울");
      const tabClick= (index)=>
      {
          setTab(index);
      }
      
      //카운팅 매핑
      allTheater.map((t)=>{
        if(t.tarea==="서울"){
            서울++;
        }
        else if(t.tarea==="경기"){
            경기++;
        }
        else if(t.tarea==="인천"){
            인천++;
        }
        else{
            부산++;
        }
    })

    const dispatch = useDispatch();
    return(<TheaterWrapper>
        <Wrapper>
        <ListChoice>
            <ul>
                <li onClick={()=>tabClick("서울")}
                className={tab==="서울" ? "tab menu"  : tab}>서울({서울})</li>
                <li onClick={()=>tabClick("경기")}
                 className={tab==="경기" ? "tab menu"  : tab}>경기({경기})</li>
                <li onClick={()=>tabClick("인천")}
                 className={tab==="인천" ? "tab menu"  : tab}>인천({인천})</li>
                <li onClick={()=>tabClick("부산")}
                 className={tab==="부산" ? "tab menu"  : tab}>부산({부산})</li>
            </ul>
        </ListChoice>
        <ListSection>
            <ScrollBar>
                <TheaterContainer>
                    <ul>
                       {tab==="서울" ? <>{allTheater.map((t)=>{
                            if(t.tarea===tab){
                                서울++
                                return(
                                    <TheaterLi onClick={()=>{
                                        dispatch({
                                            type:THEATER_DATAS,
                                            data:t.tname
                                        })
                                    }
                                    }
                                    city={city}
                                    cityName={t.tname}
                                    >
                                        {t.tname}
                                    </TheaterLi>
                                )
                            }
                       })}</> : ""}
                       {tab==="경기" ? <>{allTheater.map((t)=>{
                            if(t.tarea===tab){
                                경기++
                                return(
                                    <TheaterLi
                                    onClick={()=>{
                                        dispatch({
                                            type:THEATER_DATAS,
                                            data:t.tname
                                        })
                                    }
                                    }
                                    city={city}
                                    cityName={t.tname}
                                    >
                                        {t.tname}
                                    </TheaterLi>
                                )
                            }
                       })}</> : ""}
                       {tab==="인천" ? <>{allTheater.map((t)=>{
                            if(t.tarea===tab){
                                인천++
                                return(
                                    <TheaterLi
                                    onClick={()=>{
                                        dispatch({
                                            type:THEATER_DATAS,
                                            data:t.tname
                                        })
                                    }
                                    }
                                    city={city}
                                    cityName={t.tname}>
                                        {t.tname}
                                    </TheaterLi>
                                )
                            }
                       })}</>  : ""}
                       {tab==="부산" ? <>{allTheater.map((t)=>{
                            if(t.tarea===tab){
                                부산++
                                return(
                                    <TheaterLi
                                    onClick={()=>{
                                        dispatch({
                                            type:THEATER_DATAS,
                                            data:t.tname
                                        })
                                    }
                                    }
                                    city={city}
                                    cityName={t.tname}>
                                        {t.tname}
                                    </TheaterLi>
                                )
                            }
                       })}</> : ""}
                       </ul>
                </TheaterContainer>
            </ScrollBar>
        </ListSection>
        </Wrapper>
    </TheaterWrapper>)
}
const TheaterWrapper = styled.div`
position: absolute;
    left: 164px;
    top: 0
    display: block;
    width: calc(100% - 164px);
    height: 300px;
    padding: 0;
    
`
const Wrapper = styled.div`
float: left;
    position: relative;
    width: 100%;
    height: 100%;
`
const ListSection = styled.div`
overflow: hidden;
height: 240px;
padding: 20px 0;
`
const ScrollBar = styled.div`
height: 200px;
position: relative;
overflow: hidden;
height: 100%;
max-width: 100%;
outline: 0;
direction: ltr;   
max-height: none;
`
const TheaterContainer = styled.div`
position: relative;
    top: 0;
    left: 0;
    overflow:auto;
    height:100%;

    ul{
        overflow: hidden;
        position: relative;
        display: block;
        min-height: 138px;
        list-style-type: none;
    margin: 0;
    padding: 0;
    }
`
const ListChoice = styled.div`
width: 100%;
height: 54px;
border-bottom: 1px solid #d8d9db;
ul{
    position:relative;
    right:30px;
    list-style-type: none;
    padding-top:24px;
    .menu {
        border-bottom: 
        2px solid #555;
        font-weight: 400;
    }
    li{
        cursor:pointer;
        float: left;font-size: .9333em;
        margin-right: 15px;
        text-decoration: none;
        color: #555;
        border-bottom: 2px solid #fff;
        padding-bottom: 9px;
        letter-spacing: -1px;
    }
}
`
const TheaterLi=styled.li`
background-color: ${(props) =>
    props.cityName ===  props.city? "grey" : "white"};

    float: left;
    width: 25%;
    padding: 0;
    cursor:pointer;
    button{
        display: block;
        width: 100%;
        height: 50px;
        margin: 0;
        padding: 0 28px 0 10px;
        color: #444;
        border: 0;
        text-align: left;
        background-color: transparent;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        letter-spacing: -.5px;
        font-weight: 400;
        font-family: NanumBarunGothic,Dotum,'돋움',sans-serif;
    }

`


export default Theater;
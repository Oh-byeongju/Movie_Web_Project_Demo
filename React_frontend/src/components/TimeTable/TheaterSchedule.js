import styled from "styled-components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SELECT_SC_THEATER_REQUEST } from "../../reducer/TimeTable";
import * as ReserveLogin from "../Common_components/Function";
import { useNavigate } from "react-router-dom";
const TheaterSchedule = () =>{
    const navigate = useNavigate();

    const { area,dayone,city,theater} =useSelector((state)=>state.TimeTable)
    const dispatch = useDispatch();
  useEffect(()=>{
    dispatch({
        type:SELECT_SC_THEATER_REQUEST,
        data:{
            mid:0,
            miday:dayone,
            area:"",
            tid:city,
            message:"theater"
        }
    })
  },[city,dayone])
    return(<>
        <ReverseTheaterWrapper>
                {theater.map((th)=>
                        <TheaterList>
    
                <TheaterArea>
                <Img src={`img/age/${th.rating}.png`} alt="영화" />
                 <a>{th.theater}</a>
                 <TheaterTime>
                    <a>상영중<span>/상영시간 {th.time}분</span></a>
                </TheaterTime>
                </TheaterArea>
               
                {th.infoMapper.map((info)=>
                <CinemaTypeWrapper>
                    <CinemaType>
                    <p className="theater-type">{info.name}</p>
                    <p className="chair">{info.people}명</p>
                    </CinemaType>
                    <CinemaTime>
                        <Type>{info.type}</Type>
                        <Time>
                        <table>
                            <tbody>
                            <tr>
                                {info.history.map((movieinfo)=>
                                 <td
                                 onClick={()=>{
                                    ReserveLogin.f1({
                                        movie:{id:th.mid,
                                        title:th.theater,
                                        time:th.time,
                                        imagepath:th.image,
                                        rating:th.rating},
                                        theater:{tid:info.tid,
                                        tarea:area,
                                        tname:info.area
                                    },
                                        Day:{miday:dayone},
                                        schedule:{miid:movieinfo.miid,
                                        cid: info.cid,
                                        type: info.name,
                                        name:info.type,
                                        miday:dayone,
                                        mistarttime:movieinfo.start,
                                        miendtime:movieinfo.end
                                    }
                                    }, dispatch);
                                    navigate("/reserve")
    
                                }}>
                                 <div>
                                     <a>
                                         <p>
                                             {movieinfo.start.substring(11, 16)}
                                         </p>
                                         <p>
                                             {info.people-movieinfo.count}석
                                         </p>
                                     </a>
                                 </div>
                             </td>
                                )}
                               
                            </tr>
                            </tbody>
                        </table>
                        </Time>
                    </CinemaTime>
                </CinemaTypeWrapper>)
    }
                </TheaterList>
    )}
        </ReverseTheaterWrapper>
        </>)
    }
    const ReverseTheaterWrapper = styled.div`
    width:100%;
    display:table;
    border-top:0;
    padding-top:30px;
    `
    const TheaterTab =styled.div`
    position:relative;
    right:40px;
    width:100%;
    border-bottom:30px !important;
    height:36px;
    padding-bottom:40px;
    ul{
        list-style-type:none;
        width:100%;
        .hover {
            background-color: grey;
            border-right: none;
        
           }
        
       li{
        cursor:pointer;
        float:left;
        width:137px;
        height:34px;
        border:1px solid #d8d9db;
        a{
            display:block;
            width:100%:
            height:34px;
            margin:0;
            padding:0;
            border:0;
            line-height:36px;
            text-align:center;
            text-decoration:none;
        }
    }
    }
    `
    const TheaterList = styled.div`
    position:relative;
    padding-bottom:50px;
    `
    const TheaterArea = styled.div`
        padding:0 0 15px 0;
        border-bottom: 1px solid #eaeaea;
        font-weight:700;
        font-size:1.2em;
        a{
            color:#444;
            text-decoration:none;
    
        }
    `
    const CinemaTypeWrapper =styled.div`
        overflow:hidden;
        width:100%;
        position:relative;
        border-bottom:1px solid #eaeaea;
        height:112px;
        padding-bottom:30px;
    `
    const CinemaType =styled.div`
        text-align:left;
        width:170px;
        display:table-cell;
        vertical-align:middle;
        position:absolute;
        top:0;
        left:0;
        padding:0!important;
        float:left;
    
        .theater-type{
            font-size:1.2em;
            color:#444;
            font-weight:400;
            margin-bottom:10px;
            line-height:1em;
        }
    `
    const CinemaTime = styled.div`
        width:100%;
        float:left;
        margin:20px 0;
        margin-left:190px;
    
    
    `
    const Type = styled.div`
    display:table-cell;
    vertical-align:middle;
    width:100px;
    height:70px;
    background-color:#f2f4f5;
    text-align:center;
    color:#444;
    font-weight:700;
    border-bottom:0;
    `
    const Time = styled.div`
    display:table-cell;
    width:800px;
    table{
     
        margin-left:9px;
        width:auto;
        table-layout:auto;
        td{
            width:99px;
            cursor:pointer;

            text-align:center;
            div{
                width:100%;
                height:70px;
                display:table;
                border:1px solid #ededed;
            }
        }
    }
    `
    const Img = styled.img`
  width: 23px;
  height: 20px;
  position: relative;
  top: 3px;
  padding-right: 5px;
`;
const TheaterTime =styled.div`
position:absolute;
top:0;
right:0;
`
export default TheaterSchedule;
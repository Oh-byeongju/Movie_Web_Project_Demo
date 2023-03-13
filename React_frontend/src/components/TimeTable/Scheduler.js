import React, { useEffect ,useState} from "react";
import styled from "styled-components";
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import { THEATER_DATAS ,AREA_DATAS,MOVIE_DATAS} from "../../reducer/TimeTable";
import { useDispatch, useSelector } from "react-redux";

import {
  T_ALLMOVIE_REQUEST,
} from "../../reducer/ticket";
import Movie from "./Movie";
import Theater from "./Theater";
import Time from "./Time";
import MovieSchedule from "./MovieSchedule";
import TheaterSchedule from "./TheaterSchedule";
const Scheduler = () =>{
    const dispatch = useDispatch();
    const { movie,theater,area} =useSelector((state)=>state.TimeTable)
    const {
        allMovie
      } = useSelector((state) => state.movie);
    const areaData=["서울", "경기", "인천", "부산"]
    const {
        allTheater
      } = useSelector((state) => state.ticket);
    const [ tab, setTab] = useState(1);
    const tabClick= (index)=>
    {
        setTab(index);
    }
    useEffect(()=>{
        dispatch({
            type:AREA_DATAS,
            data:"서울"
        })
        dispatch({
            type:THEATER_DATAS,
            data:"강남"
        })
        if(allMovie.length!==0){
            dispatch({
                type:MOVIE_DATAS,
                data:allMovie[0]
            })
        }
    },[allMovie])
  
    
  
    return(
        <TimeTableWrapper>
            <TimeTablePage>
                <MovieAreaChoice>  
                    <TabLeft>
                        <ul>
                            <li onClick={()=>tabClick(1)}
                            className={1==tab?"hover tab" : "tab"}
                            key={1}
                            ><a><i><MovieOutlinedIcon   style={{width:'40px' ,height:'40px'}}/></i>영화별</a></li>
                            <li onClick={()=>tabClick(2)}
                             key={2}
                            className={2==tab?"hover tab" : "tab"}
                                                    ><a><i><CoPresentOutlinedIcon style={{width:'40px' ,height:'40px'}} /></i>극장별</a></li>
                            
                        </ul>
                        </TabLeft> 

                        <TabCenter>
                            {tab===1? <Movie /> : <Theater />}
                        </TabCenter>
                </ MovieAreaChoice>
                <Time />
                {tab===1? <TheaterTab>   
            <ul>

                {areaData.map((city)=>
                {
                    return(
                        <City
                        onClick={()=>{
                            tabClick(1)
                            dispatch({
                                type:AREA_DATAS,
                                data:city
                            })
                          
                        }}
                        city={city}
                        area={area}
                        >
                           <a>{city}</a>
                        </City>
                    )
                })}
                
            </ul>
        </TheaterTab> : ""}
                {tab===1? <MovieSchedule /> : <TheaterSchedule />}
            </TimeTablePage>
        </TimeTableWrapper>
    )

}

const TimeTableWrapper = styled.div`
width:100%;
margin:0;
padding:40px 0 0 0 ;
`
const TimeTablePage = styled.div`
width: 1100px;
margin: 0 auto;
`;
const MovieAreaChoice= styled.div`
overflow: hidden;
position: relative;
width: 100%;
height: 300px;
margin: 0;
border: 3px solid #686571;
border-radius: 10px;
padding: 0;
`
const TabLeft = styled.div`
float: left;
    width: 145px;
    height: 100%;
    ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
       .hover {
        background-color: #fff;
        border-right: none;
    
       }
        li{
            display: block;
    text-align: center;
    width: 100%;
    height: 149px;
    line-height: 150px;
    border: 1px solid #d8d9db;
    border-width: 0 1px 1px 0;
    background-color: #f2f4f5;

    a{
        display: block;
        color: #444;
        font-size: 1.2em;
        font-weight: 400;
        text-decoration: none;
        i{
            width: 39px;
    height: 32px;
    overflow: hidden;
    display: inline-block;
    margin-bottom:10px;
    margin-right:5px;
    padding: 0;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;
    background-position: 0 0;
    background-repeat: no-repeat;}
    }
        }
    }
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
    

}
`
const City = styled.li`

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
background-color: ${(props) =>
    props.area ===  props.city? "grey" : "white"};

`
const TabCenter = styled.div`
`
export default Scheduler;
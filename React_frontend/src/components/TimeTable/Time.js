import React ,{useState,useRef}from "react";
import moment from "moment";
import styled from "styled-components";
import "moment/locale/ko";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { DAY_REQUEST, DAY_DATAS} from "../../reducer/TimeTable";
const Time = ({tab})=>{
    moment.locale('ko')
    const dispatch = useDispatch();
    const {area, theater,city,movie, date,dayone} =useSelector((state)=>state.TimeTable)
    let able = false;
    const week = [];
    const day =[];
    let count= 0;
    const today = moment().format("YYYY-MM-DD")
    const tomorrow = moment().add('days',1).format("YYYY-MM-DD"); 
    for(let i = 0 ; i < 21; i++){
        week[i] = moment().add('days',i).format("YYYY-MM-DD"); 
        day[i]= moment().add('days',i).format('dddd');
    }
    const [marginleft,setMarginLeft] = useState(0);
    const onClickMarginLeft=(data)=>{
        setMarginLeft(marginleft+data)
    }
    const [left,setLeft] = useState(940);
    const onClickLeft=(data)=>{
        setLeft(left+data)
    }
    useEffect(()=>{
        //영화 선택 페이지시
        //영화 기준으로 날짜를 검색한다
        if(tab===1){
        if(movie.length!==0){
        dispatch({
            type:DAY_REQUEST,
            data:{
                mid:movie.id,
                tid:city,
                message:"movie"
            }
        })
    }}
    else if (tab===2){
        //극장 선택 페이지시
        //극장을 기준으로 날짜를 선택함
        if(city!==""){
            dispatch({
                type:DAY_REQUEST,
                data:{
                    mid:movie.id,
                    tid:city,
                    message:"theater"
                }
            })  
        }
    }
    },[tab,movie,city])
   useEffect(()=>{
    if(theater.length===0){
        if(date.length!==0){
        console.log("1번 날짜")
        dispatch({
            type:DAY_DATAS,
            data:date[0].miday,
        })}}
   },[theater,date])
    return(
        <TimeSchedule>
                    <Wrap>
                        <button className="btn-pre" 
                        disabled={marginleft>=0?"disabled": ""}
                        onClick={()=>{   
                            onClickLeft(70)

                        onClickMarginLeft(3.3)}
                        }>
                            이전
                        </button>
                        <DateList>

                            <DateMonth >
                                                        {week.map((week,index)=>{
                                                            if(week.substring(8,10)==="01"){
                                                                count=index //17 한줄에 14
                                                            }
                        return(<>
                         {week === today  ?<Month style={{left:'30px', zIndex:'1', opacity:'1'}}>{week.substring(0,7)}</Month>: ""}
                          {week.substring(8,10)==="01"?<NextMonth style={{left:left, zIndex:'1', opacity:'1'}}>{week.substring(0,7)}</NextMonth>:""}
  </>)  })}
 
                          </DateMonth>
                            <DateArea>
                            
                                <Date style={{
                                transform:`translate(${marginleft}%)`
                                }}>
                                 {week.map((week,index)=>{
                                    able = false;
                                    
                                    {date.map((day)=>
                                        {
                                            if(week===day.miday){
                                                able=true;
                                            }
                                        })}
                                    return(
                                        <div>
                                                                               
                                      <Button
                                        onClick={()=>{
                                            
                                            dispatch({
                                                type:DAY_DATAS,
                                                data:week
                                            })
                                        }}
                                        date={week}
                                        dayone={dayone}
                                        disabled={able?"": "disabled"}
                                        className={!able ?"disable": day[index]==="토요일" ?"blue day" : day[index]==="일요일" ? "red day" : day }>
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
                                      </div>
                                    )
                                 })}


                                </Date>
                            </DateArea>
                        </DateList>
                        <button className="btn-next"
                        disabled={marginleft===-19.8 ? "disabled":""}
                        onClick={()=> {
                            onClickLeft(-70)
                            onClickMarginLeft(-3.3);}
                        }>
                            이후
                        </button>
                    </Wrap>
                </TimeSchedule>
    )
}

const TimeSchedule = styled.div`
width: 100%;
padding-top:20px;
`
const Wrap = styled.div`
height: 73px;
border: 1px solid #d8d9db;
border-right: 0;
border-left: 0;
position: relative;
    .btn-pre{
        width: 30px;
    height: 80px;
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
position: relative;
width: 2100px;
border: none;
left: -70px;

`
const Date = styled.div`
position: relative;
    border: none;
    transition: 0.6s ease-out;

    left: 0px;
    
    .blue{
        color:blue;
    }
    .red{
        color:red;
    }
    .disable:hover{
        border-bottom:none;
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
    cursor:pointer;
    background-color: ${(props) =>
        props.dayone === props.date ? "#d9d9d9" : "white"};
    
    border-bottom: ${(props) =>
        props.dayone === props.date ? "3px solid #503396" : "white"};
        

    &:hover{  
        border-bottom: 3px solid #503396;
    }

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
const DateMonth= styled.div`

`
const Month = styled.div`
position: absolute;
top: 0;
font-size: .8667em;
width: 70px;
height: 28px;
line-height: 28px;
margin-top: -14px;
border: 1px solid #d8d9db;
border-radius: 15px;
text-align: center;
background-color: #fff;
font-weight: 400;
transition: 0.6s ease-out;


`
const NextMonth = styled.div`
position: absolute;
top: 0;
font-size: .8667em;
width: 70px;
height: 28px;
line-height: 28px;
margin-top: -14px;
border: 1px solid #d8d9db;
border-radius: 15px;
text-align: center;
background-color: #fff;
font-weight: 400;
transition: 0.6s ease-out;

`

export default Time;

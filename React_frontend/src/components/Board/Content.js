import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EditTwoTone ,FireTwoTone,StarTwoTone ,QrcodeOutlined,SearchOutlined,CaretUpOutlined } from "@ant-design/icons";
import { Pagination } from "@mui/material";
import ContentHeader from "./ContentHeader";
import { useDispatch ,useSelector} from "react-redux"
import { BOARD_READ_REQUEST } from "../../reducer/Board";
import { Link } from "react-router-dom";
const Content= ()=>{
    const dispatch = useDispatch();

    const { board, board_read_loading,board_read_done } = useSelector((state) => state.Board);
    const [currentPage, setCurrentPage] = useState(1);
    const handleChange = (event, value) => {
        setCurrentPage(value);
        console.log(currentPage)
      };

      
    const detailDate = (a) => {
        const milliSeconds = new Date() - a;
        const seconds = milliSeconds / 1000;
        if (seconds < 60) return `방금 전`;
        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.floor(minutes)}분 전`;
        const hours = minutes / 60;
        if (hours < 24) return `${Math.floor(hours)}시간 전`;
        const days = hours / 24;
        if (days < 7) return `${Math.floor(days)}일 전`;
        const weeks = days / 7;
        if (weeks < 5) return `${Math.floor(weeks)}주 전`;
        const months = days / 30;
        if (months < 12) return `${Math.floor(months)}개월 전`;
        const years = days / 365;
        return `${Math.floor(years)}년 전`;
    };
    useEffect(()=>{
        dispatch({
            type:BOARD_READ_REQUEST,
            data:{
                page:currentPage-1
            }
        })
    },[currentPage])

if(board_read_loading){
    return(
        <div>로딩중</div>
    )
}
else if(!board_read_loading && board_read_done){
    return(
        <ContentWrapper>
            <ContentHeader />
            
            {board.content.map((data)=>(
            <Link to ={`/board/normal/content/${data.bid}/${data.btitle}`} >
            <Card >
                <Number><CaretUpOutlined twoToneColor="grey"/><div>{data.bid}</div></Number>
                <Detail><a><div><span>{data.btitle} [{data.commentCount}5]</span></div></a></Detail>
                <Item><div className="category">{data.bcategory}</div><div className="date"><span>{detailDate(new Date(data.bdate))}</span></div><div className="name">{data.uid}</div></Item>
            </Card>
            </Link>
))
}

        <Pagination count={board.totalPages} page={currentPage} onChange={handleChange} />
        </ContentWrapper>
    )
}
}
const ContentWrapper = styled.div`
width:728px;
    margin-top: 0;
    margin-left:20px;
    border-top: 1px solid #ebeef1;
    background: #f8f9fa;
    margin-top: 8px;
    line-height: 18px;
    font-size: 14px;
    color: #7b858e;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
    a{
        text-decoration:none;
    }
`
const Card = styled.div`
position: relative;
display: table;
table-layout: fixed;
width: 100%;
min-height: 78px;
box-sizing: border-box;
border-top: 1px solid #ebeef1;
background-color: #fff;
padding: 8px 0;
`
const Number =styled.div`
width: 72px;
vertical-align: middle;
display: table-cell;
text-align: center;
`
const Detail =styled.div`
    vertical-align: middle;
    padding-top:10px;
    a{
        text-decoration: none;
    color: inherit;
    div{
        display: flex;
    overflow: auto;
    vertical-align: top;
    line-height: 15px;
    font-size: 14px;
    color: #1e2022;
    word-break: break-all;
    span{
        display: block;
    max-width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-right: 5px;
    }
    }
`
const Item = styled.div`
margin-top: 5px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
padding-top:5px;
.category{
    float:left;
    display: inline-block;
    font-size: 14px;
    color: #98a0a7; 
    height:13px;
    line-height: 12px;
    padding-right:15px;
    border-right:1px solid #98a0a7;
}
.date{
    float:left;
    display: inline-block;
    font-size: 14px;
    color: #98a0a7;
    padding-right:15px;
    padding-left:15px;
    height:13px;
    padding-right:15px;
    line-height: 12px;
    border-right:1px solid #98a0a7;

}
.name{
    float:left;
    display: inline-block;
    font-size: 14px;
    color: #98a0a7;
    padding-right:15px;
    padding-left:15px;
    height:13px;
    padding-right:15px;
    line-height: 12px;


}
`
const Image =styled.div`
width: 93px;
padding: 0 24px 0 8px;
vertical-align: middle;
display: table-cell;
img{
    width: 93px;
    height: 60px;
    display: block;
}
`
export default Content;
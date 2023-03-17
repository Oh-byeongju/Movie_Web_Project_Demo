import React, { useEffect } from "react";
import styled from "styled-components";
import { EditTwoTone ,FireTwoTone,StarTwoTone ,QrcodeOutlined,SearchOutlined,CaretUpOutlined } from "@ant-design/icons";
import { QrCodeTwoTone } from "@mui/icons-material";
import ContentHeader from "./ContentHeader";
import { useDispatch ,useSelector} from "react-redux"
import { BOARD_READ_REQUEST } from "../../reducer/Board";
const Content= ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({
            type:BOARD_READ_REQUEST
        })
    },[])
    const { board } = useSelector((state) => state.Board);

    return(
        <ContentWrapper>
            <ContentHeader />
            {board.map((data)=>(
            <Card>
                <Number><CaretUpOutlined twoToneColor="grey"/><div>{data.bid}</div></Number>
                <Detail><a><div><span>{data.btitle} [{data.commentCount}5]</span></div></a></Detail>
                <Item><div className="category">{data.bcategory}</div><div className="date"><span>{data.bdate}</span></div><div className="name">{data.uid}</div></Item>
                <Image><a><img src={"img/carousel/first.png"} alt="영화" /></a></Image>
            </Card>))
}
        </ContentWrapper>
    )
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
    position:absolute;
    height:13px;
    width:70px;
    line-height: 12px;
    border-right:1px solid #98a0a7;
}
.date{
    float:left;
    display: inline-block;
    font-size: 14px;
    color: #98a0a7;
    position:absolute;
    left:160px;
    height:13px;
    width:100px;
    line-height: 12px;
    border-right:1px solid #98a0a7;

}
.name{
    display: inline-block;
    line-height: 12px;
    height:13px;

    font-size: 14px;
    color: #98a0a7;
    position:absolute;
    left:280px;


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
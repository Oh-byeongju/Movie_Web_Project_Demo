import React from "react";
import styled from "styled-components";
import { EditTwoTone ,FireTwoTone,StarTwoTone ,QrcodeOutlined,SearchOutlined } from "@ant-design/icons";
import { QrCodeTwoTone } from "@mui/icons-material";
import { useLocation, Link } from "react-router-dom";

const ContentHeader =()=>{
    return (
    <ContentWrapper>
    <SubMenu>
        <SubMenuHeader>
            <h2>관람후기</h2>
            <ul className="header">
                <li><Link to="/Board/write"><EditTwoTone style={{fontSize:'25px' }}/></Link></li></ul>
            <SubMenuFooter>
                <ul>
                    <li>
                    <a><FireTwoTone style={{fontSize:'25px', position:'relative', top:'4px' ,paddingRight:'5px'}} twoToneColor="grey"/>인기</a>
                    </li>

                    <li>
                    <a><QrcodeOutlined style={{fontSize:'25px', position:'relative', top:'4px' ,paddingRight:'5px'}}  twoToneColor="grey"/>최신순</a>
                    </li>

                    <li>
                    <a><StarTwoTone style={{fontSize:'25px', position:'relative', top:'4px' ,paddingRight:'5px'}}  twoToneColor="grey"/>TOP</a>
                    </li>
                </ul>
                <Search>
                    <form>
                        <select>
                            <option>제목</option>
                            <option>작성자</option>
                        </select>
                        <input type="text" placeholder="검색"></input>
                        <button><SearchOutlined style={{fontSize:'20px'}}/></button>
                    </form>
                </Search>
            </SubMenuFooter>
        </SubMenuHeader>
    </SubMenu>
</ContentWrapper>
    )
}

const ContentWrapper =styled.div`
    width:728px;
    `
const SubMenu =styled.div`
position: relative;
margin-bottom: 8px;
background-color: #fff;
`
const SubMenuHeader = styled.div`
padding-top: 18px;
box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);

padding-bottom: 17px;
h2{
    padding-left: 16px;
    font-size: 18px;
    color: #1e2022;
    font-weight: 700;
    float:left;
    position:absolute;
    top:5px;
    left:5px;
}
.header{
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 16px;
    margin-right: 16px;
    list-style-type:none;

}
`
const SubMenuFooter = styled.div`
margin-top:70px;
padding-bottom:30px;
position:relative;
left:-10px;
ul{
    list-style-type:none;
    li{
        float:left;
        padding-right:40px;
    }
}
`
const Search = styled.div`
display: block;
    position: absolute;
    right: 0;
    top:0;
    bottom: 0;
    margin-right: 6px;
    margin-bottom: 6px;
    select{
        float: left;
        width: 82px;
        padding: 9px 0 8px 15px;
        box-sizing: border-box;
        border: 1px solid #ebeef1;
        background: #fff;
        border-radius: 4px 0 0 4px;
        line-height: 17px;
        font-size: 14px;
        color: #98a0a7;
    }
    input{
        float: left;
        border: none;
        width: 200px;
        box-sizing: border-box;
        padding: 10px 32px 9px 16px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: #ebeef1;
        line-height: 17px;
        font-size: 14px;
    }
    button{
    float: left;
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 6px;
    margin-right: 8px;
    border:none;
    }
    
`
export default ContentHeader;
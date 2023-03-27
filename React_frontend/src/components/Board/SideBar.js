import React from "react"
import styled from "styled-components"
import { useLocation,useNavigate, Link, useParams } from "react-router-dom";

const SideBar = () =>{
    const menus = [
        { name: "자유 게시판", path: "popular" },
        { name: "영화 뉴스", path: "news" },
        { name: "인터뷰", path: "interview" },
      ];
      const navigate = useNavigate();
      const {page,category, free} = useParams();

      const handleChange = (data)=>{
        navigate(`/board/list/${data}/${free}/1`)
      }
      return(
        <SideBarWrapper>
                <SideBarContent>
                    <SideBarMenu>
                      
                        <Title>
                            커뮤니티
                            <ul>
                                {menus.map((data)=>
                                 <li onClick={()=>{
                                    handleChange(data.path)
                                 }}><a>{data.name}</a></li>
                                
                                )}
                               
                            </ul>
                        </Title>
                    </SideBarMenu>
                </SideBarContent>
            </SideBarWrapper>
    )
}

const SideBarWrapper = styled.div`
    width: 250px;
    position: relative;
    left:20px;
    float:left;
    
`
const SideBarContent = styled.div`
`


const SideBarMenu = styled.div`
    border : 1px solid #ebeef1;
    padding: 9px 16px 8px;
    `

const Title =styled.div`
    padding-bottom: 8px;
    line-height: 15px;
    font-size: 12px;
    color: #7b858e;
    ul{
        list-style-type:none;
        li{
            line-height: 17px;
            font-size: 14px;
            color: #1e2022;
            border-radius: 4px;
            a{
                padding:8px 12px 7px;
                display:block;
            }
        }
    }
`
export default SideBar
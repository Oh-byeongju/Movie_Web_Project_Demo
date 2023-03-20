import React, { useEffect } from "react";
import styled from "styled-components";
import { LikeTwoTone,DislikeTwoTone,SyncOutlined,EyeOutlined ,DeleteOutlined} from "@ant-design/icons";
import { useParams,useNavigate ,useLocation} from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux"
import { CONTENT_DELETE_REQUEST, CONTENT_READ_REQUEST } from "../../reducer/Board";

const ContentCard = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const location = useLocation();

        const {id,title} = useParams();
        const { LOGIN_data } = useSelector((state) => state.R_user_login);

        useEffect(()=>{
            dispatch({
                type:CONTENT_READ_REQUEST,
                data:{
                    id:id,
                    title:title
                }
            })
        },[])
        const {content,content_read_loading,content_read_done} = useSelector((state)=>state.Board)
   
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
        //api에 있는 detailPost.createdAt를 바꿔주는 것

    if(content_read_loading ){
        return(
            <div>대기중</div>
        )
    }
    else if(!content_read_loading && content_read_done){
    return(
        <Content>
            <Aricle>
                <Header>
                    <Title
                    onClick={()=>{
                       console.log(location)
                    }}>
                        {content[0].btitle}
                     </Title>
                    <SubTitle>
                        <MetaListLeft>
                        <div className="category">{content[0].bcategory}</div>
                        <div className="time">{detailDate(new Date(content[0].bdate))}</div>
                        <div className="name">{content[0].uid}</div>
                        </MetaListLeft>
                        <MetaListRight>
                        <div className="inq"><EyeOutlined style={{position:'relative',top:'-2px'}}/><span>{content[0].bclickindex}</span></div>
                        <div className="comment">댓글 100</div>
                        <div className="top">추천 1,000</div>
                        </MetaListRight>
                    </SubTitle>
                </Header>   
                <ContentWrapper>
                    <ArticleContent  dangerouslySetInnerHTML={{__html:content[0].bdetail}}>

                    </ArticleContent>
                    <AricleBox>
                        <Vote>
                            <ArticleVote>
                                <button className="up">
                                    <span className="like"><LikeTwoTone  style={{fontSize:"15px"}}/></span>
                                    <span className="number">{content[0].blike}</span>
                                </button>
                                <button className="down">
                                    <span className="like"><DislikeTwoTone   style={{fontSize:"15px"}}/></span>
                                    <span className="number">{content[0].bunlike}</span>
                                </button>
                                {LOGIN_data.uid===content[0].uid ?
                                <div className="delete"
                                onClick={()=>{
                                    if (
                                        !window.confirm(
                                          "삭제하시겠습니까?"
                                        )
                                      ) {
                                        return;
                                      } else {
                                    dispatch({
                                        type:CONTENT_DELETE_REQUEST,
                                        data:{bid:content[0].bid}
                                    })}
                                }}><DeleteOutlined /><span>삭제하기</span></div>: ""}
                            </ArticleVote>
                        </Vote>
                    </AricleBox>
                </ContentWrapper>
                <Comment>
                    <CommentHeader >
                        <Left>
                            <h2>댓글</h2>
                            <span>총 <em>89</em>개</span>
                        </Left>
                        <Right>
                            <button>
                                <span className="icon"> <SyncOutlined /></span>
                                <span>새로고침</span>
                            </button>
                        </Right>

                    </CommentHeader>
                    <CommentList>
                        <Sort>
                            <ul>
                                <li><button className="click">최신순</button></li>
                                <li><button>인기순</button></li>
                            </ul>
                        </Sort>
                    </CommentList>
                    <CommentData>
                        <li>
                            <div className="comment">
                                    <div className="number">5</div>
                                    <div className="name">
                                        <span className="id">rkdrudahr12</span>
                                        <span className="time">10시간 전</span>
                                    </div>
                                    <div className="comment-content">
                                        <div >
                                            
                                        </div>
                                    </div>
                                    <div className="comment-comment">답글쓰기</div>
                            </div>
                        </li>
                    </CommentData>
                </Comment>
            </Aricle>
        </Content>
    )
                }
}
const Content = styled.div`
    float: right;
    box-sizing: border-box;
    width: 728px;
`
const Aricle = styled.div`
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
`
const Header = styled.div`
    padding-left: 24px;
    padding-right: 24px;
    padding: 24px 16px;
    border-bottom: 1px solid #ebeef1;
`
const Title = styled.div`
    line-height: 36px;
    font-size: 24px;
    color: #1e2022;
    word-wrap: break-word;
    word-break: break-all;
    overflow: auto;
`
const SubTitle = styled.div`
    margin-top: 9px;
    line-height: 17px;
    font-size: 14px;
    color: #7b858e;
`
const MetaListLeft = styled.div`
    float: left;
    margin-top: 0;
    .category{
        display: inline-block;
        font-size: 14px;
        color: #98a0a7;
        height:13px;
        padding-right:15px;
        line-height: 12px;
        border-right:1px solid #98a0a7;
}
    }
    .time{
        display: inline-block;
        vertical-align: middle;
        position: relative;
        margin-left: 8px;
        padding-left: 9px;
        height:13px;
        line-height: 10px;
        padding-right:15px;
        border-right:1px solid #98a0a7;
    }        

    }
    .name{
        display: inline-block;
        vertical-align: middle;
        position: relative;
        margin-left: 8px;
        padding-left: 9px;
        height:13px;
        line-height: 10px;
    }
`
const MetaListRight = styled.div`
    float: right;
    .inq{
        margin-left: 0;
        padding-left: 0;
        display: inline-block;
        vertical-align: middle;
        position: relative;
        height:13px;
        border-right:1px solid #98a0a7;
       
        span{
            position:relative;
            top:-3px;
            padding-right:10px;
        }
    }
    
    .comment{
        display: inline-block;

        vertical-align: middle;
        position: relative;
        margin-left: 8px;
        padding-left: 9px;
        width:70px;
        height:13px;
        line-height: 10px;

        border-right:1px solid #98a0a7;
    }
    .top{
        display: inline-block;
        vertical-align: middle;
        position: relative;
        margin-left: 8px;
        padding-left: 9px;
        height:13px;

        line-height: 10px;

    }
`
const ContentWrapper = styled.div`
    overflow: auto;
`
const ArticleContent = styled.div`
    padding-right: 24px;
    padding-left: 24px;
    width: 100%;
    box-sizing: border-box;
    padding: 24px 16px;
    line-height: 24px;
    font-size: 16px;
    color: #1e2022;
    word-wrap: break-word;
    word-break: break-word;
`
const AricleBox = styled.div`
    border-top: 1px solid #ebeef1;
    border-bottom: 1px solid #ebeef1;
    text-align: center;
`
const Vote =styled.div`
    padding: 12px 0;
`
const ArticleVote  =styled.div`
    button{
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #dddfe4;
        cursor:pointer;
    }
    .up{
        padding: 12px;
        min-width: 88px;
        line-height: 17px;
        font-size: 14px;
        height: 43px;
        color: #1e2022;
        margin-left: 80px;
        .like{
            width: 16px;
            height: 16px;
            background-size: 16px;
            vertical-align: top;
            overflow: hidden;
            display: inline-block;
            transition: all .5s;
            padding-right:5px;
        }
        .number{
            display: inline-block;
            transition: all .3s;
        }
    }
    .down{
        padding: 12px;
        min-width: 88px;
        line-height: 17px;
        font-size: 14px;
        height: 43px;
        color: #1e2022;
        margin-left: 8px;
        cursor:pointer;

        .like{
            width: 16px;
            height: 16px;
            background-size: 16px;
            vertical-align: top;
            overflow: hidden;
            display: inline-block;
            transition: all .5s;
            padding-right:5px;

        }
        .number{
            display: inline-block;
            transition: all .3s;
        }
    }
    .delete{
        float:right;
        padding-top:10px;
        padding-right:20px;
        color:#7b858e;
        font-size:13px;
        cursor:pointer;
    }
`
const Comment = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
`
const CommentHeader= styled.div`
    z-index: auto;
    position: relative;
    top: 0px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
`
const Left= styled.div`
    h2{
        display: inline;
        line-height: 21px;
        font-size: 18px;
        color: #1e2022;
    }
    span{
        margin-left: 5px;
        margin-right: 10px;
        line-height: 18px;
        font-size: 14px;
        color: #7b858e;
        em{
            color: #16ae81;
        }
    }   
`
const Right = styled.div`
    button{
        background: none;
        line-height: 17px;
        font-size: 14px;
        color: #7b858e;
        background: none;
        cursor:pointer;
        font-family: inherit;
        border: 0;
        padding: 0;
        border-radius: 0; 
        -webkit-border-radius: 0;   
    span{
        vertical-align: middle;
    }
    .icon{
        padding-right:5px;
    }
}
`
const CommentList =styled.div`
height:48px;
border-bottom: 1px solid #dddfe4;

`
const Sort = styled.div`
    ul{
        list-style: none;
        
        
        li{
            float: left;
            
            button{
                padding: 15px 16px 11px;
                line-height: 19px;
                font-size: 16px;
                color: #1e2022;
                border-bottom: 3px solid transparent;
                background: none;
                font-family: inherit;
                border-right:0;  
                border-left:0;                
                border-top:0;                

            }
            .click{
                color: #16ae81;
    border-color: #46cfa7;
            }
        }
    }
    `
const CommentData = styled.ul`
list-style-type:none;
li{
    border-top: 0;
    position: relative;
    .comment{
        position: relative;
        padding: 12px 12px 12px 64px;
        .number{
            
            position: absolute;
            left: 0;
            top: 12px;
            text-align: center;
        }
        .name{
            line-height: 17px;
            font-size: 14px;
            color: #7b858e;

            .id{
                display:inline-block;
                font-weight: 700;
                color: #1e2022;
                word-wrap: break-word;
                word-break: break-all;
                padding-right:20px;
                line-height:10px;
                height:12px;
                border-right:1px solid #98a0a7;
            }
            .time{
                padding-left:20px;
            }
        }
    }
}
.comment-content{
    margin-top: 8px;
    line-height: 20px;
    font-size: 14px;
    color: #1e2022;
    word-wrap: break-word;
    word-break: break-all;
    overflow: auto;
    max-height: 400px;
}
.comment-comment{
    margin-top:8px;
}
`
export default ContentCard
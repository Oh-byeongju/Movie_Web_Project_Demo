import React from "react";
import styled from "styled-components";
import { LikeTwoTone,DislikeTwoTone,SyncOutlined} from "@ant-design/icons";
const ContentCard = () => {
    return(
        <Content>
            <Aricle>
                <Header>
                    <Title>
                        가나다라마바사아자카타파하
                    </Title>
                    <SubTitle>
                        <MetaListLeft>
                        <div className="category">유머</div>
                        <div className="time">10 시간 전</div>
                        <div className="name">달빛조각사</div>
                        </MetaListLeft>
                        <MetaListRight>
                        <div className="inq">조회 61,677</div>
                        <div className="comment">댓글 100</div>
                        <div className="top">추천 1,000</div>
                        </MetaListRight>
                    </SubTitle>
                </Header>   
                <ContentWrapper>
                    <ArticleContent>

                    </ArticleContent>
                    <AricleBox>
                        <Vote>
                            <ArticleVote>
                                <button className="up">
                                    <span className="like"><LikeTwoTone  style={{fontSize:"15px"}}/></span>
                                    <span className="number">1091</span>
                                </button>
                                <button className="down">
                                    <span className="like"><DislikeTwoTone   style={{fontSize:"15px"}}/></span>
                                    <span className="number">1091</span>
                                </button>
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
                            </div>
                        </li>
                    </CommentData>
                </Comment>
            </Aricle>
        </Content>
    )
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
        width:50px;
        height:13px;
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
        width:70px;
        height:13px;
        line-height: 10px;

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
        width:100px;
        height:13px;
        line-height: 10px;

        border-right:1px solid #98a0a7;
       
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
        margin-left: 8px;
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
`
const Sort = styled.div`
border-bottom: 1px solid #dddfe4;
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
            
            width: 64px;
            text-align: center;
        }
    }
}
`
export default ContentCard
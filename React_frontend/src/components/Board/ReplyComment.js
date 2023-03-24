import React ,{useEffect, useState}from "react";
import styled from "styled-components";
import { SyncOutlined,MessageOutlined} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { COMMENT_WRITE_REQUEST } from "../../reducer/Board";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
const ReplyComment = ({id,child,bid}) =>
{
    const [text, setText] =useState("");
    const [count, setCount]  = useState(0)
    const onChangeText =(e)=>{
        setText(e.target.value)
        setCount(e.target.value.length)
    }    
    const [isValid, setIsValid] = useState(false);
    const dispatch = useDispatch();
   
    const onClickReply = ()=>{
        
        setIsValid(!isValid);
    }

    const onClickComment=()=>{

        if (
            !window.confirm(
              "작성하시겠습니까?"
            )
          ) {
            return;
          } else {
            dispatch({
                type:COMMENT_WRITE_REQUEST,
                data:{
                    text:text,
                    parent:id,
                    bid:bid,
                }
            })
        alert('작성완료되었습니다.')
        setText("")
          }
    }

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
    return(
        <CommentWrapper>
            <div className="comment-content">
                
                                            <div className="no"
                                            onClick={()=>{
                                                console.log(bid)
                                            }}>
                                                신고
                                            </div>
                                            <div className="comment_to_comment" 
                                            onClick={()=>{onClickReply()}}>
                                            <MessageOutlined 
                                            style={{paddingRight:"5px"}}/>답글쓰기
                                            </div>
                                        </div>
                                        {isValid? <CommentText>
      
       
                            <div>
                            <div className="form">
                            <div className="text">
                                <textarea placeholder="작성하세요"
                                maxLength={200}
                                value={text}
                                onChange={onChangeText}
                                ></textarea>
                            </div>
                            <div className="button">
                                <div className="number">
                                 {count}/200
                                </div>
                                <div className="writebutton">
                                <button className="write"
                                  onClick={()=>{
                                    onClickComment()
                                }}
                                >작성하기</button>
                                </div>
                            </div>
                            </div>
                        </div>
                     
                    </CommentText>   
                       :""} 
                        {child.map((data)=>
                        {
                            return(
                                <CommentReply>
                                    <div className="icon">
                                    <SubdirectoryArrowRightIcon />
                                    </div>
                                <div className="comment">
                                                 <div className="name">
                                                     <span className="id">{data.member}</span>
                                                     <span className="time">{detailDate(new Date(data.bcdate))}</span>
                                                 </div>
                                                 <div className="comment-comment"> <p>{data.bccomment}</p>
         
                                               
                                             </div>
                                         </div>
                                </CommentReply>
                            )

                        })}                      
                     

                    </CommentWrapper>)
}

const CommentWrapper = styled.div`
.comment-content{
    position:relative;
    top:-20px;
    left:65px;
}`
const CommentText = styled.div`
padding: 24px 16px;
background: #f8f9fa;

.form{
    background-color: #fff;
    border: 1px solid #dddfe4;
    margin-left:80px;
    width:85%;
    .text{
        margin: 8px 16px 0;
        padding-bottom: 16px;

        textarea{
            overflow: hidden;
            overflow-wrap: break-word;
            height: 44px;
            display: block;
            width: 100%;
            min-height: 40px;
            line-height: 20px;
            font-size: 14px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            resize: none;
            border: none;
            outline: none;
            font-family: Helvetica,Arial,Malgun Gothic,sans-serif;
        }
    }
    .button{
        position: relative;
        border-top: 1px solid #dddfe4;
        min-height: 42px;
        box-sizing: border-box;
        padding-right: 110px;

        .number{
            line-height: 40px;
            font-size: 14px;
            color: #7b858e;
            float:right;
        }
        .writebutton{
            position: absolute;
            right: 0;
            bottom: 0;
        .write{
            width: 92px;
padding: 10px 9px;
line-height: 20px;
font-size: 16px;
border-radius: 0;
border-color: #46cfa7;
background-color: #46cfa7;
color: #fff;border: 1px solid #dddfe4;

        }
        }
        }
    }
}
`
const CommentReply = styled.div`
    background: #f8f9fa;
    padding-left: 92px;
    position: relative;
    padding: 12px 12px 12px 64px;
    border-top: 1px solid #ebeef1;

    
   .icon{
    position: absolute;
    top: 12px;
    left: 64px;
    content: "";
    width: 12px;
    height: 12px;
    
   }
    li{
        width:100%;
        position: relative;
    
        left:-40px;
        border-top: 1px solid #dddfe4;
        .comment{
            position: relative;
            padding: 12px 12px 12px 64px;
            .number{
                position: absolute;
                left: 10px;
                top: 30px;
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
        .no{
            float:left;
            padding-right:30px;
        }
        .comment_to_comment{
            
        }
    }
    .comment-comment{
        margin-top: 8px;
        line-height: 20px;
        font-size: 14px;
        color: #1e2022;
        word-wrap: break-word;
        word-break: break-all;
        /* overflow: auto; */
        max-height: 400px;
    }
}
    `
export default ReplyComment;
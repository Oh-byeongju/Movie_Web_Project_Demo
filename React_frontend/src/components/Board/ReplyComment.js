import React ,{useState}from "react";
import styled from "styled-components";
import { SyncOutlined,MessageOutlined} from "@ant-design/icons";

const ReplyComment = () =>
{
    const [text, setText] =useState("");
    const [count, setCount]  = useState(0)
    const onChangeText =(e)=>{
        setText(e.target.value)
        setCount(e.target.value.length)
    }    
    const [isValid, setIsValid] = useState(false);

    const onClickReply = ()=>{
        
        setIsValid(!isValid);
    }
    return(
        <CommentWrapper>
            <div className="comment-content">
                                            <div className="no">
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
                                
                                }}
                                >작성하기</button>
                                </div>
                            </div>
                            </div>
                        </div>
                     
                    </CommentText>   
                       :""} 
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
        padding-right: 186px;

        .number{
            font-size: 14px;
            line-height: 17px;
            color: #7b858e;
            position: absolute;
            right: 100px;
            bottom: 12px;
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

export default ReplyComment;
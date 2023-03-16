import React ,{useRef, useState,useMemo}from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
const Writing = () =>{
    const QuillRef = useRef();

	const [Board_Content, setContent] = useState('');

	const onEditorChange = (value) => {
		setContent(value);
    console.log(value);
	};

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute("accept", "image/*");
    input.click();

    
  }

  const modules = useMemo (
    () => ({
      toolbar: {
        container : [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          ['clean']
        ],

        handlers: {
          image: imageHandler,
        },
      }, 
  }),
  []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background',        
  ]

    return(
        <ContentWrapper>       
             <WriteWrapper>  
            <h2 onClick={()=>{
                console.log(Board_Content)
            }}>글쓰기</h2>
                <Select>
                    <select>
                        <option>관람 후기</option>
                        <option>영화 뉴스</option>
                        <option>인터뷰</option>
                        <option>동영상</option>
                    </select>
                    <input type="text" placeholder="제목"/>
                </Select>
                <CustomReactQuill
        ref={QuillRef}
        formats={formats}
        value={Board_Content}
        onChange={onEditorChange}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />         
          
       </WriteWrapper>
       <ButtonMore>
        <Fail>취소하기</Fail>
        <Success></Success>
       </ButtonMore>
       </ContentWrapper>

    )
}
const ContentWrapper= styled.div`
float: right;
    box-sizing: border-box;
    width: 728px;`
const WriteWrapper = styled.div`
    width:728px;
    margin-top: 0;
    margin-left:20px;
    border-top: 1px solid #ebeef1;
    margin-top: 8px;
    line-height: 18px;
    font-size: 14px;
    color: #7b858e;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
    
    h2{
        padding-left: 16px;
        font-size: 18px;
        color: #1e2022;
        font-weight: 700;        
    }
`
const Select = styled.div`
width:100%;
padding-left:15px;
padding-bottom:15px;
select{
    position: relative;
    border: 1px solid #dddfe4;
    border-radius: 4px;
    padding: 10px 38px 9px 15px;
    line-height: 19px;
    font-size: 16px;
    color: #1e2022;
    background-size: 24px;
    background-position: top 8px right 8px;
    background-repeat: no-repeat;
    float:left;
    margin-right:10px;
}
input{
    display: block;
    width: 74%;
    background-color: #fff;
    border: 1px solid #dddfe4;
    padding: 10px 16px 9px;
    line-height: 19px;
    font-size: 16px;
    color: #1e2022;
    box-sizing: border-box;
}
`
const ButtonMore = styled.div`
width:100%;
    position:static;
    padding-top:50px;
    padding-left:20px;
`
const Fail =styled.button`
line-height: 19px;
font-size: 16px;
color: #7b858e;
border-radius: 4px;
background-color: #fff;
border: 1px solid #dddfe4;
width: 154px;
height: 48px;
margin-left:20px;
}
`
const Success =styled.button`
float: right;
    position: static;
    color: #fff;
    border-radius: 4px;
    background-color: #46cfa7;
    width: 154px;
    height: 48px;
    line-height: 19px;
    font-size: 16px;
    margin-left:60px;
`
const CustomReactQuill = styled(ReactQuill)`
    height: 455px;
`
export default Writing;

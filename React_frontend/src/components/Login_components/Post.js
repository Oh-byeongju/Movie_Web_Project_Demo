import React from "react";
import DaumPostcode from "react-daum-postcode";

// 다음 주소검색 api
const Post = (props) => {
  console.log("API실행");

  const setAddress = props.setAddress;
  // 버튼을 두번 눌러야 켜지는걸 바꿔야함

  const onCompletePost = (data) => {
    console.log(data.address);
    setAddress(data.address);
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "20%",
    width: "400px",
    height: "400px",
    padding: "7px",
    zIndex: 100,
  };

  return (
    <>
      <DaumPostcode style={postCodeStyle} onComplete={onCompletePost} />
    </>
  );
};

export default Post;

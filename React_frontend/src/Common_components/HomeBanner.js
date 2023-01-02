import React from "react";
import { Carousel } from "antd";
import styled from "styled-components";

const contentStyle = {
  height: "650px",

  lineHeight: "160px",
  textAlign: "center",
};

const HomeBanner = () => {
  return (
    <div style={{ paddingTop: "50px" }}>
      <Carousel autoplay>
        <div>
          <img src={"img/carousel/a1.jpg"} style={contentStyle} />
        </div>
        <div>
          <img src={"img/carousel/a2.jpg"} style={contentStyle} />
        </div>
      </Carousel>
    </div>
  );
};

export default HomeBanner;

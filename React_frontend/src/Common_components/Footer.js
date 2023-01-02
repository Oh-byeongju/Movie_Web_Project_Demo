import React from "react";
import styled from "styled-components";
const Footer = () => {
  return (
    <div>
      <Foot id="footer">
        <div id="footer_info">
          <div className="container">
            <div className="row">
              <div className="footer_info">
                <h2>Movie</h2>
                <div>
                  <p>
                    강경목
                    <br />
                    <span className="bar2">~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span>
                    <br />
                    <span>오병주</span>
                    <span className="bar2">~~~~~~~~~~~~~~~~~~~~~~</span>
                  </p>
                  <p>2023-01-01</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Foot>
    </div>
  );
};

const Foot = styled.div`
  width: 100%;
  height: 300px;
  background-color: grey;
  position: relative;
  bottom: -800px;

  .footer_info {
    padding-top: 15px;
    padding-left: 20px;
    width: 80%;
  }
  .footer_info h2 img {
    width: 150px;
  }
  .footer_info ul {
    padding: 15px 0;
  }
  .footer_info li {
    position: relative;
    display: inline;
    padding-right: 16px;
    white-space: nowrap;
  }
  .footer_info li:after {
    content: "";
    position: absolute;
    right: 5px;
    top: 5px;
    width: 1px;
    height: 11px;
    background-color: #8f8f8f;
  }
  .footer_info li:last-child:after {
    width: 0;
    height: 0;
  }
  .footer_info li a {
    color: #8f8f8f;
  }
  .footer_info address p {
    color: #8f8f8f;
    padding-bottom: 15px;
  }
`;
export default Footer;

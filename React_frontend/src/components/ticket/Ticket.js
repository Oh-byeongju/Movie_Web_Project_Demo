import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { Avatar, Divider, List, Skeleton } from "antd";
import axios from "axios";
import Scrolling from "react-infinite-scroll-component";

const Ticket = () => {
  const onSpring = useCallback(() => {
    axios
      .get("http://localhost:8080/v1/member", { withCredentials: true })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function () {
        console.log("실패함");
      });
  }, []);
  return (
    <MovieReverse>
      <div className="movie_choice">
        <p>영화</p>
        <div style={{ paddingBottom: "20px" }}>
          <button type="button" className="all-button" onClick={onSpring}>
            전체영화
          </button>
        </div>
        <div className="list-view">
          <div className="all-movie">
            <div className="list">
              <div className="movie_container">
                <ul>
                  <li>
                    <button className="movie">
                      <img
                        src={"img/age/12.png"}
                        style={{ width: 30, height: 30 }}
                      />
                      <span>아바타 물의 길</span>
                    </button>
                  </li>

                  <li>
                    <button className="movie">
                      <img
                        src={"img/age/12.png"}
                        style={{ width: 30, height: 30 }}
                      />
                      <span>젠틀맨</span>
                    </button>
                  </li>

                  <li>
                    <button className="movie">
                      <img
                        src={"img/age/12.png"}
                        style={{ width: 30, height: 30 }}
                      />
                      <span>스위치</span>
                    </button>
                  </li>

                  <li>
                    <button className="movie">
                      <img
                        src={"img/age/12.png"}
                        style={{ width: 30, height: 30 }}
                      />
                      <span>영웅</span>
                    </button>
                  </li>
                  <li>
                    <button className="movie">
                      <img
                        src={"img/age/12.png"}
                        style={{ width: 30, height: 30 }}
                      />
                      <span>신비아파트</span>
                    </button>
                  </li>
                  <li>
                    <button className="movie">
                      <img
                        src={"img/age/12.png"}
                        style={{ width: 30, height: 30 }}
                      />
                      <span>극장판 뽀로로와 친구들</span>
                    </button>
                  </li>
                  <li>
                    <button className="movie">
                      <img
                        src={"img/age/12.png"}
                        style={{ width: 30, height: 30 }}
                      />{" "}
                      <span>EFGH</span>
                    </button>
                  </li>
                  <li>
                    <button className="movie">
                      <img
                        src={"img/age/12.png"}
                        style={{ width: 30, height: 30 }}
                      />{" "}
                      <span>EFGH</span>
                    </button>
                  </li>
                  <li>
                    <button className="movie">
                      <img
                        src={"img/age/12.png"}
                        style={{ width: 30, height: 30 }}
                      />{" "}
                      <span>EFGH</span>
                    </button>
                  </li>
                  <li>
                    <button className="movie">
                      <img
                        src={"img/age/12.png"}
                        style={{ width: 30, height: 30 }}
                      />
                      <span>EFGH</span>
                    </button>
                  </li>
                  <li>
                    <button className="movie">
                      <img
                        src={"img/age/12.png"}
                        style={{ width: 30, height: 30 }}
                      />
                      <span>EFGH</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="other-movie"></div>
        </div>
      </div>
    </MovieReverse>
  );
};

const MovieReverse = styled.div`
position:relative;
  width:300px;
  height:700px;
  .list-view {
    box-sizing: border-box;
    line-height: 1.5;
    font-size: 14px;
    font-weight: 400;
    position: relative;

    width: 270px;
    height:407px;
    margin: 0;
    top:80px;
    left:100px;
   overflow:scroll;
   &::-webkit-scrollbar { width: 10px; height:10px; }
   &::-webkit-scrollbar-thumb { background: #ddd; border-radius: 10px; }
    .all-movie{

      .list{
        
        width:100%;
        height:400px;
      }
    }  
}

.all-button{
  position:absolute;
  width:260px;
  top:90px;
  left:110px;
  border:none;
  outline:none;
  background:0;
  height:30px;
  margin-bottom:5px;
  border:1px solid grey;

}
 


  
 
  ul {
    list-style-type: none;
    margin: 0;
    align-item:center;
    padding: 0;
    display:block;
    float:left;
    
  
    li{
      text-align: center;
      width:100%;
  
      a{
        text-align:center
      }
      span{
        position:absolute;
        padding-top:5px;
        text-align:center;
      }
    }
}
 


  button{
    outline:none;
    border:none;
    width:100%;
    height:20px;
   
  }
  .movie{
    box-sizing:border-box;
    height:30px;
    width:100%;
    cursor:pointer;
    background-color:white;

  }
  }
}
`;
export default Ticket;

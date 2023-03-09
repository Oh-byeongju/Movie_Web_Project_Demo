import React, { useEffect } from "react";
import styled from "styled-components";
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import { useDispatch, useSelector } from "react-redux";
import {
  
  T_ALLMOVIE_REQUEST,

} from "../../reducer/ticket";
const Movie = () =>{
    useEffect(()=>{
        dispatch({
            type: T_ALLMOVIE_REQUEST,
            data: LOGIN_data.uid,
            button:"sort",
            search:""
          });
      },[])
    const dispatch = useDispatch();
    const {
        t_allMovie,

      } = useSelector((state) => state.ticket);
      const { LOGIN_data } = useSelector((state) => state.R_user_login);

      
    return(
        <MovieWrapper>
        <ListSection>
            <ScrollBar>
                <MovieContainer>
                        <ul>
                            { t_allMovie.map((num)=>
                            
                            <li key={num.id}
                                movie={num}
                                >
                                <button>  {num.title}</button>
                              </li>)}
                        </ul>
                </MovieContainer>
            </ScrollBar>
        </ListSection>
    </MovieWrapper>
    )
}

const MovieWrapper = styled.div`
position: absolute;
    left: 164px;
    top: 0;
    
    display: block;
    width: calc(100% - 164px);
    height: 300px;
    padding: 0;
`
const ListSection = styled.div`
overflow: hidden;
height: 240px;
padding: 20px 0;
`
const ScrollBar = styled.div`
height: 200px;
position: relative;
overflow: hidden;
height: 100%;
max-width: 100%;
outline: 0;
direction: ltr;   
max-height: none;
`
const MovieContainer = styled.div`
position: relative;
    top: 0;
    left: 0;
    overflow:auto;
    height:100%;

    ul{
        overflow: hidden;
        position: relative;
        display: block;
        min-height: 138px;
        list-style-type: none;
    margin: 0;
    padding: 0;
    
    li{
        float: left;
        width: 25%;
        padding: 0;

        button{
            display: block;
            width: 100%;
            height: 50px;
            margin: 0;
            padding: 0 28px 0 10px;
            color: #444;
            border: 0;
            text-align: left;
            background-color: transparent;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;
            letter-spacing: -.5px;
            font-weight: 400;
            font-family: NanumBarunGothic,Dotum,'돋움',sans-serif;
        }
    }
    }
`
export default Movie;
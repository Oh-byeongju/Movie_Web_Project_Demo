import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ALLMOVIE_REQUEST } from "../../reducer/movie";
import { MOVIE_DATAS } from "../../reducer/TimeTable";

const Movie = () =>{
    const dispatch = useDispatch();
    const {
        allMovie
      } = useSelector((state) => state.movie);
      const { LOGIN_data } = useSelector((state) => state.R_user_login);
      const { movie,area } =useSelector((state)=>state.TimeTable)
      
    useEffect(()=>{
        dispatch({
            type: ALLMOVIE_REQUEST,
            data:{
            uid: LOGIN_data.uid,
            button:"sort",
            search:""
    }});    
      },[])
    return(
        <MovieWrapper>
        <ListSection>
            <ScrollBar>
                <MovieContainer>
                        <ul>
                            {allMovie.map((num)=>
                            
                            <Movies
                                key={num.id}
                                movie={num.id}
                                movieData={movie}
                                >
                                <button onClick={()=>{
                                    dispatch({
                                        type:MOVIE_DATAS,
                                        data:num
                                    })
                                  
                                }}>  {num.title}</button>
                              </Movies>)}
                        </ul>
                </MovieContainer>
            </ScrollBar>
        </ListSection>
        <Poster>
            <Table> 
            <img src={`${movie.imagepath}`} style={{width:"100%" ,height:"100%"}}/>

            </Table>
        </Poster>
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
width:644px;
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
    
    }
`
const Movies = styled.li`
float: left;
width: 25%;
padding: 0;

background-color: ${(props) =>
    props.movieData.id === props.movie ? "gray" : "white"};
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
`
const Poster = styled.div`
    position:absolute;
    right:0;
    top:0;
    width:206px;
    height:100%;
`
const Table =styled.div`
    display:block;
    width:100%;
    height:100%;
`
export default Movie;
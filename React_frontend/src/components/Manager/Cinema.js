import React,{useEffect} from "react";
import styled from "styled-components";
import { useDispatch ,useSelector} from "react-redux";
import { ALLTHEATER_REQUEST } from "../../reducer/ticket";
const Cinema=()=>{
    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch({
            type:ALLTHEATER_REQUEST
        })
    },[])
    const {allTheater} = useSelector((state)=>state.ticket)
    let locCdSet = []
 
    return(
        <>
        <div
        onClick={()=>{
            console.log(allTheater)
        }}
        >
             {allTheater
                .filter(
                  (arr, index, callback) =>
                    index ===
                    callback.findIndex((loc) => loc.tarea === arr.tarea)
                )
                .map((address) => (
                  <div key={address.tarea} value={address.tname}>
                    {address.tarea}
                  </div>
                ))}
        </div>
        </>
    )
}
export default Cinema;
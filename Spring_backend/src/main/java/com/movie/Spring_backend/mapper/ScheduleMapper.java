package com.movie.Spring_backend.mapper;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ScheduleMapper {
    List <Long> miid;
    Long cid;
    Long tid;


    public List<Long> get_miid (){
        return miid;
    }
    public Long get_cid (){
        return cid;
    }
    public Long get_tid (){
        return tid;
    }
    public void set_miid(List<Long> miid){
        this.miid=miid;
    }
    public void set_cid(Long cid){
        this.cid=cid;
    }
    public void set_tid(Long tid){
        this.tid=tid;
    }

}

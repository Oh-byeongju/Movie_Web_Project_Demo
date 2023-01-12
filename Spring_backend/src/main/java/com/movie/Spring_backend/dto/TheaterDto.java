package com.movie.Spring_backend.dto;
<<<<<<< HEAD

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
=======
import com.movie.Spring_backend.entity.TheaterEntity;
import lombok.*;

import javax.persistence.*;
>>>>>>> 413fd017c3181f9dfb0191d2e94c33066ee7d73a
import java.util.Date;

@Getter
@NoArgsConstructor
<<<<<<< HEAD
public class TheaterDto {


    private Long tid;

    private String tname;

    private String tarea;

    private String taddr;


    @Builder
    public TheaterDto(Long tid, String tname, String tarea, String taddr) {
        this.tid = tid;
        this.tname = tname;
        this.tarea = tarea;
        this.taddr = taddr;

    }
=======

public class TheaterDto {

    private Long tId;


    private String tName;


    private String tArea;

    private String tAddr;

    @Builder
    public TheaterDto(Long tId, String tName, String tArea, String tAddr){
        this.tId=tId;
        this.tName=tName;
        this.tArea=tArea;
        this.tAddr=tAddr;
    }
    //dtd 선언
    public TheaterEntity toEntity(){
        return TheaterEntity.builder().tId(tId).tName(tName).tArea(tArea).tAddr(tAddr).build();
    }





>>>>>>> 413fd017c3181f9dfb0191d2e94c33066ee7d73a
}

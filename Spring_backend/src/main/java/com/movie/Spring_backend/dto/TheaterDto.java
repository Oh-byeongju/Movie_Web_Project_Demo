package com.movie.Spring_backend.dto;
import com.movie.Spring_backend.entity.TheaterEntity;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@Builder
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





}
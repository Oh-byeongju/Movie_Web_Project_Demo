package com.movie.Spring_backend.dto;
import com.movie.Spring_backend.entity.TheaterEntity;
import lombok.*;

@Getter
@NoArgsConstructor

public class CinemaDto {
    private Long cId;
    private String cName;
    private String cType;
    private int cSeat;
    private TheaterEntity theater;


    public CinemaDto(Long cId, String cName,String cType,int cSeat,TheaterEntity theater){
        this.cId=cId;
        this.cName=cName;
        this.cType=cType;
        this.cSeat=cSeat;
        this.theater=theater;
    }


    /*@Builder
    public CinemaDto(Long cId,String cName, String cType, int cSeat,TheaterEntity theater){
        this.cId=cId;
        this.cName=cName;
        this.cType=cType;
        this.cSeat=cSeat;
        this.theater=theater;
    }*/

//엔티티 빌더(형변환)
}

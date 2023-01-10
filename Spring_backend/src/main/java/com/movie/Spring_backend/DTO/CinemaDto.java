//package com.movie.Spring_backend.dto;
//import com.movie.Spring_backend.entity.CinemaEntity;
//import com.movie.Spring_backend.entity.TheaterEntity;
//import lombok.*;
//
//import javax.persistence.*;
//import java.util.Date;
//
//@ToString
//@Builder
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class CinemaDto {
//
//    private long c_id;
//    private String c_name;
//    private String c_type;
//    private int c_seat;
//
//    private TheaterEntity theater;
//
//    public CinemaEntity toEntity(){
//        return CinemaEntity.builder().c_id(this.c_id).c_name(this.c_name).c_type(this.c_type).c_seat(this.c_seat).theater(this.theater).build();
//
//    }
//
//
//}

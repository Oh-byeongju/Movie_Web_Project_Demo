package com.movie.Spring_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ReservationDto {

    private Long rid;
    private String rdate;
    private String mtitle;
    private String tarea;
    private String tname;
    private String cname;
    private String mistarttime;
    private List<String> seats;
    private Integer rprice;

    @Builder
    public ReservationDto(Long rid, String rdate, String mtitle, String tarea, String tname,
                          String cname, String mistarttime, List<String> seats, Integer rprice) {
        this.rid = rid;
        this.rdate = rdate;
        this.mtitle = mtitle;
        this.tarea = tarea;
        this.tname = tname;
        this.cname = cname;
        this.mistarttime = mistarttime;
        this.seats = seats;
        this.rprice = rprice;
    }
}
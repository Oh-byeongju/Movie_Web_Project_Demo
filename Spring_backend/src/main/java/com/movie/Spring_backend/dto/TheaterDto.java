package com.movie.Spring_backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor

public class TheaterDto {

    private Long tid;
    private String tname;
    private String taddr;
    private String tarea;

    public TheaterDto(Long tid, String tname, String taddr, String tarea) {
        this.tid=tid;
        this.tname=tname;
        this.taddr=taddr;
        this.tarea=tarea;
    }
}
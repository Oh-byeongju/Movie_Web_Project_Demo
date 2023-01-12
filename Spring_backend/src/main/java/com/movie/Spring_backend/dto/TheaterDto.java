package com.movie.Spring_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import com.movie.Spring_backend.entity.TheaterEntity;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
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
}

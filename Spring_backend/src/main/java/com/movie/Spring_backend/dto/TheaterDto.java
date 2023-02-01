package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.AreaEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.*;

import javax.persistence.*;
import java.awt.geom.Area;
import java.util.Date;

@Getter
@NoArgsConstructor

public class TheaterDto {


    private Long tid;

    private String tname;


    private String taddr;

    private AreaEntity area;

    public TheaterDto(Long tid, String tname, String taddr, AreaEntity area) {
        this.tid=tid;
        this.tname=tname;
        this.taddr=taddr;
        this.area=area;
    }
}

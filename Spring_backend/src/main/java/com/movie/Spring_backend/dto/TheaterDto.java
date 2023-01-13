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
@AllArgsConstructor

public class TheaterDto {


    private Long tid;

    private String tname;

    private String tarea;

    private String taddr;


}

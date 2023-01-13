package com.movie.Spring_backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
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

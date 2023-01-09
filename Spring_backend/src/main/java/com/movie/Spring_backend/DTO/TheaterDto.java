package com.movie.Spring_backend.DTO;
import com.movie.Spring_backend.entity.TheaterEntity;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@ToString
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TheaterDto {

    private long t_id;


    private String t_name;


    private String t_area;

    private String t_addr;





    public TheaterEntity toEntity(){
        return TheaterEntity.builder().t_id(this.t_id).t_name(this.t_name).t_area(this.t_area).t_addr(this.t_addr).build();

    }


}

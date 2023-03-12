package com.movie.Spring_backend.mapper;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ScheduleMapper {



    String theater;
    List<InfoMapper>infoMapper;

    @Builder
    public ScheduleMapper( String theater,
    List<InfoMapper>infoMapper)
    {
        this.theater=theater;
        this.infoMapper=infoMapper;
    }
}

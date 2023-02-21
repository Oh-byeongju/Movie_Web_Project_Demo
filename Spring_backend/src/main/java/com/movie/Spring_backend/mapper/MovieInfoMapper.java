package com.movie.Spring_backend.mapper;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MovieInfoMapper {

    public MovieInfoDto CountDto(MovieInfoEntity entity,String name, String type,Integer count,Integer allcount) {

        // 예외처리
        if (entity == null) {
            return null;
        }

        return  MovieInfoDto.builder().miid(entity.getMiid()).miday(entity.getMiday()).mistarttime(entity.getMistarttime()).miendtime(entity.getMiendtime())
                .name(name).type(type)  .count(count).allcount(allcount)
                .build();

    }


}

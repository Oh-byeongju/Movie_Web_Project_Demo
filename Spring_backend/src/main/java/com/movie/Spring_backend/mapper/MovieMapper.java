/*
    23-02-07 MovieEntity를 dto로 매핑하기 위한 클래스 생성(오병주)
 */

package com.movie.Spring_backend.mapper;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.entity.MovieEntity;
import org.springframework.stereotype.Component;

@Component
public class MovieMapper {
    public MovieDto toDto(MovieEntity entity, boolean like) {
        if (entity == null) {
            return null;
        }

        return MovieDto.builder()
                .mid(entity.getMid())
                .mdir(entity.getMdir())
                .mactor(entity.getMactor())
                .mtitle(entity.getMtitle())
                .msupactor(entity.getMsupactor())
                .mgenre(entity.getMgenre())
                .mtime(entity.getMtime())
                .mdate(entity.getMdate())
                .mrating(entity.getMrating())
                .mstory(entity.getMstory())
                .mimagepath(entity.getMimagepath())
                .mlikes(entity.getCntMovieLike())
                .mscore(entity.getAvgScore())
                .mlike(like).build();
    }
}

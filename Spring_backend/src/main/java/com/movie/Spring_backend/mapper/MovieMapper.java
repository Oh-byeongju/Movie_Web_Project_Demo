/*
    23-02-07 MovieEntity를 dto로 매핑하기 위한 클래스 생성(오병주)
 */

package com.movie.Spring_backend.mapper;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.entity.MovieEntity;
import org.springframework.stereotype.Component;

@Component
public class MovieMapper {

    // 영화 목록과 로그인한 사용자의 좋아요 기록을 mapping 해주는 메소드
    public MovieDto toDto(MovieEntity entity, boolean like) {

        // 예외처리
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


    public MovieDto toAble(MovieEntity entity) {

        // 예외처리
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
                .able("able").build();
    }
    public MovieDto toDisable(MovieEntity entity) {

        // 예외처리
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
                .able("disable")
                .build();
    }


}

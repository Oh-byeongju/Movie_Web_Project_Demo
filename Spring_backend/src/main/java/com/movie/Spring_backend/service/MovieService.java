package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.repository.MovieRepository;

import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@RequiredArgsConstructor
@Service
public class MovieService {

    private final MovieRepository movieRepository;

    //영화 테이블 불러오기
    public List<MovieDto> getMovie() {
        // Repository에 있는 함수, Entity형으로 디비에 있는 값을 불러옴
        List<MovieEntity> Datas = movieRepository.findAll();


        // 리턴을 해줄때는 entity형인 Datas를 dto형으로 바꿔줘야 해서 빌더패턴을 사용해서 매핑
        return Datas.stream()
                .map(data -> MovieDto.builder()
                        .mid(data.getMid())
                        .mtitle(data.getMtitle())
                        .mdir(data.getMdir())
                        .mactor(data.getMactor())
                        .msupactor(data.getMsupactor())
                        .mgenre(data.getMgenre())
                        .mtime(data.getMtime())
                        .mdate(data.getMdate())
                        .mrating(data.getMrating())
                        .mstory(data.getMstory())
                        .mlike(data.getMlike())
                        .mimagepath(data.getMimagepath())
                        .build()).collect(Collectors.toList());
    }

    //테이블의 아이디 값을 통해 불러오기
    public List<MovieDto> findById(Long id) {
        List<MovieEntity> datas = movieRepository.findByMid(id);

        return datas.stream().map(data-> MovieDto.builder()
                .mid(data.getMid())
                .mtitle(data.getMtitle())
                .mdir(data.getMdir())
                .mactor(data.getMactor())
                .msupactor(data.getMsupactor())
                .mgenre(data.getMgenre())
                .mtime(data.getMtime())
                .mdate(data.getMdate())
                .mrating(data.getMrating())
                .mstory(data.getMstory())
                .mlike(data.getMlike())
                .mimagepath(data.getMimagepath())
                .build()).collect(Collectors.toList());
    }

    //movie 페이지에서 검색 기능
    public List<MovieDto> findByMtitleContaining(String title) {
    List<MovieEntity> datas = movieRepository.findByMtitleContaining(title);

    if(!datas.isEmpty()) {
        return datas.stream().map(data -> MovieDto.builder()
                .mid(data.getMid())
                .mdir(data.getMdir())
                .mactor(data.getMactor())
                .msupactor(data.getMsupactor())
                .mgenre(data.getMgenre())
                .mtime(data.getMtime())
                .mdate(data.getMdate())
                .mrating(data.getMrating())
                .mstory(data.getMstory())
                .mlike(data.getMlike())
                .mimagepath(data.getMimagepath())
                .build()).collect(Collectors.toList());
    }
    else{
        throw new MovieNotFoundException("검색 결과 없습니다.");
    }
}
}

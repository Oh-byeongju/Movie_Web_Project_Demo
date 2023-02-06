package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieMemberEntity;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.repository.MovieMemberRepository;
import com.movie.Spring_backend.repository.MovieRepository;

import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final MovieMemberRepository movieMemberRepository;

    // 영화 테이블 불러오기
    @Transactional
    public List<MovieDto> getMovie() {
        // Repository에 있는 메소드, Entity형으로 디비에 있는 값을 불러옴
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
                        .mimagepath(data.getMimagepath())
                        .mlike(data.getCntMovieLike())
                        .mscore(data.getAvgScore())
                        .build()).collect(Collectors.toList());
    }

    //테이블의 아이디 값을 통해 불러오기
    @Transactional
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
                .mimagepath(data.getMimagepath())
                .mlike(data.getCntMovieLike())
                .mscore(data.getAvgScore())
                .build()).collect(Collectors.toList());
    }

    @Transactional
    public List<MovieDto> findByMidIn(List<Long> mid) {
        List<MovieEntity> datas = movieRepository.findByMidIn(mid);

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
                .mimagepath(data.getMimagepath())
                .mlike(data.getCntMovieLike())
                .mscore(data.getAvgScore())
                .build()).collect(Collectors.toList());
    }


    //movie 페이지에서 검색 기능
    @Transactional
    public List<MovieDto> findByMtitleContaining(String title) {
    List<MovieEntity> datas = movieRepository.findByMtitleContaining(title);

    if(!datas.isEmpty()) {
        return datas.stream().map(data -> MovieDto.builder()
                .mid(data.getMid())
                .mdir(data.getMdir())
                .mactor(data.getMactor())
                .mtitle(data.getMtitle())
                .msupactor(data.getMsupactor())
                .mgenre(data.getMgenre())
                .mtime(data.getMtime())
                .mdate(data.getMdate())
                .mrating(data.getMrating())
                .mstory(data.getMstory())
                .mimagepath(data.getMimagepath())
                .mlike(data.getCntMovieLike())
                .mscore(data.getAvgScore())
                .build()).collect(Collectors.toList());
    }
    else {
        throw new MovieNotFoundException("검색 결과 없습니다.");
        }
    }


    // test중
    public List<MovieDto> getTest(String uid) {
        List<MovieMemberEntity> datas = movieMemberRepository.findAll();

        return datas.stream().map(data-> MovieDto.builder()
                .mid(data.getMovie().getMid())
                .build()).collect(Collectors.toList());
    }
}

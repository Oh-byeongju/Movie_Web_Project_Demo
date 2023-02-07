package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieMemberEntity;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.mapper.MovieMapper;
import com.movie.Spring_backend.repository.MovieMemberRepository;
import com.movie.Spring_backend.repository.MovieRepository;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final MovieMemberRepository movieMemberRepository;
    private final MovieMapper movieMapper;

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
                        .mlikes(data.getCntMovieLike())
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
                .mlikes(data.getCntMovieLike())
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
                .mlikes(data.getCntMovieLike())
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
                .mlikes(data.getCntMovieLike())
                .mscore(data.getAvgScore())
                .build()).collect(Collectors.toList());
    }
    else {
        throw new MovieNotFoundException("검색 결과 없습니다.");
        }
    }

    // test중
    public List<MovieDto> getTest(String uid) {

        // 모든 영화 검색
        List<MovieEntity> Movies = movieRepository.findAll();

        // 받은 dto 정보를 entity 형으로 변환 // 수정바람
        MemberEntity member = MemberEntity.builder()
                    .uid(uid).build();

        // 사용자가 좋아요 누른 영화 목록
        List<MovieMemberEntity> MovieLike = movieMemberRepository.findByUmlikeTrueAndMember(member);

        // 좋아요 누른 영화 목록의 중복제거를 위해 HashSet 으로 변환
        Set<Long> MovieLikeNum = new HashSet<>();
        for (MovieMemberEntity mm : MovieLike) {
            MovieLikeNum.add(mm.getMovie().getMid());
        }

        return Movies.stream().map(movie ->
                // movieIds Set에 movie의 기본 키가 있다면 movieLike에 true를 할당. 없다면 false를 할당
                movieMapper.toDto(movie, MovieLikeNum.contains(movie.getMid()))).collect(Collectors.toList());

    }
}

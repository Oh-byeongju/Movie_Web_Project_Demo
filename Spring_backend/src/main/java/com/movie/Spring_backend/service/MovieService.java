/*
 23-02-07 전체영화 조회 및 사용자 영화 검색 메소드 수정(오병주)
*/
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

    // 전체 영화 조회 메소드
    @Transactional
    public List<MovieDto> getAllMovie(String uid) {
        // 테이블 내의 모든 영화 검색
        List<MovieEntity> Movies = movieRepository.findAll();

        // 받은 id 정보를 entity 형으로 변환(로그인 정보가 없으면 전달받은 매개변수 uid가 No_login 으로 설정)
        MemberEntity member = MemberEntity.builder()
                .uid(uid).build();

        // 사용자가 좋아요 누른 영화 목록 검색
        List<MovieMemberEntity> MovieLike = movieMemberRepository.findByUmlikeTrueAndMember(member);

        // 좋아요 누른 영화 목록의 중복제거를 위해 HashSet 으로 변환
        Set<Long> MovieLikeNum = new HashSet<>();
        for (MovieMemberEntity mm : MovieLike) {
            MovieLikeNum.add(mm.getMovie().getMid());
        }

        // 영화 목록과 좋아요 기록을 mapping 후 리턴
        return Movies.stream().map(movie ->
                movieMapper.toDto(movie, MovieLikeNum.contains(movie.getMid()))).collect(Collectors.toList());
    }

    // 사용자 영화 검색 메소드
    @Transactional
    public List<MovieDto> findByMtitleContaining(String title, String uid) {
        // 사용자가 입력한 제목으로 영화 검색(제목의 일부분 검색도 지원)
        List<MovieEntity> Movies = movieRepository.findByMtitleContaining(title);

        // 받은 id 정보를 entity 형으로 변환(로그인 정보가 없으면 전달받은 매개변수 uid가 No_login 으로 설정)
        MemberEntity member = MemberEntity.builder()
                .uid(uid).build();

        // 사용자가 좋아요 누른 영화 목록 검색
        List<MovieMemberEntity> MovieLike = movieMemberRepository.findByUmlikeTrueAndMember(member);

        // 좋아요 누른 영화 목록의 중복제거를 위해 HashSet 으로 변환
        Set<Long> MovieLikeNum = new HashSet<>();
        for (MovieMemberEntity mm : MovieLike) {
            MovieLikeNum.add(mm.getMovie().getMid());
        }

        // 검색된 영화가 없을경우 예외처리 아닐 경우 영화 목록과 좋아요 기록을 mapping 후 리턴
        if(!Movies.isEmpty()) {
            return Movies.stream().map(movie ->
                    movieMapper.toDto(movie, MovieLikeNum.contains(movie.getMid()))).collect(Collectors.toList());
        }
        else {
            throw new MovieNotFoundException("검색 결과 없습니다.");
        }
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
}

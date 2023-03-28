/*
  23-03-27 관리자 페이지 사용자 관리 구현(오병주)
  23-03-28 관리자 페이지 사용자 예매 현황 구현(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.IdDuplicateException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.MovieMapper;
import com.movie.Spring_backend.repository.MemberRepository;
import com.movie.Spring_backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManagerMemberService {

    private final MemberRepository memberRepository;
    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;
    private final JwtValidCheck jwtValidCheck;

    // 유저 조회 메소드
    @Transactional
    public List<MemberDto> AllMemberSearch(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        List<MemberEntity> Members;
        // 사용자를 이름순으로 정렬후 조회(검색된 단어 포함)
        if (requestMap.get("sort").equals("name")) {
            Members = memberRepository.findByUidContainingOrderByUnameAsc(requestMap.get("search"));
        }
        // 사용자를 가입순으로 정렬후 조회(검색된 단어 포함)
        else {
            Members = memberRepository.findByUidContainingOrderByUjoindateAsc(requestMap.get("search"));
        }

        // 필요한 정보를 dto로 매핑 후 리턴
        return Members.stream().map(member -> MemberDto.builder()
                        .uid(member.getUid())
                        .uname(member.getUname())
                        .uemail(member.getUemail())
                        .utel(member.getUtel())
                        .uaddr(member.getUaddr())
                        .uaddrsecond(member.getUaddrsecond())
                        .ubirth(member.getUbirth())
                        .ujoindate(member.getUjoindate()).build()).collect(Collectors.toList());
    }

    // 유저 추방 메소드
    @Transactional
    public void DropMember(HttpServletRequest request, String uid) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 사용자 테이블에서 사용자 제거(연관된 DB 내용은 CascadeType.REMOVE 때문에 연쇄 삭제)
        memberRepository.deleteById(uid);
    }

    // 전체 영화 불러오는 메소드
    @Transactional
    public List<MovieDto> AllMovieSearch(HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 영화 테이블에 존재하는 모든 영화 검색(개봉일순으로 오름차순)
        List<MovieEntity> Movies = movieRepository.findAllByOrderByMdateAsc();

        // 영화 테이블에서 현재 예매가 가능한 영화들 조회
        List<MovieEntity> MoviePossible = movieRepository.findShowMoviesReserve();

        // 예매가 가능한 영화의 기본키를 List로 변환
        List<Long> MoviePossibleList = new ArrayList<>();
        for (MovieEntity m : MoviePossible) {
            MoviePossibleList.add(m.getMid());
        }

        // 위에서 검색한 영화 목록과 예매 가능 여부를 mapping 후 리턴
        return Movies.stream().map(movie ->
                movieMapper.toDtoManagerReserve(movie, MoviePossibleList.contains(movie.getMid()))).collect(Collectors.toList());
    }
}

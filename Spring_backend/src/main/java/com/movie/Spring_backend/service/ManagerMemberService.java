/*
  23-03-27 관리자 페이지 사용자 관리 구현(오병주)
  23-03-28 ~ 30 관리자 페이지 사용자 예매 현황 구현(오병주)
  23-03-31 ~ 23-04-01관리자 페이지 관람평 관리 구현(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.*;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.IdDuplicateException;
import com.movie.Spring_backend.exceptionlist.MovieCommentNotFoundException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.MovieCommentMapper;
import com.movie.Spring_backend.mapper.MovieMapper;
import com.movie.Spring_backend.mapper.ReservationMapper;
import com.movie.Spring_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    private final TheaterRepository theaterRepository;
    private final ReservationRepository reservationRepository;
    private final MovieMemberRepository movieMemberRepository;
    private final CommentInfoRepository commentInfoRepository;
    private final MovieMapper movieMapper;
    private final ReservationMapper reservationMapper;
    private final MovieCommentMapper movieCommentMapper;
    private final JwtValidCheck jwtValidCheck;

    // 유저 조회 메소드
    @Transactional
    public Page<MemberDto> AllMemberSearch(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        String search = requestMap.get("search");
        String sort = requestMap.get("sort");
        int page = Integer.parseInt(requestMap.get("page"));
        int size = Integer.parseInt(requestMap.get("size"));

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        Page<MemberEntity> Members;
        // 사용자를 이름순으로 정렬후 조회(검색된 단어 포함)
        if (sort.equals("name")) {
            Members = memberRepository.findByUidContainingOrderByUnameAsc(search, PageInfo);
        }
        // 사용자를 가입순으로 정렬후 조회(검색된 단어 포함)
        else {
            Members = memberRepository.findByUidContainingOrderByUjoindateAsc(search, PageInfo);
        }

        // 프론트단에서 요청한 조건으로 얻을 수 있는 최대 페이지 number(PageSize에 의해 계산됨)
        int max_index = Members.getTotalPages() - 1;
        if (max_index == -1) {
            max_index = 0;
        }

        // 최대 페이지 number가 프론트단에서 요청한 페이지 number보다 작을경우 최대 페이지 number로 재검색
        if (max_index < page) {
            PageInfo = PageRequest.of(max_index, size);
            if (sort.equals("name")) {
                Members = memberRepository.findByUidContainingOrderByUnameAsc(search, PageInfo);
            }
            // 사용자를 가입순으로 정렬후 조회(검색된 단어 포함)
            else {
                Members = memberRepository.findByUidContainingOrderByUjoindateAsc(search, PageInfo);
            }
        }

        // 필요한 정보를 dto로 매핑 후 리턴
        return Members.map(member -> MemberDto.builder()
                        .uid(member.getUid())
                        .uname(member.getUname())
                        .uemail(member.getUemail())
                        .utel(member.getUtel())
                        .uaddr(member.getUaddr())
                        .uaddrsecond(member.getUaddrsecond())
                        .ubirth(member.getUbirth())
                        .ujoindate(member.getUjoindate()).build());
    }

    // 유저 추방 메소드
    @Transactional
    public Page<MemberDto> DropMember(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        String uid = requestMap.get("uid");
        String search = requestMap.get("search");
        String sort = requestMap.get("sort");
        int page = Integer.parseInt(requestMap.get("page"));
        int size = Integer.parseInt(requestMap.get("size"));

        // 사용자 테이블에서 사용자 제거(연관된 DB 내용은 CascadeType.REMOVE 때문에 연쇄 삭제)
        memberRepository.deleteById(uid);

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        Page<MemberEntity> Members;
        // 사용자를 이름순으로 정렬후 조회(검색된 단어 포함)
        if (sort.equals("name")) {
            Members = memberRepository.findByUidContainingOrderByUnameAsc(search, PageInfo);
        }
        // 사용자를 가입순으로 정렬후 조회(검색된 단어 포함)
        else {
            Members = memberRepository.findByUidContainingOrderByUjoindateAsc(search, PageInfo);
        }

        // 프론트단에서 요청한 조건으로 얻을 수 있는 최대 페이지 number(PageSize에 의해 계산됨)
        int max_index = Members.getTotalPages() - 1;
        if (max_index == -1) {
            max_index = 0;
        }

        // 최대 페이지 number가 프론트단에서 요청한 페이지 number보다 작을경우 최대 페이지 number로 재검색
        if (max_index < page) {
            PageInfo = PageRequest.of(max_index, size);
            if (sort.equals("name")) {
                Members = memberRepository.findByUidContainingOrderByUnameAsc(search, PageInfo);
            }
            // 사용자를 가입순으로 정렬후 조회(검색된 단어 포함)
            else {
                Members = memberRepository.findByUidContainingOrderByUjoindateAsc(search, PageInfo);
            }
        }

        // 필요한 정보를 dto로 매핑 후 리턴
        return Members.map(member -> MemberDto.builder()
                .uid(member.getUid())
                .uname(member.getUname())
                .uemail(member.getUemail())
                .utel(member.getUtel())
                .uaddr(member.getUaddr())
                .uaddrsecond(member.getUaddrsecond())
                .ubirth(member.getUbirth())
                .ujoindate(member.getUjoindate()).build());
    }

    // 전체 영화 불러오는 메소드
    // 이거 이사가야 할수도 있음 MangerOne으로
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

        // 위에서 검색한 영화 목록과 예매 가능 여부, 전체 예매 횟수를 mapping 후 리턴
        return Movies.stream().map(movie ->
                movieMapper.toDtoManagerReserve(movie, MoviePossibleList.contains(movie.getMid()))).collect(Collectors.toList());
    }

    // 전체 극장 불러오는 메소드
    // 이거 이사가야 할수도 있음 MangerOne으로
    @Transactional
    public List<TheaterDto> AllTheaterSearch(HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 모든 극장 검색
        List<TheaterEntity> Theaters = theaterRepository.findAll();

        // 검색한 극장 리턴
        return Theaters.stream().map(theater -> TheaterDto.builder()
                        .tid(theater.getTid())
                        .tname(theater.getTname())
                        .taddr(theater.getTaddr())
                        .tarea(theater.getTarea()).build()).collect(Collectors.toList());
    }

    // 특정 영화의 예매기록을 불러오는 메소드
    @Transactional
    public Page<ReservationDto> MovieReserveSearch(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        Long mid = Long.valueOf(requestMap.get("mid"));
        int page = Integer.parseInt(requestMap.get("page"));
        int size = Integer.parseInt(requestMap.get("size"));

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        // JPA 사용을 위한 형 변환
        MovieEntity movie = MovieEntity.builder().mid(mid).build();

        // 특정 영화의 모든 예매기록 검색(예매일 순으로 내림차순)
        Page<ReservationEntity> Reservations = reservationRepository.findManagerReserveMovie(movie, PageInfo);

        // 프론트단에서 요청한 조건으로 얻을 수 있는 최대 페이지 number(PageSize에 의해 계산됨)
        int max_index = Reservations.getTotalPages() - 1;
        if (max_index == -1) {
            max_index = 0;
        }

        // 최대 페이지 number가 프론트단에서 요청한 페이지 number보다 작을경우 최대 페이지 number로 재검색
        if (max_index < page) {
            PageInfo = PageRequest.of(max_index, size);
            Reservations = reservationRepository.findManagerReserveMovie(movie, PageInfo);
        }


        // 이거 매퍼에서 빼도 될듯
        // 예매기록을 매핑 후 리턴
        return Reservations.map(reservationMapper::ManagerListMappingMovie);
    }

    // 특정 극장의 예매기록을 불러오는 메소드
    @Transactional
    public Page<ReservationDto> TheaterReserveSearch(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        Long tid = Long.valueOf(requestMap.get("tid"));
        int page = Integer.parseInt(requestMap.get("page"));
        int size = Integer.parseInt(requestMap.get("size"));

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        // JPA 사용을 위한 형 변환
        TheaterEntity theater = TheaterEntity.builder().tid(tid).build();

        // 특정 극장의 예매기록 검색(예매일 순으로 내림차순)
        Page<ReservationEntity> Reservations = reservationRepository.findManagerReserveTheater(theater, PageInfo);

        // 프론트단에서 요청한 조건으로 얻을 수 있는 최대 페이지 number(PageSize에 의해 계산됨)
        int max_index = Reservations.getTotalPages() - 1;
        if (max_index == -1) {
            max_index = 0;
        }

        // 최대 페이지 number가 프론트단에서 요청한 페이지 number보다 작을경우 최대 페이지 number로 재검색
        if (max_index < page) {
            PageInfo = PageRequest.of(max_index, size);
            Reservations = reservationRepository.findManagerReserveTheater(theater, PageInfo);
        }


        // 이거 매퍼에서 빼도 될듯
        // 예매기록을 매핑 후 리턴
        return Reservations.map(reservationMapper::ManagerListMappingTheater);
    }

    // 특정 영화에 있는 관람평을 가져오는 메소드
    @Transactional
    public Page<CommentInfoDto> MovieCommentSearch(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        Long mid = Long.valueOf(requestMap.get("mid"));
        int page = Integer.parseInt(requestMap.get("page"));
        int size = Integer.parseInt(requestMap.get("size"));

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        // 영화 id 정보를 entity 형으로 변환
        MovieEntity movie = MovieEntity.builder().mid(mid).build();

        // 영화 id를 기반으로 MovieMember table 검색(최신순)
        Page<MovieMemberEntity> MovieMembers = movieMemberRepository.findByMovieAndUmcommentIsNotNullOrderByUmcommenttimeDesc(movie, PageInfo);

        // 프론트단에서 요청한 조건으로 얻을 수 있는 최대 페이지 number(PageSize에 의해 계산됨)
        int max_index = MovieMembers.getTotalPages() - 1;
        if (max_index == -1) {
            max_index = 0;
        }

        // 최대 페이지 number가 프론트단에서 요청한 페이지 number보다 작을경우 최대 페이지 number로 재검색
        if (max_index < page) {
            PageInfo = PageRequest.of(max_index, size);
            MovieMembers = movieMemberRepository.findByMovieAndUmcommentIsNotNullOrderByUmcommenttimeDesc(movie, PageInfo);
        }

        // 관람평 목록과 좋아요 기록을 mapping 후 리턴
        return MovieMembers.map(MovieMember -> movieCommentMapper.toDto(MovieMember, false));
    }

    // 특정 영화에 있는 관람평을 삭제하는 메소드
    @Transactional
    public Page<CommentInfoDto> MovieCommentDelete(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 데이터 추출 및 형변환
        Long umid = Long.valueOf(requestMap.get("umid"));
        Long mid = Long.valueOf(requestMap.get("mid"));
        int page = Integer.parseInt(requestMap.get("page"));
        int size = Integer.parseInt(requestMap.get("size"));

        // 관람평 id를 이용해서 관람평 튜플 검색
        MovieMemberEntity MovieMember = movieMemberRepository.findById(umid).orElse(null);

        // 영화에 대한 좋아요 기록이 있으면 튜플 update
        if (MovieMember != null && MovieMember.getUmlike() != null && MovieMember.getUmlike()) {
            // 튜플 update 시 필요한 entity 생성
            MemberEntity Member = MemberEntity.builder().uid(MovieMember.getMember().getUid()).build();
            MovieEntity Movie = MovieEntity.builder().mid(MovieMember.getMovie().getMid()).build();

            // 관람평에 대한 내용을 모두 null 로 교체
            movieMemberRepository.MovieCommentNull(Member, Movie);
            // 관람평에 적용됐던 좋아요 모두 삭제
            commentInfoRepository.deleteByMoviemember(MovieMember);
        }
        // 영화에 대한 좋아요 기록이 없을경우 바로 MovieMember 튜플 제거
        else {
            movieMemberRepository.deleteById(umid);
        }

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        // 영화 id 정보를 entity 형으로 변환
        MovieEntity movie = MovieEntity.builder().mid(mid).build();

        // 영화 id를 기반으로 MovieMember table 검색(최신순)
        Page<MovieMemberEntity> MovieMembers = movieMemberRepository.findByMovieAndUmcommentIsNotNullOrderByUmcommenttimeDesc(movie, PageInfo);

        // 프론트단에서 요청한 조건으로 얻을 수 있는 최대 페이지 number(PageSize에 의해 계산됨)
        int max_index = MovieMembers.getTotalPages() - 1;
        if (max_index == -1) {
            max_index = 0;
        }

        // 최대 페이지 number가 프론트단에서 요청한 페이지 number보다 작을경우 최대 페이지 number로 재검색
        if (max_index < page) {
            PageInfo = PageRequest.of(max_index, size);
            MovieMembers = movieMemberRepository.findByMovieAndUmcommentIsNotNullOrderByUmcommenttimeDesc(movie, PageInfo);
        }

        // 관람평 목록과 좋아요 기록을 mapping 후 리턴
        return MovieMembers.map(Moviemember -> movieCommentMapper.toDto(Moviemember, false));
    }
}

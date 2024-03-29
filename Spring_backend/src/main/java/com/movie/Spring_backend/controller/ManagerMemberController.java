/*
  23-03-27 관리자 페이지 사용자 관리 구현(오병주)
  23-03-28 ~ 30 관리자 페이지 사용자 예매 현황 구현(오병주)
  23-03-31 ~ 23-04-01 관리자 페이지 관람평 관리 구현(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.*;
import com.movie.Spring_backend.service.ManagerMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Manager")
public class ManagerMemberController {

    private final ManagerMemberService managerMemberService;

    // 사용자 조회 메소드
    // manager security 설정 나중에 하기
    @GetMapping("/auth/allUser")
    public ResponseEntity<Page<MemberDto>> AllMember(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.AllMemberSearch(request, requestMap));
    }

    // 특정 사용자 추방하는 메소드
    @DeleteMapping("/auth/dropUser")
    public ResponseEntity<Page<MemberDto>> DropMember(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.DropMember(request, requestMap));
    }

    // 영화 조회 메소드
    @GetMapping("/auth/allMovie")
    public ResponseEntity<List<MovieDto>> AllMovie(HttpServletRequest request) {
        return ResponseEntity.ok().body(managerMemberService.AllMovieSearch(request));
    }

    // 극장 조회 메소드
    @GetMapping("/auth/allTheater")
    public ResponseEntity<List<TheaterDto>> AllTheater(HttpServletRequest request) {
        return ResponseEntity.ok().body(managerMemberService.AllTheaterSearch(request));
    }

    // 예매기록 조회 메소드(영화 선택)
    @GetMapping("/auth/allMovieReserve")
    public ResponseEntity<Page<ReservationDto>> MovieReserve(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.MovieReserveSearch(request, requestMap));
    }

    // 예매기록 조회 메소드(극장 선택)
    @GetMapping("/auth/allTheaterReserve")
    public ResponseEntity<Page<ReservationDto>> TheaterReserve(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.TheaterReserveSearch(request, requestMap));
    }

    // 관람평 조회 메소드
    @GetMapping("/auth/allMovieComment")
    public ResponseEntity<Page<CommentInfoDto>> MovieComment(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.MovieCommentSearch(request, requestMap));
    }

    // 관람평 삭제 메소드
    @DeleteMapping("/auth/allMovieCommentDelete")
    public ResponseEntity<Page<CommentInfoDto>> MovieCommentDelete(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.MovieCommentDelete(request, requestMap));
    }
}

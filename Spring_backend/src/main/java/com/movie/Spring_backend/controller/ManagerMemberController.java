/*
  23-03-27 관리자 페이지 사용자 관리 구현(오병주)
  23-03-28 ~ 29 관리자 페이지 사용자 예매 현황 구현(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.ReservationDto;
import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.service.ManagerMemberService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<List<MemberDto>> AllMember(HttpServletRequest request, @RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerMemberService.AllMemberSearch(request, requestMap));
    }

    // 특정 사용자 추방하는 메소드
    @PostMapping("/auth/dropUser")
    public ResponseEntity<String> DropMember(HttpServletRequest request, @RequestBody MemberDto requestDto) {
        managerMemberService.DropMember(request, requestDto.getUid());
        return ResponseEntity.noContent().build();
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
    public ResponseEntity<List<ReservationDto>> AllMovieReserve(HttpServletRequest request, @RequestParam(value = "mid") Long mid) {
        return ResponseEntity.ok().body(managerMemberService.MovieReserveSearch(request, mid));
    }

    // 예매기록 조회 메소드(극장 선택)
    @GetMapping("/auth/allTheaterReserve")
    public ResponseEntity<List<ReservationDto>> AllTheaterReserve(HttpServletRequest request, @RequestParam(value = "tid") Long tid) {
        return ResponseEntity.ok().body(managerMemberService.TheaterReserveSearch(request, tid));
    }
}

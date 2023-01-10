package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class MemberController {

    // ResponseEntity가 뭔지도 읽어봐야함
    private final MemberService memberService;

    @GetMapping("/id")
    public ResponseEntity<MemberDto> getData(@RequestParam("uId") String id) {
        MemberDto responseDto = MemberDto.builder().u_id(id).build();
        return ResponseEntity.ok().body(memberService.getID(responseDto));
    }

    // 아이디 중복 검사하고 그거 어디에 집어 넣어놔야함
    // 아직 불안한 컨트롤러임 (파라미터를 dto로 받는걸 생각해야함)
}
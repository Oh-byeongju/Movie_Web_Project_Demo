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

//    @GetMapping("/id")
//    public ResponseEntity<MemberDto> getData(@RequestBody MemberDto responseDto) {
//        return ResponseEntity.ok().body(memberService.getID(responseDto));
//    } 수정중
}
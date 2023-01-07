package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.repo.MemberRepository;
import com.movie.Spring_backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController // JSON 형태 결과값을 반환해줌 (@ResponseBody가 필요없음)
@RequiredArgsConstructor // final 객체를 Constructor Injection 해줌. (Autowired 역할)
@RequestMapping("/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private MemberService memberService;
    @Autowired
    MemberController(MemberService memberService){
        this.memberService=memberService;
    }

    @GetMapping(value="/products")
    @ResponseBody
    public List<MemberEntity> getProduct(){
        return memberService.readAllService();
    }



}

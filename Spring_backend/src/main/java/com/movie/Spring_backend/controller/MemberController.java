package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.repo.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController // JSON 형태 결과값을 반환해줌 (@ResponseBody가 필요없음)
@RequiredArgsConstructor // final 객체를 Constructor Injection 해줌. (Autowired 역할)
@RequestMapping("/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {
    private final MemberRepository memberRepository;
    @GetMapping("member")
    public List<MemberEntity> findAllMember() {
        return memberRepository.findAll();
    }
}

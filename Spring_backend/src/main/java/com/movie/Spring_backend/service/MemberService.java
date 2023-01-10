package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberDto existsId(String id) {
        // 아이디를 임시저장해야 하는지 생각해보기
        MemberEntity Data = memberRepository.findByUid(id).orElseThrow(() -> new RuntimeException("이미 사용중인 아이디입니다."));
        String name = Data.getUid();
        System.out.println(name);

        return MemberDto.builder().uid(name).build();
    }
}

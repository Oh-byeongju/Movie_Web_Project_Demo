package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor

public class MemberService {

    private final MemberRepository memberRepository;

    public MemberDto getID(MemberDto responseDto) {

        MemberEntity Data = memberRepository.findByuId(responseDto.getU_id()).orElseThrow(() -> new RuntimeException("유저가 없습니다."));
        String name = Data.getUId();
        System.out.println(name);

        return MemberDto.builder().u_id(name).build();
    }
}

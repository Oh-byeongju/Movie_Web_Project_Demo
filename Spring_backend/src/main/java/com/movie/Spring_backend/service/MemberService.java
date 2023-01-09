package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class MemberService {

//    private final MemberRepository memberRepository;
//
//    public MemberDto getID(MemberDto responseDto) {
//        MemberEntity Data = memberRepository.findByID(responseDto.getU_id());
//
//        return new MemberDto(Data.getU_id());
//    } 수정중
}

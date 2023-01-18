// 23-01-18 회원정보 확인을 위한 Service 구현(오병주)
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.exceptionlist.MemberNotFoundException;
import com.movie.Spring_backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberRepository memberRepository;

    // 로그인 상태확인 메소드
    @Transactional
    public MemberDto getMyInfoBySecurity(String currentMemberId) {
        MemberEntity Data = memberRepository.findByUid(currentMemberId)
                .orElseThrow(() -> new MemberNotFoundException(currentMemberId));

        // 로그인 정보가 있을경우 id와 이름을 리턴
        return MemberDto.builder()
                .uid(Data.getUid())
                .uname(Data.getUname()).build();
    }
}
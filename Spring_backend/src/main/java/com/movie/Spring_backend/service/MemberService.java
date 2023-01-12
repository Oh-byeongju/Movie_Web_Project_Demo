package com.movie.Spring_backend.service;

import com.movie.Spring_backend.exceptionlist.IdDuplicateException;
import com.movie.Spring_backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public void existsId(String id) {
        // 아이디 중복 확인하고 중복일 경우 예외를 던져줌
        if (memberRepository.existsByUid(id)) {
            throw new IdDuplicateException(id);
        }
    }
}

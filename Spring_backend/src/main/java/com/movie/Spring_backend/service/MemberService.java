// 23-01-13 아이디 중복 검사 기능구현(오병주)
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.exceptionlist.IdDuplicateException;
import com.movie.Spring_backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    @Transactional
    public void existsId(String id) {
        // 아이디 중복을 확인하고 중복일 경우 예외를 던져줌
        if (memberRepository.existsByUid(id)) {
            throw new IdDuplicateException("중복된 아이디입니다.");
        }
    }
}

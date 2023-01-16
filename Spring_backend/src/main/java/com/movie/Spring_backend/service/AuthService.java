// 23-01-16
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.dto.MemberResponseDto;
import com.movie.Spring_backend.entity.Authority;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.jwt.TokenProvider;
import com.movie.Spring_backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

}
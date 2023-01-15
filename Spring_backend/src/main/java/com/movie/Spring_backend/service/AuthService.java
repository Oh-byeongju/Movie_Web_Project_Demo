//// 23-01-16 회원가입을 위한 Service 생성(오병주)
//package com.movie.Spring_backend.service;
//
//import com.movie.Spring_backend.dto.MemberDto;
//import com.movie.Spring_backend.dto.MemberResponseDto;
//import com.movie.Spring_backend.entity.Authority;
//import com.movie.Spring_backend.entity.MemberEntity;
//import com.movie.Spring_backend.jwt.TokenProvider;
//import com.movie.Spring_backend.repository.MemberRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import javax.transaction.Transactional;
//
//@Service
//@RequiredArgsConstructor
//public class AuthService {
//
//    private final MemberRepository memberRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final TokenProvider tokenProvider;
//
//    // 회원가입을 위한 메소드
//    @Transactional
//    public void signup(MemberDto requestDto) {
//
//        // 파라미터로 전달받은 requestDto의 내용을 통해 MemberEntity 형의 member 생성
//        MemberEntity member = MemberEntity.builder()
//                .uid(requestDto.getUid())
//                .upw(passwordEncoder.encode(requestDto.getUpw()))
//                .uname(requestDto.getUname())
//                .uemail(requestDto.getUemail())
//                .utel(requestDto.getUtel())
//                .uaddr(requestDto.getUaddr())
//                .ubirth(requestDto.getUbirth())
//                .uauthority(Authority.ROLE_USER).build();
//
//        // 생성된 member(회원정보)를 DB에 저장
//        // save 할때 update 되는거 조심(추후 방안 연구)
//        // 여기서 id를 한번 더 검색하든지 해야할듯
//       memberRepository.save(member);
//    }
//}
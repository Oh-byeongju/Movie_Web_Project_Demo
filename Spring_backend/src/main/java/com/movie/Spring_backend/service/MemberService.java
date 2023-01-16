// 23-01-13 아이디 중복 검사 메소드구현(오병주)
// 23-01-16 회원가입 및 로그인 메소드구현(오병주)
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.dto.TokenDto;
import com.movie.Spring_backend.entity.Authority;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.exceptionlist.IdDuplicateException;
import com.movie.Spring_backend.exceptionlist.MemberNotFoundException;
import com.movie.Spring_backend.jwt.TokenProvider;
import com.movie.Spring_backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder managerBuilder;

    // 아이디 중복을 확인하기 위한 메소드
    @Transactional
    public void existsId(String id) {
        // 아이디 중복을 확인하고 중복일 경우 예외를 던져줌
        if (memberRepository.existsByUid(id)) {
            throw new IdDuplicateException("중복된 아이디입니다.");
        }
    }

    // 회원가입을 위한 메소드
    @Transactional
    public void signup(MemberDto requestDto) {
        // 거의 희박한 확률이지만 A와 B라는 사람이 회원가입을 하고 있을 때 동시에 같은 아이디를 입력하였고,
        // 그때 그 아이디가 DB에 없어서 사전에 중복확인을 실패하여 먼저 회원가입 버튼을 누른 사람은 가입을 시켜도 되지만
        // 두번째로 회원가입 버튼을 누른 사람은 회원가입이 되면 안되므로 추가한 예외
        if (memberRepository.existsByUid(requestDto.getUid())) {
            throw new IdDuplicateException("중복 회원가입 방지", 1);
        }

        // 파라미터로 전달받은 requestDto의 내용을 통해 MemberEntity 형의 member 생성
        MemberEntity member = MemberEntity.builder()
                .uid(requestDto.getUid())
                .upw(passwordEncoder.encode(requestDto.getUpw()))
                .uname(requestDto.getUname())
                .uemail(requestDto.getUemail())
                .utel(requestDto.getUtel())
                .uaddr(requestDto.getUaddr())
                .ubirth(requestDto.getUbirth())
                .uauthority(Authority.ROLE_USER).build();

        // 생성된 member(회원정보)를 DB에 저장
        memberRepository.save(member);
    }

    // 로그인 메소드
    @Transactional
    public TokenDto login(MemberDto requestDto) {

        // 서비스단에서 우선적으로 예외를 처리하기 위한 코드
        MemberEntity Data = memberRepository.findByUid(requestDto.getUid())
                .orElseThrow(() -> new MemberNotFoundException(requestDto.getUid()));

        // Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = toAuthentication(requestDto.getUid(), requestDto.getUpw());

        // 실제로 검증 (사용자 비밀번호 확인)이 이루어지는 부분
        // authenticate 메소드가 실행 될 때 CustomUserDetailsService에서 구현했던 loadUserByUsername 메소드가 실행됨
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        // 인증 정보를 기반으로 Jwt 토큰 생성후 리턴
        return tokenProvider.generateTokenDto(authentication);
    }

    // 로그인 상태확인 메소드
    public MemberDto getMyInfoBySecurity(String currentMemberId) throws AuthenticationException {
        // 파라미터로 받은 id값을 이용하여 로그인 정보를 확인
        if (!memberRepository.existsByUid(currentMemberId)) {
            throw new AuthenticationException("로그인 정보가 없습니다.");
        }

        MemberEntity Data = memberRepository.findByUid(currentMemberId)
                .orElseThrow(() -> new MemberNotFoundException(currentMemberId));

        // 로그인 정보가 있을경우 id와 이름을 리턴
        return MemberDto.builder().
                uid(Data.getUid()).
                uname(Data.getUname()).build();
    }

    // id와 pw를 파라미터로 전달 받아 UsernamePasswordAuthenticationToken 으로 반환하여 리턴해주는 메소드
    public UsernamePasswordAuthenticationToken toAuthentication(String uid, String upw) {
        return new UsernamePasswordAuthenticationToken(uid, upw);
    }
}

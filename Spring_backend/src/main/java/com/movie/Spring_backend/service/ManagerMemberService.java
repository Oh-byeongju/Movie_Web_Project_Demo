/*
  23-03-27 관리자 페이지 사용자 관리 구현(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.entity.Authority;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.exceptionlist.IdDuplicateException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManagerMemberService {

    private final MemberRepository memberRepository;
    private final JwtValidCheck jwtValidCheck;

    // 전체 유저 조회 함수
    @Transactional
    public List<MemberDto> AllMemberSearch() {

        // 전체 유저 조회
        List<MemberEntity> Members = memberRepository.findAll();

        // 전체 유저의 필요한 정보를 dto로 매핑 후 리턴
        return Members.stream().map(member -> MemberDto.builder()
                        .uid(member.getUid())
                        .uname(member.getUname())
                        .uemail(member.getUemail())
                        .utel(member.getUtel())
                        .uaddr(member.getUaddr())
                        .uaddrsecond(member.getUaddrsecond())
                        .ubirth(member.getUbirth())
                        .ujoindate(member.getUjoindate()).build()).collect(Collectors.toList());

    }
    @Transactional
    public void DropMember(HttpServletRequest request, String uid) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 사용자 테이블에서 사용자 제거(연관된 DB 내용은 CascadeType.REMOVE 때문에 연쇄 삭제)
        memberRepository.deleteById(uid);
    }
}

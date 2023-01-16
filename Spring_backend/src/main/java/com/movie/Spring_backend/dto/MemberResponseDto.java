// 23-01-16 회원가입 성공시 전달할 ResponseDto 구현(오병주)
// 회원가입 시 일단 임의로 보내주는 Dto 추후 삭제 할수도??
package com.movie.Spring_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberResponseDto {
    private String uid;
    private String uemail;

    @Builder
    public MemberResponseDto(String uid, String uemail) {
        this.uid = uid;
        this.uemail = uemail;
    }
}
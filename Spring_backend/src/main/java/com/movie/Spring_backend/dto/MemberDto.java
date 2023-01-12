package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.Authority;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.sql.Date;
@Getter
@NoArgsConstructor
public class MemberDto {
    private String uid;
    private String upw;
    private String uname;
    private String uemail;
    private String utel;
    private String uaddr;
    private Date ubirth;
    private Authority uauthority;
    @Builder
    public MemberDto(String uid, String upw, String uname, String uemail, String utel, String uaddr, Date ubirth, Authority uauthority) {
        this.uid = uid;
        this.upw = upw;
        this.uname = uname;
        this.uemail = uemail;
        this.utel = utel;
        this.uaddr = uaddr;
        this.ubirth = ubirth;
        this.uauthority = uauthority;
    }
}
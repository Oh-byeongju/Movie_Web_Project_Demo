package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.Authority;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.sql.Date;
@Getter
@NoArgsConstructor
@Builder
public class MemberDto {
    private String u_id;
    private String u_pw;
    private String u_name;
    private String u_email;
    private String u_tel;
    private String u_addr;
    private Date u_birth;
    private Authority u_authority;
    @Builder
    public MemberDto(String u_id, String u_pw, String u_name, String u_email, String u_tel, String u_addr, Date u_birth, Authority u_authority) {
        this.u_id = u_id;
        this.u_pw = u_pw;
        this.u_name = u_name;
        this.u_email = u_email;
        this.u_tel = u_tel;
        this.u_addr = u_addr;
        this.u_birth = u_birth;
        this.u_authority = u_authority;
    }

    @Builder
    public MemberDto(String ID) {
        this.u_id = ID;
        this.u_pw = null;
        this.u_name = null;
        this.u_email = null;
        this.u_tel = null;
        this.u_addr = null;
        this.u_birth = null;
        this.u_authority = null;
    }
}


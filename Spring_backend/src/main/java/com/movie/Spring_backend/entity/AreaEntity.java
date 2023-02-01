package com.movie.Spring_backend.entity;

import lombok.*;
import javax.persistence.*;
import java.sql.Date;

// 빌더패턴을 사용한 entity 파일
@Entity
@Getter
@NoArgsConstructor
@Table(name = "Area")     // 디비의 테이블명과 클래스 명이 다를 경우
public class AreaEntity {
    // 엔티티 내부는 전부 언더바를 제외하고 + 첫글자는 소문자로 해서 만들어야함
    @Id
    @Column(nullable = false, length = 20)
    private int aid;

    @Column(nullable = false)
    private String aarea;


    @Builder
    public AreaEntity(int aid, String aarea) {
        this.aid=aid;
        this.aarea=aarea;
    }
}
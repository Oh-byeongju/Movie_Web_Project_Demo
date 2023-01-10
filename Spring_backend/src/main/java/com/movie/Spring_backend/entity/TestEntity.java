//package com.movie.Spring_backend.entity;
//
//import lombok.*;
//
//import javax.persistence.*;
//@Entity
//@Getter
//@NoArgsConstructor
//@Table(name = "Test1")     // 디비의 테이블명과 클래스 명이 다를 경우
//public class TestEntity {
//
//    // Entity의 테이블 설정을 할 때 만약에 application.yml 파일에서 ddl auto 기능이
//    // none 이나 validate일 경우 현재 디비의 테이블의 설정과 다를 경우 오류가 발생하므로 주의가 필요
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY) //MySQL의 AUTO_INCREMENT를 사용
//    private Long id;
//
//    @Column(length = 200, nullable = false)
//    private String memo_text;
//
//    @Builder
//    public TestEntity(Long id, String memo_text) {
//        this.id = id;
//        this.memo_text = memo_text;
//    }
//}
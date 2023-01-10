//package com.movie.Spring_backend.service;
//
//import com.movie.Spring_backend.dto.Testdto;
//import com.movie.Spring_backend.entity.TestEntity;
//import com.movie.Spring_backend.repository.TestRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//
//public class TestService {
//    private final TestRepository testRepository;
//
//    public List<Testdto> getInfo() {
//        List<TestEntity> Datas = testRepository.findAll();
//
//        return Datas.stream()
//                .map(data -> new Testdto(data.getId(), data.getMemo_text()))
//                .collect(Collectors.toList());
//    }
//}
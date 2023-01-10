//package com.movie.Spring_backend.controller;
//
//import com.movie.Spring_backend.dto.Testdto;
//import com.movie.Spring_backend.service.TestService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@CrossOrigin(origins = "*")
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/Search")
//public class TestController {
//
//    // ResponseEntity가 뭔지도 읽어봐야함
//    private final TestService testService;
//
//    @GetMapping("/select")
//    public ResponseEntity<List<Testdto>> getData() {
//        return ResponseEntity.ok().body(testService.getInfo());
//    }
//}

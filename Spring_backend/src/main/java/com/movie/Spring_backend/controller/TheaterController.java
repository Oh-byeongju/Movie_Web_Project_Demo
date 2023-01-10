//package com.movie.Spring_backend.controller;
//
//import com.movie.Spring_backend.entity.TheaterEntity;
//import com.movie.Spring_backend.repository.TheaterRepository;
//import com.movie.Spring_backend.service.TheaterService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//@RestController // JSON 형태 결과값을 반환해줌 (@ResponseBody가 필요없음)
//@RequiredArgsConstructor // final 객체를 Constructor Injection 해줌. (Autowired 역할)
//@RequestMapping("/v1")
//@CrossOrigin(origins = "http://localhost:3000")
//public class TheaterController {
//
//    private TheaterService theaterService;
//    @Autowired
//    TheaterController(TheaterService theaterService){
//        this.theaterService=theaterService;
//    }
//
//    @GetMapping(value="/theater")
//    @ResponseBody
//    public List<TheaterEntity> getProduct(){
//        return theaterService.readAllService();
//    }
//
//
//
//}

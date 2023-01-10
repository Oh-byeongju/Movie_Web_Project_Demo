package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.service.CinemaService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController // JSON 형태 결과값을 반환해줌 (@ResponseBody가 필요없음)
@RequiredArgsConstructor // final 객체를 Constructor Injection 해줌. (Autowired 역할)
@RequestMapping("/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class CinemaController {
//리액트 -> 컨트롤러 전달
    private CinemaService cinemaService;
    @Autowired
    CinemaController(CinemaService cinemaService){
        this.cinemaService = cinemaService;
    }


    @GetMapping(value="/cinema")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<CinemaEntity> getData(){
        return cinemaService.getList();
    }




}
/*

  private final TestService testService;

    @GetMapping("/select")
    public ResponseEntity<List<Testdto>> getData() {
        return ResponseEntity.ok().body(testService.getInfo());
    }
    @GetMapping("/select")
    public ResponseEntity<List<Testdto>> getData() {
        return ResponseEntity.ok().body(testService.getInfo());
    }
}
    }*/
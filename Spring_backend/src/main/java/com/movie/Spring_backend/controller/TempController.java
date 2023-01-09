package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.entity.TempEntity;
import com.movie.Spring_backend.service.TempService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController // JSON 형태 결과값을 반환해줌 (@ResponseBody가 필요없음)
@RequiredArgsConstructor // final 객체를 Constructor Injection 해줌. (Autowired 역할)
@RequestMapping("/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class TempController {

    private TempService tempService;
    @Autowired
    TempController(TempService tempService){
        this.tempService = tempService;
    }

    @GetMapping(value="/products")
    @ResponseBody
    public List<TempEntity> getProduct(){
        return tempService.readAllService();
    }



}

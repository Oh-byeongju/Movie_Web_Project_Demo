package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/redis")
public class RedisController {

    private final RedisService redisService;

    @PostMapping("/normal/rediss")
    public void startRedis(@RequestBody HashMap<String, String> body, HttpServletRequest request) {
        redisService.setValues(body.get("name"), body.get("age"), request);
    }

    @GetMapping("/normal/rediss")
    public String startRedis(@RequestParam String name) {
        return redisService.getValues(name);
    }
}

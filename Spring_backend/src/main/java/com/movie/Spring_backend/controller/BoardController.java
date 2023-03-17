package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;

    //게시판에 모든 글을 불러오는 컨트롤러
    //번호 기준 내림차순
    @GetMapping("/normal/boardall")
    public List<BoardDto> BoardWrite() {
        return boardService.findByAllBoard();
    }
    //게시판에 글을 작성하는 컨트롤러
    @PostMapping("/auth/boardwrite")
    public ResponseEntity<String> BoardWrite(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {
        boardService.BoardWrite(requestMap, request);
        return ResponseEntity.noContent().build();
    }

}

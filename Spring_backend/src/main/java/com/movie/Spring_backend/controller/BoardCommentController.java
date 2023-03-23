package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.BoardCommentDto;
import com.movie.Spring_backend.dto.CommentInfoDto;
import com.movie.Spring_backend.entity.BoardCommentEntity;
import com.movie.Spring_backend.service.BoardCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardCommentController {
    private final BoardCommentService boardCommentService;

    //댓글을 불러오는 메소드
    @GetMapping("/normal/comment")
    public ResponseEntity<List<BoardCommentDto>> commentAll(@RequestParam("bid")Long bid){
        return ResponseEntity.ok().body(boardCommentService.findByComment(bid));
    }

    //댓글을 입력하는 메소드

    @PostMapping("/auth/commentwrite")
    public ResponseEntity<List<BoardCommentEntity>> CommentWrite(@RequestBody Map<String, String> requestMap, HttpServletRequest request){
        boardCommentService.CommentWrite(requestMap, request);
        return ResponseEntity.noContent().build();
    }


}

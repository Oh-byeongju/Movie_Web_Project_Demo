package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
    public Page<BoardDto> BoardWrite(@RequestParam("page") String page) {
        return boardService.findByAllBoard(Integer.valueOf(page));
    }

    //게시판 상세 페이지 , 주소는 id/title로 지정
    @GetMapping("/normal/content/{id}/{title}")
    public List<BoardDto> BoardContent(@PathVariable Long id, @PathVariable String title, HttpServletRequest request, HttpServletResponse response){
        Cookie[]cookies = request.getCookies();
        Cookie oldcookie =null;

        //쿠키를 활용한 조회수 중복 방지
        if(cookies!=null){                                    //쿠키가 널값인지 체크를 한다
            for(Cookie cookie :cookies){
                if(cookie.getName().equals("postView")){      //쿠키가 널값이 아니라면 이름에 postView가 있는지 체크
                    oldcookie=cookie;                         //있다면 oldcookie로 가져온다.
                }
            }
        }

        //포스트뷰에 id값이 일치하면 아무반응도 일어나지 않음.
        if(oldcookie!=null){                                                      //oldcookie가 존재하면서 = postview가 있다
            if(!oldcookie.getValue().contains("["+ id.toString() +"]")){          //value에 현재 조회글의 번호가 있는지 확
                boardService.UpdateViews(id);                                     //없다면 조회수 +1
                oldcookie.setValue(oldcookie.getValue() + "_[" + id + "]");
                oldcookie.setPath("/");
                oldcookie.setMaxAge(60 * 60 * 24);
                response.addCookie(oldcookie);
            }
        }
        //포스트뷰가 없으면 생성
        else{
            boardService.UpdateViews(id);                                           //oldcookie가 없다
            Cookie newCookie = new Cookie("postView","[" + id + "]");   //조회수를 올려주고
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 24);
            response.addCookie(newCookie);                                          //id를 감싼 쿠리를 생성해  response에 전달
        }
        return boardService.findByContent(id,title, request,response);
    }

    //게시판에 글을 작성하는 컨트롤러
    @PostMapping("/auth/boardwrite")
    public ResponseEntity<String> BoardWrite(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {
        boardService.BoardWrite(requestMap, request);
        return ResponseEntity.noContent().build();
    }

}

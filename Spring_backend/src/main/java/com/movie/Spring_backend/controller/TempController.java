package com.movie.Spring_backend.controller;
import com.movie.Spring_backend.dto.TempDto;
import com.movie.Spring_backend.service.TempService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")


public class TempController {


    private final TempService tempService;

    @GetMapping("/normal/movie")
    public ResponseEntity<List<TempDto>> getData() {
        return ResponseEntity.ok().body(tempService.getMovie());
    }


    @PostMapping("/normal/searchmovie")
    @CrossOrigin(origins = "http://localhost:3000")

    public ResponseEntity<List<TempDto>> SearchTitle(@RequestParam String title){
        return ResponseEntity.ok().body(tempService.findByMtitleContaining(title));


/*
*  @PostMapping("/normal/selectmovie")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<MovieInfoDto>> findMid(@RequestParam Long id){
        return ResponseEntity.ok().body(movieInfoService.findAllByTempMid(id)); //findAllby + 외래키를 가진 Entity명 + 외래키 컬럼명
    }
*/

    }

}


/*
* @RestController // JSON 형태 결과값을 반환해줌 (@ResponseBody가 필요없음)
@RequiredArgsConstructor // final 객체를 Constructor Injection 해줌. (Autowired 역할)
@RequestMapping("/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class CinemaController extends HttpServlet {
    //리액트 -> 컨트롤러 전달
    CinemaService cinemaservice;

    @GetMapping(value = "/showlist")
    public ResponseEntity<List<CinemaDto.CinemaSelect>> showList() {
        List<CinemaDto.CinemaSelect> cinemas= cinemaservice.showList();
        return new ResponseEntity<>(cinemas, HttpStatus.OK);



    }

}*/
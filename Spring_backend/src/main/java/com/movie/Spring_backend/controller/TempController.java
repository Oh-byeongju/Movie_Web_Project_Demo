package com.movie.Spring_backend.controller;
import com.movie.Spring_backend.dto.TempDto;
import com.movie.Spring_backend.service.TempService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
<<<<<<< HEAD

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")
=======
@RestController // JSON 형태 결과값을 반환해줌 (@ResponseBody가 필요없음)
@RequiredArgsConstructor // final 객체를 Constructor Injection 해줌. (Autowired 역할)
@RequestMapping(value = "/res",method = RequestMethod.POST)
@CrossOrigin(origins = "http://localhost:3000")

>>>>>>> ce854d1c082d44035124abd918dea63a45a14863
public class TempController {
    private final TempService t;

<<<<<<< HEAD
    private final TempService tempService;

    @GetMapping("/movie")
    @CrossOrigin(origins = "http://localhost:3000")

    public ResponseEntity<List<TempDto>> getData() {
        return ResponseEntity.ok().body(tempService.findAll());
    }




=======
    @GetMapping(value = "/movie")
    public ResponseEntity<List<TempDto>> showMovie() {
        return ResponseEntity.ok().body(t.getMovie());
    }
>>>>>>> ce854d1c082d44035124abd918dea63a45a14863
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
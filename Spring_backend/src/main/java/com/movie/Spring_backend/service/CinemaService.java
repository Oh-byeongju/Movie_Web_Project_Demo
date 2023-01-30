package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.repository.CinemaRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional

public class CinemaService {
    private CinemaRepository cinemaRepository;

   public List<CinemaDto.CinemaSelect> showList(){
    return cinemaRepository.findAll().stream().map(CinemaDto.CinemaSelect::new).collect(Collectors.toList());
   }

}


/**
 public class CinemaService {
@Autowired
private CinemaRepository cinemaRepository;
public List<CinemaEntity> findAll(){

List<CinemaEntity> members = new ArrayList<>();
cinemaRepository.findAll().forEach(e->members.add(e));
return members;
}
 */


/*
    private final TestRepository testRepository;
//
//    public List<Testdto> getInfo() {
//        List<TestEntity> Datas = testRepository.findAll();
//
//        return Datas.stream()
//                .map(data -> new Testdto(data.getId(), data.getMemo_text()))
//                .collect(Collectors.toList());
//    }
*/


package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.repository.CinemaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CinemaService {
    private final CinemaRepository cinemaRepository;

    @Transactional
    public List<CinemaDto> findByCid(Long id) {

        List<CinemaEntity> datas = cinemaRepository.findByCid(id);
        if (!datas.isEmpty()) {
            return datas.stream().map(data->CinemaDto.builder().cid(data.getCid()).cname(data.getCname()).ctype(data.getCtype()).cseat(data.getCseat()).theater(data.getTheater()).build()).collect(Collectors.toList());

        } else {
            System.out.println("error");
            throw new MovieNotFoundException("검색 결과 없습니다.");

        }
    }
}


/**
 List<MovieEntity> datas = movieRepository.findByMid(id);

 return datas.stream().map(data-> MovieDto.builder()
 .mid(data.getMid())
 .mtitle(data.getMtitle())
 .mdir(data.getMdir())
 .mactor(data.getMactor())
 .msupactor(data.getMsupactor())
 .mgenre(data.getMgenre())
 .mtime(data.getMtime())
 .mdate(data.getMdate())
 .mrating(data.getMrating())
 .mstory(data.getMstory())
 .mlike(data.getMlike())
 .mimagepath(data.getMimagepath())
 .build()).collect(Collectors.toList());
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


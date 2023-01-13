package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.repository.MemberRepository;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class MovieInfoService {
    private final MovieInfoRepository movieInfoRepository;

    public MovieInfoService(MovieInfoRepository movieInfoRepository){
        this.movieInfoRepository=movieInfoRepository;
    }
    public List<MovieInfoDto> findAll() {
        List<MovieInfoEntity> datas = movieInfoRepository.findAll();
        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).temp(data.getTemp()).cid(data.getCid()).build()).collect(Collectors.toList());
    }
    public Optional<MovieInfoEntity> findById(Long id) {
        Optional<MovieInfoEntity> info = movieInfoRepository.findById(id);
        return info;

        }




}

/*
* Person person = findById(4)
    .orElseThrow(() -> new NoPersonFoundException("No person found id maches: " + 4));
System.out.println(person.getName());
* */
/*
*  public List<TempDto> findAll(){
        List<TempEntity> datas = tempRepository.findAll();
        return datas.stream()
                .map(data -> TempDto.builder()
                        .mid(data.getMid())
                        .mtitle(data.getMtitle())
                        .mdir(data.getMdir())
                        .mactor(data.getMactor())
                        .msupactor(data.getMsupactor())
                        .mgenre(data.getMgenre())
                        .mtime(data.getMtime())
                        .mdate(data.getMdate())
                        .mrating(data.getMrating())
                        .mstory(data.getMstory()).build()).collect(Collectors.toList());
    }*/
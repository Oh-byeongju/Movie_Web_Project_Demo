package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.repository.TheaterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TheaterService {

    private final TheaterRepository theaterRepository;

    @Transactional
    public Set<String> getInfo() {
        List<TheaterEntity> Datas = theaterRepository.findAll();
        List<TheaterDto> mappingData= Datas.stream().map(data -> new TheaterDto(data.getTid(), data.getTname(),data.getTaddr(),data.getTarea()))
                .collect(Collectors.toList());
         Set<String> duplication= new HashSet<>();
         List <String> area = mappingData.stream().map(TheaterDto::getTarea).collect(Collectors.toList());

        duplication.addAll(area);

        return duplication;

    }




    @Transactional
    public List<TheaterDto> findByTarea(String area){
        List<TheaterEntity> datas = theaterRepository.findByTarea(area);
        if(!datas.isEmpty()){
            return datas.stream()
                    .map(data -> new TheaterDto(data.getTid(), data.getTname(),data.getTaddr(),data.getTarea()))
                    .collect(Collectors.toList());
        }
        else{
            throw new MovieNotFoundException("검색 결과 없습니다.");
        }

    }

    @Transactional
    public List<TheaterDto> findByTidInAndTarea (List<Long> id, String name){
        List<TheaterEntity> datas = theaterRepository.findByTidInAndTarea(id, name);
        if(!datas.isEmpty()){
            return datas.stream()
                    .map(data -> new TheaterDto(data.getTid(), data.getTname(),data.getTaddr(),data.getTarea()))
                    .collect(Collectors.toList());
        }
        else{
            throw new MovieNotFoundException("검색 결과 없습니다.");
        }
    }
}

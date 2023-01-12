package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.repository.TheaterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TheaterService {

    private final TheaterRepository repository;

    public List<TheaterDto> getInfo() {
        List<TheaterEntity> Datas = repository.findAll();

        return Datas.stream()
                .map(data -> new TheaterDto(data.getTid(), data.getTname(),data.getTarea(),data.getTarea()))
                .collect(Collectors.toList());
    }// 매핑해주는거
}


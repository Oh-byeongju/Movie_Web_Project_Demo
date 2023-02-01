package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.repository.TheaterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TheaterService {

    private final TheaterRepository r;

    public List<TheaterDto> getInfo() {
        List<TheaterEntity> Datas = r.findAll();

        return Datas.stream()
                .map(data -> new TheaterDto(data.getTid(), data.getTname(),data.getTaddr(),data.getArea()))
                .collect(Collectors.toList());
    }// 매핑해주는거
}


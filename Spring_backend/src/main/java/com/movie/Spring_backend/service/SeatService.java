package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.SeatDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.SeatEntity;
import com.movie.Spring_backend.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SeatService {
    private final SeatRepository seatRepository;

    public List<SeatDto> findBySeat(Long id){
        List<SeatEntity> datas = seatRepository.findByCinemaCid(id);

        return datas.stream().map(data -> SeatDto.builder().sid(data.getSid()).sname(data.getSname())
                .build()).collect(Collectors.toList());
    }
}

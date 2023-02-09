package com.movie.Spring_backend.service;

import com.movie.Spring_backend.distinct.DeduplicationUtils;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.mapper.TheaterMapper;
import com.movie.Spring_backend.repository.TheaterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class TheaterService {

    private final TheaterRepository theaterRepository;

    private final TheaterMapper theaterMapper;
    @Transactional
    public List<TheaterDto> getInfo() {
        List<TheaterEntity> datas = theaterRepository.findAll();
        return datas.stream()
                .map(data -> theaterMapper.toDto(data)).collect(Collectors.toList());
    }







    @Transactional
    public List<TheaterDto> findByTidIn(List<Long> id){
        int count;
        List<TheaterEntity> datasIn = theaterRepository.findByTidIn(id);
        List <TheaterEntity> datasNotIn =theaterRepository.findByTidNotIn(id);

        //in한것들 불러와서 매핑
        List<TheaterDto> DtoIn = datasIn.stream().map(data->theaterMapper.toAble(data)).collect(Collectors.toList());
        List<TheaterDto> forCount = new ArrayList<>();

        count = (int) IntStream.range(0, DtoIn.toArray().length).count();
        //NOT IN 한것들 매핑
        List<TheaterDto> DtoNotIn = datasNotIn.stream().map(data->theaterMapper.toDisable(data,count)).collect(Collectors.toList());


        for(TheaterDto tt : DtoNotIn){
            DtoIn.add(tt);
        }
        //IN에 NOT iN 넣기

        //중복제거
        List <TheaterDto> dedupication = DeduplicationUtils.deduplication(DtoIn,TheaterDto::getTname);

        return dedupication;

    }



}

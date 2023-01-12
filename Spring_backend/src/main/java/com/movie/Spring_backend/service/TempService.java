package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.TempDto;
import com.movie.Spring_backend.repository.TempRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class TempService {

    private TempRepository t;

    public List<TempDto.movieList> showMovie(){
        return t.findAll().stream().map(TempDto.movieList::new).collect(Collectors.toList());
    }
}
/*
* @Service
@Transactional

public class CinemaService {
    private CinemaRepository cinemaRepository;

   public List<CinemaDto.CinemaSelect> showList(){
    return cinemaRepository.findAll().stream().map(CinemaDto.CinemaSelect::new).collect(Collectors.toList());
   }
*/

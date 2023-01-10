package com.movie.Spring_backend.service;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.repository.CinemaRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CinemaService {

    private CinemaRepository repository;
    CinemaService(CinemaRepository repository){this.repository=repository;}

    @Transactional
    public List<CinemaEntity> getList(){
        return repository.findAll();
    }



}



/*
    private TempRepository repository;

    TempService(TempRepository repository){this.repository=repository;}

    @Transactional
    public List<TempEntity> readAllService(){
        return repository.findAll();
    }*/

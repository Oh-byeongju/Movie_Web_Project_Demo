//package com.movie.Spring_backend.service;
//
//import com.movie.Spring_backend.entity.CinemaEntity;
//import com.movie.Spring_backend.repository.CinemaRepository;
//import org.springframework.stereotype.Service;
//
//import javax.transaction.Transactional;
//import java.util.List;
//
//@Transactional
//@Service
//
//
//public class CinemaService {
//
//    private CinemaRepository repository;
//
//    CinemaService(CinemaRepository repository){this.repository=repository;}
//
//    @Transactional
//    public List<CinemaEntity> readAllService(){
//        return repository.findAll();
//    }
//}

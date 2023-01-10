//package com.movie.Spring_backend.service;
//
//import com.movie.Spring_backend.entity.TheaterEntity;
//import com.movie.Spring_backend.repository.TheaterRepository;
//import org.springframework.stereotype.Service;
//
//import javax.transaction.Transactional;
//import java.util.List;
//
//@Transactional
//@Service
//
//
//public class TheaterService {
//
//    private TheaterRepository repository;
//
//    TheaterService(TheaterRepository repository){this.repository=repository;}
//
//    @Transactional
//    public List<TheaterEntity> readAllService(){
//        return repository.findAll();
//    }
//}

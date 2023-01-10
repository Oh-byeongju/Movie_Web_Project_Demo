//package com.movie.Spring_backend.service;
//
//import com.movie.Spring_backend.entity.TempEntity;
//import com.movie.Spring_backend.repository.TempRepository;
//import org.springframework.stereotype.Service;
//
//import javax.transaction.Transactional;
//import java.util.List;
//
//@Transactional
//@Service
//
//
//public class TempService {
//
//    private TempRepository repository;
//
//    TempService(TempRepository repository){this.repository=repository;}
//
//    @Transactional
//    public List<TempEntity> readAllService(){
//        return repository.findAll();
//    }
//}

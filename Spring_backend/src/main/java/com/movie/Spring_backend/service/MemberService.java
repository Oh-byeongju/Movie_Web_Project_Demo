package com.movie.Spring_backend.service;

import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.repo.MemberRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service


public class MemberService {

    private MemberRepository repository;

    MemberService(MemberRepository repository){this.repository=repository;}

    @Transactional
    public List<MemberEntity> readAllService(){
        return repository.findAll();
    }
}

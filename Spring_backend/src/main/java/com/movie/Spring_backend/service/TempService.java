package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.TempDto;
import com.movie.Spring_backend.entity.TempEntity;
import com.movie.Spring_backend.repository.TempRepository;
import lombok.Data;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class TempService {

    private final TempRepository tempRepository;


    public List<TempDto> getMovie() {
        // Repository에 있는 함수, Entity형으로 디비에 있는 값을 불러옴
        List<TempEntity> Datas = tempRepository.findAll();

        // 리턴을 해줄때는 entity형인 Datas를 dto형으로 바꿔줘야 해서 빌더패턴을 사용해서 매핑
        return Datas.stream()
                .map(data -> TempDto.builder()
                        .mid(data.getMid())
                        .mtitle(data.getMtitle())
                        .mdir(data.getMdir())
                        .mactor(data.getMactor())
                        .msupactor(data.getMsupactor())
                        .mgenre(data.getMgenre())
                        .mtime(data.getMtime())
                        .mdate(data.getMdate())
                        .mrating(data.getMrating())
                        .mstory(data.getMstory()).build()).collect(Collectors.toList());
    }
    } //findAll의 결과의 스트림을 맵을 통해 dto변환 -> list로 별환
//ong mid, String mtitle, String mdir, String mactor, String msupactor, String mgenre,
//                      int mtime, Date mdate, String mrating, String mstory)


/*
* @Service
@Transactional

public class CinemaService {
    private CinemaRepository cinemaRepository;

   public List<CinemaDto.CinemaSelect> showList(){
    return cinemaRepository.findAll().stream().map(CinemaDto.CinemaSelect::new).collect(Collectors.toList());
   }
*/

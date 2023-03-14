package com.movie.Spring_backend.service;

import com.google.gson.JsonObject;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.InfoMapper;
import com.movie.Spring_backend.mapper.MovieInfoMapper;
import com.movie.Spring_backend.mapper.ScheduleMapper;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.repository.MovieInfoSeatRepository;
import com.movie.Spring_backend.repository.MovieRepository;
import com.movie.Spring_backend.util.DeduplicationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor

public class MovieInfoService {
    private final MovieInfoRepository movieInfoRepository;
    private final MovieRepository movieRepository;
    private final MovieInfoSeatRepository movieInfoSeatRepository;
    private final MovieInfoMapper movieInfoMapper;

    private final JwtValidCheck jwtValidCheck;

    @Transactional
    public List<MovieInfoDto> findAllMiday() {
        List<MovieInfoEntity> datas = movieInfoRepository.findAll();
        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());
    }


    //movieinfo에서 movie 데이터를 받아서 cid 추출하는 서비스
    @Transactional
    public Set<Long> findByMovie(Long id) {
        //외래키로 엔티티 검색 위해 매핑
        MovieEntity movieEntity = MovieEntity.builder().mid(id).build();
        List<MovieInfoEntity> datas = movieInfoRepository.findByMovie(movieEntity);

        Set<Long> mappedcid = new HashSet<>();
        //cid 추출
        for (MovieInfoEntity cc : datas) {
            mappedcid.add(cc.getCinema().getCid());
        }
        return mappedcid;
        //cid 추출
    }

    //영화로 날짜 검색
    @Transactional
    public List<MovieInfoDto> findByMovieToDay(Long id) {
        //외래키로 엔티티 검색 위해 매핑

        List<MovieInfoEntity> datas = movieInfoRepository.findByMovieToDay(id);

        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());

    }

    //극장으로 날짜 검색하는 메소드(상영 가능한 날만)
    @Transactional
    public List<MovieInfoDto> findByCinemaCidIn(Long tid) {
        List<MovieInfoEntity> datas = movieInfoRepository.findByCinemaCidIn(tid);
        if (!datas.isEmpty()) {
            List<MovieInfoDto> datad = datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());
            List <MovieInfoDto> dedupication = DeduplicationUtil.deduplication(datad,MovieInfoDto::getMiday);

            return dedupication;
        } else {
            throw new MovieNotFoundException("검색 결과 없습니다.");
        }
    }

    //극장과 영화로 데이터 추출
    @Transactional
    public List<MovieInfoDto> findByMovieTheaterDay(List<Long> cid, Long mid) {

        List<MovieInfoEntity> datas = movieInfoRepository.findByCinemaCidInAndMovieMid(cid, mid);
        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());

    }

    @Transactional
    public List<Long> findByMidayToMid(Date miday) {
        List<MovieInfoEntity> datas = movieInfoRepository.findByMiday(miday);
        //여기서 mid를 추출
        List<Long> mid = new ArrayList<>();
        for (MovieInfoEntity mm : datas) {
            mid.add(mm.getMovie().getMid());
        }

        return mid;

    }

    @Transactional
    public Set<Long> findByMidayToCid(Date miday) {
        List<MovieInfoEntity> datas = movieInfoRepository.findByMiday(miday);
        //여기서 mid를 추출
        Set<Long> cid = new HashSet<>();
        for (MovieInfoEntity mm : datas) {
            cid.add(mm.getCinema().getCid());
        }

        return cid;

    }

    @Transactional
    public List<Long> findByMidayAndCinemaCidIn(Date miday, List<Long> cid) {
        List<MovieInfoEntity> datas = movieInfoRepository.findByMidayAndCinemaCidIn(miday, cid);
        //여기서 mid를 추출

        List<Long> mid = new ArrayList<>();
        for (MovieInfoEntity mm : datas) {
            mid.add(mm.getMovie().getMid());
        }
        return mid;
    }

    @Transactional
    public List<Long> findByMidayAndMovieMid(Date miday, Long mid) {
        List<MovieInfoEntity> datas = movieInfoRepository.findByMidayAndMovieMid(miday, mid);

        List<Long> cid = new ArrayList<>();
        for (MovieInfoEntity mm : datas) {
            cid.add(mm.getCinema().getCid());
        }
        return cid;
    }

    @Transactional
    public List<MovieInfoDto> findBySchedule(Date miday, Long mid, List<Long> cid) {
        List<MovieInfoEntity> datas = movieInfoRepository.findBySchedule(miday, mid, cid);

        return datas.stream().map(data -> movieInfoMapper.CountDto(data, data.getCinema().getCid(), data.getCinema().getCname(), data.getCinema().getCtype(), data.getCntSeatInfo(), data.getCinema().getCseat())).collect(Collectors.toList());

    }

    //영화와 날짜 지역으로 영화 정보를 불러오는 서비스
    @Transactional
    public List<ScheduleMapper> findTest(Long mid, Date miday, String tarea) {
        List<MovieInfoEntity> datas = movieInfoRepository.findSchedule(mid, miday, tarea);
        List<MovieInfoDto> mapped = datas.stream().map(data -> movieInfoMapper.Test(data, data.getCinema().getCid(), data.getCinema().getCname(), data.getCinema().getCtype(), data.getCntSeatInfo(), data.getCinema().getCseat(), data.getCinema().getTheater().getTname(),data.getMovie().getMtitle(),data.getMovie().getMid(),data.getCinema().getTheater().getTid(),data.getMovie().getMtime(),data.getMovie().getMrating(),data.getMovie().getMimagepath())).collect(Collectors.toList());
        //매핑을 위해 중복을 제거
        //극장 번호 , 지역
        List<MovieInfoDto> cid = DeduplicationUtil.deduplication(mapped, MovieInfoDto::getCid);
        List<MovieInfoDto> area = DeduplicationUtil.deduplication(mapped, MovieInfoDto::getArea);

        List<ScheduleMapper> scheduleMappers = new ArrayList<>();
        ScheduleMapper scheduleMapper = new ScheduleMapper();
        for (MovieInfoDto c : area) {    //지역으로 나눔
            List<InfoMapper> infoMapper = new ArrayList<>();

            for (MovieInfoDto a : cid) { //극장으로 나눔
                if (c.getArea().equals(a.getArea())) {
                    System.out.println(a.getCid());//전체 지역 중 중복 제거한 극장의 지역명이 같으면
                    List<MovieInfoEntity> miid = movieInfoRepository.findmiid(mid, miday, a.getCid()); //지점과 cid 에 맞는 miid들
                    List<Map<String, Object>> history = new ArrayList<>();
                    for (MovieInfoEntity mi : miid) {
                        Map<String, Object> miidd = Map.of(
                                "miid", mi.getMiid(),
                                "start", mi.getMistarttime(),
                                "count", mi.getCntSeatInfo(),
                                "end", mi.getMiendtime()
                        );
                        history.add(miidd);
                    }

                    InfoMapper dd = new InfoMapper(a.getCid(), a.getAllcount(), a.getType(), a.getArea(), a.getName(),a.getTid(), history); //1상영관에 대한 정보
                    infoMapper.add(dd);    //여기는 r에 해당하는 모든 상영관에 대한 정보   //극장에 해당하는 모든 정보
                    //여기까지 하면 cid 에 맞는 miid 추출
                    //지역에 따른 cid 정보들로 ㅊ푸출
                }
            }

            scheduleMapper = new ScheduleMapper(c.getArea(), infoMapper);

            scheduleMappers.add(scheduleMapper);

        }

        //극장으로 나눈 후 상영관으로 나눠야한다 .
        return scheduleMappers;
    }


    @Transactional
    public List<ScheduleMapper> findByTheater(Date miday, Long tid) {
        List<MovieInfoEntity> datas = movieInfoRepository.findTimeTheater(miday, tid);
        List<MovieInfoDto> mapped = datas.stream().map(data -> movieInfoMapper.Test(data, data.getCinema().getCid(), data.getCinema().getCname(), data.getCinema().getCtype(), data.getCntSeatInfo(), data.getCinema().getCseat(), data.getCinema().getTheater().getTname(), data.getMovie().getMtitle(),data.getMovie().getMid(),data.getCinema().getTheater().getTid(),data.getMovie().getMtime(),data.getMovie().getMrating(),data.getMovie().getMimagepath())).collect(Collectors.toList());
        List<MovieInfoDto> cid = DeduplicationUtil.deduplication(mapped, MovieInfoDto::getCid);
        List<MovieInfoDto> title = DeduplicationUtil.deduplication(mapped, MovieInfoDto::getTitle);


        List<ScheduleMapper> scheduleMappers = new ArrayList<>();
        ScheduleMapper scheduleMapper = new ScheduleMapper();
        // 영화 중복 제거해서 for문
        for(MovieInfoDto movies : title){
            List<InfoMapper> infoMapper = new ArrayList<>();

            for( MovieInfoDto cinema : cid){  // 10 , 12
                    List<MovieInfoEntity> miid = movieInfoRepository.findmiid(movies.getMid(), miday, cinema.getCid()); //지점과 cid 에 맞는 miid들
                    List<Map<String, Object>> history = new ArrayList<>();
                    if(!miid.isEmpty()) {
                        for (MovieInfoEntity mi : miid) {
                            System.out.println(mi.getMiid());
                            Map<String, Object> miidd = Map.of(
                                    "miid", mi.getMiid(),
                                    "start", mi.getMistarttime(),
                                    "count", mi.getCntSeatInfo(),
                                        "end", mi.getMiendtime()

                            );
                            history.add(miidd);
                        }
                        InfoMapper dd = new InfoMapper(cinema.getCid(), cinema.getAllcount(), cinema.getType(), cinema.getArea(), cinema.getName(),cinema.getTid(), history); //1상영관에 대한 정보
                        infoMapper.add(dd);    //여기는 r에 해당하는 모든 상영관에 대한 정보   //극장에 해당하는 모든 정보
                        //여기까지 하면 cid 에 맞는 miid 추출
                        //지역에 따른 cid 정보들로 ㅊ푸출
                    }

            }


            scheduleMapper = new ScheduleMapper(movies.getTitle(),movies.getMid(),movies.getTime(), movies.getRating(), movies.getImage(),infoMapper);

            scheduleMappers.add(scheduleMapper);

        }
        return scheduleMappers;
    }


}